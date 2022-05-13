import React from 'react';
import "./Cart.css"

const Cart = (props) => {
    const { cart } = props;
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for (const product of cart) {
        quantity = quantity + product.quantity * product.quantity;
         total = total + product.price;
        shipping += product.shipping;
    }

    const tax = total / 10;
    const grandTotal = total + shipping + tax;
    return (
        <div className='cart'>
             <h4>Order Summery</h4>
                <p>Selected Items: {quantity}</p>
                <p>Total Price: ${total}</p>
                <p>Total Shipping Charge: ${shipping}</p>
            <p>Tax: ${tax}</p>
            <h4>Grand Total: ${grandTotal}</h4>
        </div>
    );
};

export default Cart;