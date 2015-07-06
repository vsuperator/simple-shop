'use strict';

var React = require('react');
require('../css/gallery.css');

var Gallery = React.createClass({

    generatePathToImages(gallery){
        var result = {};
        for(var i = 0; i < gallery.images.length; i++ ){
            result[i] = './images/' + gallery.id + '/' + gallery.images[i];
        }
        return result;
    },

    render() {
        var images = this.generatePathToImages(this.props.gallery);
        return (
            <div className="gallery-container">
                <img src={images[0]}/>
            </div>
        );
    }
});


module.exports = Gallery;
