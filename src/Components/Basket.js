'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('underscore');


var BasketItem = require('./BasketItem');
var {productsStore} = require('../Stores/productsStore');
//require('../css/basket.css');


var Basket = React.createClass({
    mixins: [
        Reflux.listenTo(productsStore, 'onProductsReceived')
    ],

    propTypes: {
        // there will be prop types
    },

    getInitialState(){
        return {
            basketItems: null
        }
    },

    onProductsReceived(data){
        console.log(data);
        var basketItems = data.filter(item => item.countInBasket > 0);
        this.setState({
            basketItems: basketItems
        })
    },

    getItemsCountInBasket(){
        return !_.isNull(this.state.basketItems) ?
            this.state.basketItems.reduce((sum, current) =>
                sum + current.countInBasket,0):
            null;
    },

    getTotalPrice(){
        return !_.isNull(this.state.basketItems) ?
            this.state.basketItems.reduce((sum, current) =>
                sum + (current.countInBasket * current.price),0):
            null;
    },

    getItems(){
        return !_.isNull(this.state.basketItems) ?
            this.state.basketItems.map(item =>
                <BasketItem item={_.clone(item)} key={item.id}/>
            ) :
            null;
    },

    render() {
        var basketCount = this.getItemsCountInBasket() || null;
        var totalPrice = this.getTotalPrice() ?
            <li className="basket-item total-price">
                {this.getTotalPrice().toFixed(2)}
            </li> :
            null;
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
