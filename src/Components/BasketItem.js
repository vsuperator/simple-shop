var React = require('react');
var _ = require('underscore');


var BasketItem = React.createClass({
    propTypes: {
      // there will be a proptypes
    },

    //getInitialState(){
    //    return {
    //        quantity:
    //    }
    //},

    //handleChange(e){
    //    this.setState({
    //        quantity: e.target.value
    //    });
    //},

    render(){
        var item = this.props.item;
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
