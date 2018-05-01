/*
* @Author: xin
* @Date:   2018-04-28 20:16:59
* @Last Modified by:   xin
* @Last Modified time: 2018-04-30 15:05:27
*/
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {
    init : function (){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        $('.js-register').click(function(){
           window.location.href = './user-register.html';
        });        
        $('.js-logout').click(function(){
           _user.logout(function(res){
            window.location.reload();
           }, function(errorMsg){
            _mm.errorTips(errorMsg);
           });
        });         
    },
    // 加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg){
            // do nothing
        });
    },
    loadCartCount : function(){
         _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
           }, function(errorMsg){
             $('.nav .cart-count').text(0);
           });       
    }    
};

module.exports =  nav.init();