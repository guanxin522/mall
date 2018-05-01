/*
* @Author: xin
* @Date:   2018-04-30 17:22:03
* @Last Modified by:   xin
* @Last Modified time: 2018-04-30 20:56:54
*/
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user =require('service/user-service.js');
var templateIndex = require('./index.string');
//表单里的错误提示

var page = {
    init: function(){
       this.onLoad();
    },
    onLoad : function(){
        navSide.init({
            name : 'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            $('.pannel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};

$(function(){
    page.init();
});