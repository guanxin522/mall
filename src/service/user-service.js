/*
* @Author: xin
* @Date:   2018-04-28 20:56:04
* @Last Modified by:   xin
* @Last Modified time: 2018-04-28 21:24:17
*/
var _mm = require('util/mm.js');
var _user = {
    checkLogin : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/get_user_info.do'),
            method : 'post',
            success : resolve,
            error : reject
        });
    },    
    logout : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/user/logout.do'),
            method : 'post',
            success : resolve,
            error : reject
        });
    }
}

module.exports = _user;