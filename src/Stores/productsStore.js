var Reflux = require('reflux');
var Api = require('../Api');
var _  = require('underscore');


var actions = Reflux.createActions([
    "loadListOfProducts",
    "sortByPrice",
    "changeQuantity",
    "increaseQuantity",
    "setCategory"
]);

var productsStore = Reflux.createStore({
    init() {
        this.listenToMany(actions);
        this.allProducts = null;
        this.category = null;
    },

    loadListOfProducts() {
        Api.getProducts()
            .done(response => this.productsReceived(response.products));
    },

    setCategory(id){
        this.category = id;
        this.productsReceived(this.allProducts);
    },

    increaseQuantity(id, quantity, maxQuantity){
        var currentItem = _.find(this.allProducts, {id: id});
        if(currentItem.quantity >= maxQuantity){
            return
        }
        currentItem.quantity = currentItem.quantity + quantity;
        this.productsReceived(this.allProducts);
    },

    changeQuantity(id, quantity){
        var currentItem = _.find(this.allProducts, {id: id});
        currentItem.quantity = currentItem.quantity - quantity;
        console.log('Остаток ' + currentItem.quantity);
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
