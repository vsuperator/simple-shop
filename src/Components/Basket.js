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
        this.setState({
            basketItems: data.items,
            price: data.price,
            countInBasket: data.count
        });
    },

    getItems(){
        return !_.isNull(this.state.basketItems) ?
            this.state.basketItems.map(item =>
                <BasketItem item={_.clone(item)} key={item.id}/>
            ) :
            null;
    },

    render() {
        var totalPrice = _.isNull(this.state.price) || this.state.price == 0 ?
            null:
            <li className="basket-item total-price">
                {this.state.price}
            </li>;
        return (
            <div className="basket-container">
                <div className="basket-header">Shopping basket {this.state.countInBasket}</div>
                <ul>
                    {this.getItems()}
                    {totalPrice}
                </ul>
            </div>
        );
    }
});


module.exports = Basket;
