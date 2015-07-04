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
            products: null,
            sortBy: 'none'
        }
    },

    componentDidMount() {
        categoriesActions.loadListOfCategories();
        productsActions.loadListOfProducts();
    },

    filterByCategory(id){
        productsActions.setCategory(id);
    },

    getCategories(){
        return !_.isNull(this.state.categories) ?
            this.state.categories.map(cat =>
                <a href="#" onClick={this.filterByCategory.bind(null, cat.id)} key={cat.id}>
                    {cat.title}
                </a>
            ) :
            null;
    },

    sortedItems(value){
        var products = this.state.products;
        if(value === 'none'){
            return products;
        }
        var sortedByPrice = _.sortBy(products, 'price');
        if(value === 'lowest') {
            return sortedByPrice;

        }
        return sortedByPrice.reverse();
    },

    getItems(){
        return !_.isNull(this.state.products) ?
            this.sortedItems(this.state.sortBy).map(product =>
                <Item product={product} key={product.id}/>
            ) :
            null;
    },

    changeSortBy(e){
        this.setState({
            sortBy: e.target.value
        })
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
                        <select type="select" label="Sort by" onChange={this.changeSortBy}>
                            <option value="none">-------</option>
                            <option value="lowest">Price: lowest first</option>
                            <option value="highest">Price: highest first</option>
                        </select>
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
