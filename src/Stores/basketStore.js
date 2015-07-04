var Reflux = require('reflux');
var _  = require('underscore');


var actions = Reflux.createActions([
    ""
]);

var basketStore = Reflux.createStore({
    init() {
        this.listenToMany(actions);
        this.items = null;
    },

    addItem(item){
        this.items = _.isNull(this.items) ? item : _.extend(this.items, data)
        this.trigger(this.items)
    }
});


module.exports = {
    basketActions: actions,
    basketStore: basketStore
};
