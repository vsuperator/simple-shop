var Reflux = require('reflux');
var Api = require('../Api');
var _  = require('underscore');


var actions = Reflux.createActions([
    "loadListOfProducts",
    "updateItem",
    "updateItemFromBasket",
    "setCategory"
]);

var productsStore = Reflux.createStore({
    init() {
        this.listenToMany(actions);
        this.allProducts = null;
        this.category = null;
    },

    addProperty(data){
        return data.products.map(product => _.extend(product, {countInBasket: 0}) )
    },

    loadListOfProducts() {
        var productsInLS = JSON.parse(localStorage.getItem('products'));
        if(!_.isNull(productsInLS)){
            this.getItemsFromStorage();
            return
        }
        Api.getProducts()
            .then(response => this.addProperty(response))
            .done(response => this.productsReceived(response));
    },

    getItemsFromStorage(){
        this.allProducts = JSON.parse(localStorage.getItem('products'));
        this.productsReceived(this.allProducts);
    },

    setCategory(id){
        this.category = id;
        this.productsReceived(this.allProducts);
    },

    updateItem(id, quantity){
        var currentItem = _.find(this.allProducts, {id: id});
        if((currentItem.countInBasket + quantity) < currentItem.quantity) {
            currentItem.countInBasket += quantity;
        } else {
            currentItem.countInBasket = currentItem.quantity;
        }
        this.productsReceived(this.allProducts);
    },

    updateItemFromBasket(id, quantity){
        var currentItem = _.find(this.allProducts, {id: id});
        currentItem.countInBasket = currentItem.countInBasket - quantity;
        this.productsReceived(this.allProducts);
    },

    productsReceived(data){
        this.allProducts = _.clone(data);
        localStorage.setItem('products', JSON.stringify(this.allProducts));
        this.trigger(this.allProducts);
    }
});


module.exports = {
    productsActions: actions,
    productsStore: productsStore
};
