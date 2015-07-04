var Reflux = require('reflux');
var Api = require('../Api');
var _  = require('underscore');


var actions = Reflux.createActions([
    "loadListOfProducts",
    "changeQuantity"
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

    changeQuantity(id, quantity){
        var currentItem = _.find(this.products, {id: id});
        currentItem.quantity = currentItem.quantity - quantity;
        this.productsReceived(this.products);
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
