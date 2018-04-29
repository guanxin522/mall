/*
* @Author: xin
* @Date:   2018-04-28 21:15:24
* @Last Modified by:   xin
* @Last Modified time: 2018-04-28 21:24:14
*/
var _mm = require('util/mm.js');
var _cart = {
    getCartCount : function(resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            method : 'post',
            success : resolve,
            error : reject
        });
    }
}

module.exports = _cart;

