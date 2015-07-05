'use strict';

var React = require('react');
var _ = require('underscore');
var Reflux = require('reflux');

var Item = require('./Item');
var {categoriesStore, categoriesActions} = require('../Stores/categoriesStore');
var {productsStore, productsActions} = require('../Stores/productsStore');
var {galleriesStore, galleriesActions} = require('../Stores/galleriesStore');
var Basket = require('./Basket');
require('../css/main.css');

var App = React.createClass({
    mixins: [
        Reflux.connect(categoriesStore, 'categories'),
        Reflux.connect(productsStore, 'products'),
        Reflux.connect(galleriesStore, 'galleries')
    ],

    getInitialState() {
        return {
            categories: null,
            products: null,
            galleries: null,
            sortBy: 'none',
            category: null
        }
    },

    componentDidMount() {
        categoriesActions.loadListOfCategories();
        productsActions.loadListOfProducts();
        galleriesActions.loadListOfImages();
    },

    filterByCategory(id){
        this.setState({
            category: id
        });
    },

    getCategories(){
        return !_.isNull(this.state.categories) ?
            this.state.categories.map(cat =>
                <a className="category" href="#" onClick={this.filterByCategory.bind(null, cat.id)} key={cat.id}>
                    {cat.title}
                </a>
            ) :
            null;
    },

    sortedItems(value){
        var products = !_.isNull(this.state.category) ?
            _.where(this.state.products, {category_id: this.state.category}) :
            this.state.products;
        if(value === 'none'){
            return products;
        }
        var sortedByPrice = _.sortBy(products, 'price');
        if(value === 'lowest') {
            return sortedByPrice;

        }
        return sortedByPrice.reverse();
    },

    getImagesById(id){
        return _.find(this.state.galleries, {id: id}).images;
    },

    getItems(){
        return !_.isNull(this.state.products) && !_.isNull(this.state.galleries) ?
            this.sortedItems(this.state.sortBy).map(product =>
                <Item product={product} images={this.getImagesById(product.gallery_id)} key={product.id}/>
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
            <div className="main-container">
                <div className="header">
                    <div className="header-top-line">
                        <span>Please choose category: </span>
                        {this.getCategories()}
                    </div>
                    <div className="header-bottom-line">
                        <select type="select" label="Sort by" onChange={this.changeSortBy}>
                            <option value="none">-------</option>
                            <option value="lowest">Price: lowest first</option>
                            <option value="highest">Price: highest first</option>
                        </select>
                    </div>
                </div>
                <ul className="items-container">
                    {this.getItems()}
                </ul>
                <Basket />
            </div>
        );
    }
});


module.exports = App;
