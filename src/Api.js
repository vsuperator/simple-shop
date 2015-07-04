var Qajax = require('qajax');
var q = require('q');

var Q = function (data) {
    var request = {
        url: data.url,
        method: data.method || 'GET',
        data: data.data,
        headers: {
            //"Authorization": "Token " + localStorage.token,
            "Content-Type": "application/json"
        }
    };
    return Qajax(request)
        .then(Qajax.toJSON);
};

var Api = {
    getCategories(){
        return Q({url: './data/categories.json'});
    },
    getProducts(){
        return Q({url: './data/products.json'});
    }
};


module.exports = Api;
