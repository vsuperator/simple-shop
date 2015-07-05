//
//var Reflux = require('reflux');
//var _  = require('underscore');
//
//
//var actions = Reflux.createActions([
//    "addItem",
//    "decreaseItemsQuantity",
//    "increaseItemsQuantity"
//]);
//
//var basketStore = Reflux.createStore({
//    init() {
//        this.listenToMany(actions);
//        this.items = [];
//        //this.getInitialItems();
//    },
//
//    //getInitialItems(){
//    //    return !_.isNull(localStorage.getItem('items')) ?
//    //        JSON.parse(localStorage.getItem('items')) :
//    //        [];
//    //},
//
//    getPrice(){
//        return this.items.reduce(function(sum, current) {
//            return sum + (current.price * current.quantityToBuy);
//        }, 0);
//    },
//
//    getCountInBasket(){
//        return this.items.reduce(function(sum, current) {
//            return sum + current.quantityToBuy;
//        }, 0);
//    },
//
//    removeItem(id){
//        var currentItem = _.find(this.items, {id: id});
//        this.items = _.without(this.items, currentItem)
//    },
//
//    decreaseItemsQuantity(id, quantity){
//        var currentItem = _.find(this.items, {id: id});
//        currentItem.quantityToBuy -= quantity;
//        if(currentItem.quantityToBuy === 0){
//            this.removeItem(id);
//        }
//        this.triggerItems(this.items)
//    },
//
//    increaseItemsQuantity(id, quantity){
//        var currentItem = _.find(this.items, {id: id});
//        currentItem.quantityToBuy -= quantity;
//        this.triggerItems(this.items)
//    },
//
//    triggerItems(items){
//        //localStorage.setItem('items', JSON.stringify(items));
//        this.items = _.clone(items);
//        this.trigger({
//            basketItems: this.items,
//            price: this.getPrice(),
//            countInBasket: this.getCountInBasket()
//        })
//    },
//
//    addItem(item, quantity){
//        var currentItem = _.find(this.items, {id: item.id});
//        if(!_.isUndefined(currentItem)){
//            currentItem.quantityToBuy += quantity;
//        } else {
//            this.items.push(_.extend(item, {quantityToBuy: quantity}))
//        }
//        this.triggerItems(this.items)
//    }
//});
//
//
//module.exports = {
//    basketActions: actions,
//    basketStore: basketStore
//};
