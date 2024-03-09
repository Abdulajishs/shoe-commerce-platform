import React from "react";

const CartContext = React.createContext({
    cartItems : [],
    addToCart : ()=>{},
    removeFromCart : ()=>{}
})

export default CartContext;