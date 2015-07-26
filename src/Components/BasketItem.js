var React = require('react');
var _ = require('underscore');
var _str = require('underscore.string');
var {productsActions} = require('../Stores/productsStore');


var BasketItem = React.createClass({
    propTypes: {
      // there will be a proptypes
    },

    handleChange(e){
        var different = this.props.item.countInBasket - e.target.value;
        productsActions.updateItemFromBasket(this.props.item.id, different);
    },

    render(){
        var item = this.props.item;
        var price = item.countInBasket * item.price;
        return (
            <li className="basket-item">
                <span className='basket-item-title'>{item.title}</span>
                <div className="basket-item-right-block">
                    <input className="basket-input" type="number" value={item.countInBasket}
                        onChange={this.handleChange} min="0" max={item.quantity}/>
                    <span>{price}</span>
                </div>
            </li>
        )
    }
});


module.exports = BasketItem;
