import React from "react";

const ProductContext = React.createContext({
    products : [],
    addProducts : ()=>{},
})

export default ProductContext;