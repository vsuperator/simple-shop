var React = require('react');


var BasketItem = React.createClass({
    propTypes: {
      // there will be a proptypes
    },

    render(){
        var item = this.props.item;
        return (
            <li>
                there is basket item
                <span>{item.title}</span>
                <input type="number" min="1" max="999"/>
                <span>{item.price}</span>
            </li>
        )
    }
});


module.exports = BasketItem;
