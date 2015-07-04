var Reflux = require('reflux');
var _  = require('underscore');


var actions = Reflux.createActions([
    "addItem",
    "decreaseItemsQuantity"
]);

var basketStore = Reflux.createStore({
    init() {
        this.listenToMany(actions);
        this.items = [];
    },

    getPrice(){
        return this.items.reduce(function(sum, current) {
            return sum + (current.price * current.quantityToBuy);
        }, 0);
    },

    removeItem(id){
        var currentItem = _.find(this.items, {id: id});
        this.items = _.without(this.items, currentItem)
    },

    decreaseItemsQuantity(id, quantity){
        var currentItem = _.find(this.items, {id: id});
        currentItem.quantityToBuy -= quantity;
        if(currentItem.quantityToBuy === 0){
            this.removeItem(id);
        }
        this.trigger({
            items: this.items,
            price: this.getPrice()
        })
    },

    addItem(item, quantity){
        var currentItem = _.find(this.items, {id: item.id});
        if(!_.isUndefined(currentItem)){
            currentItem.quantityToBuy += quantity;
        } else {
            this.items.push(_.extend(item, {quantityToBuy: quantity}))
        }

        this.trigger({
            items: this.items,
            price: this.getPrice()
        })
    }
});


module.exports = {
    basketActions: actions,
    basketStore: basketStore
};
