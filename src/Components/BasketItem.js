var React = require('react');
var _ = require('underscore');
var _str = require('underscore.string');
var {productsActions} = require('../Stores/productsStore');
var {basketActions} = require('../Stores/basketStore');


var BasketItem = React.createClass({
    propTypes: {
      // there will be a proptypes
    },


    handleChange(e){
        var different = this.props.item.quantityToBuy - e.target.value;
        if(e.target.value < this.props.item.quantityToBuy) {
            productsActions.increaseQuantity(this.props.item.id, different, this.props.item.quantity);
            basketActions.decreaseItemsQuantity(this.props.item.id, different);
            return
        }
        productsActions.decreaseQuantity(this.props.item.id, different, this.props.item.quantity);
        basketActions.increaseItemsQuantity(this.props.item.id, different);
    },

    render(){
        var item = this.props.item;
        var price = item.quantityToBuy * item.price;
        return (
            <li className="basket-item">
                <span>{_str.truncate(item.title, 26)}</span>
                <div className="basket-item-right-block">
                    <input type="number" value={item.quantityToBuy} onChange={this.handleChange} min="0" max={item.quantity}/>
                    <span>{price}</span>
                </div>
            </li>
        )
    }
});


module.exports = BasketItem;
