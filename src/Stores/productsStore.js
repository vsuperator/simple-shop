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
        Api.getProducts()
            .then(response => this.addProperty(response))
            .done(response => this.productsReceived(response));
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
        console.log(quantity);
        var currentItem = _.find(this.allProducts, {id: id});
        currentItem.countInBasket = currentItem.countInBasket - quantity;
        this.productsReceived(this.allProducts);
    },

    productsReceived(data){
        this.allProducts = _.clone(data);
        if(!_.isNull(this.category)){
            this.trigger(_.where(this.allProducts, {category_id: this.category}));
            return
        }
        this.trigger(this.allProducts);
    }
});


module.exports = {
    productsActions: actions,
    productsStore: productsStore
};
