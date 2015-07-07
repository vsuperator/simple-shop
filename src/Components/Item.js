'use strict';

var React = require('react');
var _ = require('underscore');
var _str = require('underscore.string');

var {productsStore, productsActions} = require('../Stores/productsStore');
var Gallery = require('./Gallery');
require('../css/product-item.css');

var Item = React.createClass({
    propTypes: {
        // there will be prop types
    },

    getInitialState(){
        return {
            quantity: 1,
            product: _.clone(this.props.product)
        }
    },

    addTobasket: function () {
        if(this.state.product.quantity == this.props.product.countInBasket){
            return
        }
        productsActions.updateItem(this.state.product.id, this.state.quantity);
    },

    handleChange(e){
        this.setState({
            quantity: +e.target.value
        });
    },

    render() {
        var product = this.state.product;
        var balance = product.quantity - this.props.product.countInBasket;
        var valueInSelect = balance == 0 ? balance : this.state.quantity;

        return (
            <li className="product-item">
                <Gallery gallery={this.props.gallery}/>
                <a href="#" className="product-title">{_str.truncate(product.title, 20)}</a>
                <span className="description">{_str.truncate(product.description, 70)}</span>
                <div className="item-select-container">
                    <input type="number" defaultValue="1" value={valueInSelect}
                        min="0" max={balance} onChange={this.handleChange}/>
                    <span>{product.price}</span>
                    <button className={balance == 0 ? 'disable' : null}
                        onClick={this.addTobasket}>Add</button>
                </div>
            </li>
        );
    }
});


module.exports = Item;
