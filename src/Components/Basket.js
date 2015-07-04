'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('underscore');


var BasketItem = require('./BasketItem');
var {basketStore} = require('../Stores/basketStore');
require('../css/product-item.css');


var Basket = React.createClass({
    mixins: [
        Reflux.listenTo(basketStore, 'onBasketItemsReceived')
    ],

    propTypes: {
        // there will be prop types
    },

    getInitialState(){
        return {
            basketItems: null,
            price: null
        }
    },

    onBasketItemsReceived(data){
        this.setState({
            basketItems: data.items,
            price: data.price
        });
    },

    getItems(){
        return !_.isNull(this.state.basketItems) ?
            this.state.basketItems.map(item => <BasketItem item={item} key={item.id}/>) :
            null;
    },

    render() {
        return (
            <div>
                <div className="header">Shopping basket</div>
                <ul>
                    {this.getItems()}
                </ul>
                <p>{this.state.price}</p>
            </div>
        );
    }
});


module.exports = Basket;
