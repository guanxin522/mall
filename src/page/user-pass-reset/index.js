/*
* @Author: xin
* @Date:   2018-04-30 15:45:03
* @Last Modified by:   xin
* @Last Modified time: 2018-04-30 17:11:27
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
    data:{
        username : '',
        question : '',
        answer   : '',
        token    : ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsename();
    },
    bindEvent :function(){
        var _this = this;
        $("#submit-username").click(function(){
           var username = $.trim($("#username").val());

           if (username) {
            _user.getQuestion(username,function(res){
                _this.data.username = username;
                _this.data.question = res;
                _this.loadStepQuestion();
            },function(errMsg){
                formError.show(errMsg);
            });
           }
           else{
            formError.show("请输入用户名");
           }
        });
        $("#submit-answer").click(function(){
           var answer = $.trim($("#answer").val());
           //检查密码提示问题答案
           if (answer) {
            _user.checkAnswer({
                username : _this.data.username,
                question : _this.data.question,
                answer   : answer
            }
                ,function(res){
                _this.data.answer = answer;
                _this.data.token = res;
                _this.loadStepPassword();
            },function(errMsg){
                formError.show(errMsg);
            });
           }
           else{
            formError.show("请输入密码提示的答案");
           }
        });  
        //输入新密码后
        $("#submit-password").click(function(){
           var password = $.trim($("#password").val());
           //检查密码提示问题答案
           if (password && password.length>=6) {
            _user.resetPassword({
                username : _this.data.username,
                passwordNew : password,
                forgetToken   : _this.data.token
            },function(res){
            window.location.href="./result.html?type=pass-reset"
            },function(errMsg){
                formError.show(errMsg);
            });
           }
           else{
            formError.show("请输入不少于6位的新密码");
           }
        });               
    },
    //加载输入用户名的一步
    loadStepUsename : function(){
        $('.step-username').show();
    },
    //加载输入密码提示问题答案
    loadStepQuestion : function(){
        //清除错误提示
        formError.hide();
        $('.step-username').hide()
        .siblings('.step-question').show()
        .find('.question').text(this.data.question);

    },
    //加载输入用户名的一步
    loadStepPassword : function(){
        //清除错误提示
        formError.hide();
        $('.step-question').hide()
        .siblings('.step-password').show();      
    }, 
};
$(function(){
    page.init();
});