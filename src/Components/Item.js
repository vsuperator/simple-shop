'use strict';

var React = require('react');
require('../css/product-item.css');

var Item = React.createClass({
    propTypes: {
        // there will be prop types
    },

    addTobasket: function () {
        console.log('addTobasket');
    },

    render() {
        var product = this.props.product;
        return (
            <li className="product-item">
                <p>Галерея</p>
                <a href="#">{product.title}</a>
                <span className="description">{product.description}</span>
                <div>
                    <input type="number" min="1" max={product.quantity}/>
                    <span>{product.price}</span>
                    <button onClick={this.addTobasket}>Add to basket</button>
                </div>
            </li>
        );
    }
});


module.exports = Item;
