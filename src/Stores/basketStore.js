var Reflux = require('reflux');
var _  = require('underscore');


var actions = Reflux.createActions([
    "addItem"
]);

var basketStore = Reflux.createStore({
    init() {
        this.listenToMany(actions);
        this.items = [];
    },

    getPrice(){
        return this.items.reduce(function(sum, current) {
            return sum + (current.price * current.quantity);
        }, 0);
    },

    addItem(item, quantity){
        var currentItem = _.find(this.items, {id: item.id});
        if(!_.isUndefined(currentItem)){
            currentItem.quantity += quantity;
        } else {
            this.items.push(_.extend(item, {quantity: quantity}))
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
