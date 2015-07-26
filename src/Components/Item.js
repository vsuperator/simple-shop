'use strict';

var React = require('react');
var _ = require('underscore');
var _str = require('underscore.string');

var {productsStore, productsActions} = require('../Stores/productsStore');
var Gallery = require('./Gallery');
//require('../css/product-item.css');

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
                <div className="product-description-block">
                    <div className="product-title">
                        <a href="#">{_str.truncate(product.title, 20)}</a>
                    </div>

                    <div className="product-description">{_str.truncate(product.description, 70)}</div>

                    <div className="item-select-container">
                        <input type="number" defaultValue="1" value={valueInSelect}
                            className="item-input"
                            min="0" max={balance} onChange={this.handleChange}/>
                        <div className="price-container">
                            <span className="produc-price btn">{product.price}</span>
                            <span className={balance == 0 ? 'disable' : "add-to-basket btn"}
                                onClick={this.addTobasket}>
                                A
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
});


module.exports = Item;
