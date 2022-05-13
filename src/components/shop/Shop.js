import React, { useEffect, useState } from 'react';
import Cart from '../cart/Cart';
import Product from '../products/Product';
import "./Shop.css";
import { addToDb, getStoredCart } from "../../utilities/fakedb";

const Shop = () => {
    const [products, setproducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch("Products.json")
            .then(res => res.json())
            .then(data => setproducts(data))
    }, []);

    useEffect(() => {
        const storeedCart = getStoredCart();
        const savedCart = [];
        for (const id in storeedCart) {
            const addedProduct = products.find(produc => produc.id === id);
            if (addedProduct) {
                const quantity = storeedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
            setCart(savedCart);
        }
    }, [products])
        

    const handleAddToCart = (selectedproduct) => {
        let newCart = [];
        const exists = cart.find(product => product.id === selectedproduct.id);
        if (!exists) {
            selectedproduct.quantity = 1;
            newCart = [...cart, selectedproduct]
        }
        else {
            const rest = cart.filter(product => product.id !== selectedproduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedproduct.id)
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
               <Cart cart = {cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;