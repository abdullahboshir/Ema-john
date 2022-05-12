import React, { useEffect, useState } from 'react';
import Product from '../products/Product';
import "./Shop.css";

const Shop = () => {
    const [products, setproducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch("Products.json")
            .then(res => res.json())
        .then(data => setproducts(data))
    }, [])

    const handleAddToCart = (product) => {
        console.log(product)
        const newCart = [...cart, product];
        setCart(newCart)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        handleAddToCart = {handleAddToCart}
                        product = {product}
                    ></Product>)
               }
            </div>
            <div className="cart-container">
                <h4>Order Summery</h4>
                <p>Selected Items: {cart.length}</p>
            </div>
        </div>
    );
};

export default Shop;