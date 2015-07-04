'use strict';

var React = require('react');
var Item = require('./Item');
var {categoriesStore, categoriesActions} = require('../Stores/categoriesStore');

var App = React.createClass({
    componentDidMount() {
        categoriesActions.loadListOfCategories();
    },

    render() {
        return (
            <div>
                <div className="header">
                    <div>
                        <span>Please choose category</span>
                        <a href='#'>Category #1</a>
                        <a href='#'>Category #2</a>
                        <a href='#'>Category #3</a>
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
