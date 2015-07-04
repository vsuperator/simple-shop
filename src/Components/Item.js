'use strict';

var React = require('react');
var _ = require('underscore');

var {basketStore, basketActions} = require('../Stores/basketStore');
var {productsStore, productsActions} = require('../Stores/productsStore');
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
        productsActions.decreaseQuantity(this.state.product.id, this.state.quantity);
        basketActions.addItem(this.state.product, this.state.quantity);
    },

    handleChange(e){
        this.setState({
            quantity: +e.target.value
        });
    },

    render() {
        var product = this.props.product;
        return (
            <li className="product-item">
                <p>Галерея</p>
                <a href="#">{product.title}</a>
                <span className="description">{product.description}</span>
                <div>
                    <input type="number" value={product.quantity == 0 ? 0 : this.state.quantity}
                        min="0" max={product.quantity} onChange={this.handleChange}/>
                    <span>{product.price}</span>
                    <button className={product.quantity == 0 ? 'disable' : null}
                        onClick={this.addTobasket}>Add to basket</button>
                </div>
            </li>
        );
    }
});


module.exports = Item;
