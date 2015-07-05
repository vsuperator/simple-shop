'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('underscore');


var BasketItem = require('./BasketItem');
var {basketStore} = require('../Stores/basketStore');
require('../css/basket.css');


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
            price: null,
            countInBasket: null
        }
    },

    onBasketItemsReceived(data){
        this.setState(data);
    },

    getItems(){
        return !_.isNull(this.state.basketItems) ?
            this.state.basketItems.map(item =>
                <BasketItem item={_.clone(item)} key={item.id}/>
            ) :
            null;
    },

    render() {
        var basketCount = _.isNull(this.state.countInBasket) || this.state.countInBasket == 0 ?
            null : this.state.countInBasket;
        var totalPrice = _.isNull(this.state.price) || this.state.price == 0 ?
            null:
            <li className="basket-item total-price">
                {this.state.price}
            </li>;
        return (
            <div className="basket-container">
                <div className="basket-header">Shopping basket {basketCount}</div>
                <ul>
                    {this.getItems()}
                    {totalPrice}
                </ul>
            </div>
        );
    }
});


module.exports = Basket;
