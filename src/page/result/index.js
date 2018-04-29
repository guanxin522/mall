/*
* @Author: xin
* @Date:   2018-04-29 16:00:28
* @Last Modified by:   xin
* @Last Modified time: 2018-04-29 17:00:37
*/
require('./index.css');
var navSide = require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    //显示对应的提示元素
    $element.show();
})