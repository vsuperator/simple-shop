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

    addItem(item){
        this.items.push(item);
        this.trigger(this.items)
    }
});


module.exports = {
    basketActions: actions,
    basketStore: basketStore
};
