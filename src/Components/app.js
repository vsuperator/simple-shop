'use strict';

var React = require('react');
var _ = require('underscore');
var Reflux = require('reflux');

var Item = require('./Item');
var {categoriesStore, categoriesActions} = require('../Stores/categoriesStore');
var {productsStore, productsActions} = require('../Stores/productsStore');
var Basket = require('./Basket');

var App = React.createClass({
    mixins: [
        Reflux.connect(categoriesStore, 'categories'),
        Reflux.connect(productsStore, 'products')
    ],
    getInitialState() {
        return {
            categories: null,
            products: null
        }
    },
    componentDidMount() {
        categoriesActions.loadListOfCategories();
        productsActions.loadListOfProducts();
    },

    sortByCategory(value){
        console.log(value);
    },

    getCategories(){
        return !_.isNull(this.state.categories) ?
            this.state.categories.map(cat =>
                <a href="#" onClick={this.sortByCategory.bind(null, cat.id)} key={cat.id}>
                    {cat.title}
                </a>
            ) :
            null;
    },


    getItems(){
        return !_.isNull(this.state.products) ?
            this.state.products.map(product =>
                <Item product={product} key={product.id}/>
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
                <ul>
                    {this.getItems()}
                </ul>
                <Basket />
            </div>
        );
    }
});


module.exports = App;
