var Reflux = require('reflux');
var _  = require('underscore');


var actions = Reflux.createActions([
    ""
]);

var basketStore = Reflux.createStore({
    init() {
        this.listenToMany(actions);
        this.items = null;
    }
});


module.exports = {
    basketActions: actions,
    basketStore: basketStore
};
