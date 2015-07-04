'use strict';

var React = require('react');
var _ = require('underscore');
var Reflux = require('reflux');

var Item = require('./Item');
var {categoriesStore, categoriesActions} = require('../Stores/categoriesStore');

var App = React.createClass({
    mixins: [
        Reflux.connect(categoriesStore, 'categories')
    ],
    getInitialState() {
        return {
            categories: null
        }
    },
    componentDidMount() {
        categoriesActions.loadListOfCategories();
    },

    sortByCategory(value){
        console.log(value);
    },

    getCategories(){
        return !_.isNull(this.state.categories) ?
            this.state.categories.map(cat =>
                <a href="#" onClick={this.sortByCategory.bind(null, cat.id)}>{cat.title}</a>
            ) :
            null;
    },

    render() {
        return (
            <div>
                <div className="header">
                    <div>
                        <span>Please choose category</span>
                        {this.getCategories()}
                    </div>
                    <div>
                        <span>Sort by</span>
                    </div>
                </div>
                <Item/>
            </div>
        );
    }
});


module.exports = App;
