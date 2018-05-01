/*
* @Author: xin
* @Date:   2018-04-26 19:22:24
* @Last Modified by:   xin
* @Last Modified time: 2018-04-29 21:06:50
*/


require('./index.css');
var navSide = require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user =require('service/user-service.js');
//表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent :function(){
        //登陆按钮的点击
        var _this = this;
        $("#submit").click(function(){
            _this.submit();
        });
        //按下回车提交
        $(".user-content").keyup(function(e){
            if(e.keycode===13){
                _this.submit();
            }
        });
    },
    submit : function(){
        var formData = {
                username : $.trim($('#username').val()),
                password : $.trim($('#password').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            _user.login(formData, function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 验证失败
        else{
            // 错误提示
            formError.show(validateResult.msg);
        }

    },
    // 表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;

    }
};

$(function(){
    page.init();
});