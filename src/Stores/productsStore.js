var Reflux = require('reflux');
var Api = require('../Api');
var _  = require('underscore');


var actions = Reflux.createActions([
    "loadListOfProducts"
]);

var productsStore = Reflux.createStore({
    init() {
        this.listenToMany(actions);
        this.products = null;
    },

    loadListOfProducts() {
        Api.getProducts()
            .done(response => this.productsReceived(response.products));
    },

    productsReceived(data){
        this.products = _.clone(data);
        this.trigger(this.products);
    }
});


module.exports = {
    productsActions: actions,
    productsStore: productsStore
};
