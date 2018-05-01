/*
* @Author: xin
* @Date:   2018-04-29 11:24:02
* @Last Modified by:   xin
* @Last Modified time: 2018-04-29 20:56:38
*/
require('./index.css');
var _mm = require('util/mm.js');
var header = {
    init : function (){
        this.bindEvent();
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        //keyword存在,回填输入框
        if (keyword) {
            $('#search-input').val(keyword);
        };
    },
    bindEvent : function(){
        var _this = this;
        //点击搜索按钮以后，搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车后搜索提交
         $('#search-btn').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
         });
    }, 
    //搜索提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        //如果提交的时候有keyword,正常跳转到list页
        if (keyword) {
            window.location.href = './list.html?keyword='+keyword;
        }
        //keyword为空，返回首页
        else{
            _mm.goHome();
        }

    }
};

header.init();