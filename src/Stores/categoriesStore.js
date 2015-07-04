var Reflux = require('reflux');


var actions = Reflux.createActions([
    "loadListOfCategories"
]);

var categoriesStore = Reflux.createStore({
    init() {
        this.listenToMany(actions);
    },

    loadListOfCategories() {
        console.log('111');
    }
});


module.exports = {
    categoriesActions: actions,
    categoriesStore: categoriesStore
};
