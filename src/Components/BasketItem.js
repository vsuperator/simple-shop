var React = require('react');
var _ = require('underscore');
var {productsActions} = require('../Stores/productsStore');
var {basketActions} = require('../Stores/basketStore');


var BasketItem = React.createClass({
    propTypes: {
      // there will be a proptypes
    },


    handleChange(e){
        console.log(this.props.item.quantity);
        if(e.target.value < this.props.item.quantityToBuy) {
            var different = this.props.item.quantityToBuy - e.target.value;
            productsActions.increaseQuantity(this.props.item.id, different, this.props.item.quantity);
            basketActions.decreaseItemsQuantity(this.props.item.id, different);
        }
        // Нужно изменять значение в productStore
        // а также в basketStore
    },

    render(){
        var item = this.props.item;
        var price = item.quantityToBuy * item.price;
        return (
            <li>
                <span>{item.title}</span>
                <input type="number" value={item.quantityToBuy} onChange={this.handleChange} min="0" max="999"/>
                <span>{price}</span>
            </li>
        )
    }
});


module.exports = BasketItem;
