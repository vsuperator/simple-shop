var Reflux = require('reflux');
var Api = require('../Api');
var _  = require('underscore');


var actions = Reflux.createActions([
    "loadListOfCategories"
]);

var categoriesStore = Reflux.createStore({
    init() {
        this.listenToMany(actions);
        this.categories = null;
    },

    loadListOfCategories() {
        Api.getCategories()
            .done(response => this.categoriesReceived(response.categories));
    },

    categoriesReceived(data){
        this.categories = _.clone(data);
        this.trigger(this.categories);
    }
});


module.exports = {
    categoriesActions: actions,
    categoriesStore: categoriesStore
};
