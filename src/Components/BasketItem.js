var React = require('react');


var BasketItem = React.createClass({
    propTypes: {
      // there will be a proptypes
    },

    //getInitialState(){
    //    return {
    //        quantity: this.props.item.quantity
    //    }
    //},

    handleChange(e){
        console.log(e.target.value);
    },

    render(){
        var item = this.props.item;
        console.log(item.quantity);
        var price = item.quantity * item.price;
        return (
            <li>
                <span>{item.title}</span>
                <input type="number" value={item.quantity} onChange={this.handleChange} min="1" max="999"/>
                <span>{price}</span>
            </li>
        )
    }
});


module.exports = BasketItem;
