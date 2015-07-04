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

    addItem(item, quantity){
        var currentItem = _.find(this.items, {id: item.id});
        if(!_.isUndefined(currentItem)){
            currentItem.quantity += quantity;
        } else {
            this.items.push(_.extend(item, {quantity: quantity}))
        }

        // Если мы находим ттекщий item то увеличиваем количество на
        //console.log(item);
        //this.items.push(item);
        this.trigger(this.items)
    }
});


module.exports = {
    basketActions: actions,
    basketStore: basketStore
};
