var Reflux = require('reflux');
var Api = require('../Api');
var _  = require('underscore');


var actions = Reflux.createActions([
    "loadListOfImages"
]);

var galleriesStore = Reflux.createStore({
    init() {
        this.listenToMany(actions);
        this.images = null;
    },

    loadListOfImages() {
        Api.getImages()
            .done(response => this.imagesReceived(response.galleries));
    },

    imagesReceived(data){
        this.images = _.clone(data);
        this.trigger(this.images);
    }
});


module.exports = {
    galleriesActions: actions,
    galleriesStore: galleriesStore
};
