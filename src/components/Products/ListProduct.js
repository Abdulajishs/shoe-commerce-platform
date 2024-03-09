import { useContext } from "react";
import CartContext from "../../store/cart-context";
import ProductContext from "../../store/product-context";

const ListProduct = ({ product }) => {
    const cartCntx = useContext(CartContext)
    const proCntx = useContext(ProductContext)

    const quantityLHandler = (event) => {
        event.preventDefault()
        if(product.quantityL > 0){
            const item = { ...product }
            cartCntx.addToCart({ ...item, quantityL: 1,quantityM : 0,quantityS:0, size: "L" })
            proCntx.addProducts({ ...product, size: "L" })
        }
    }

    const quantityMHandler = (event) => {
        event.preventDefault()
        if(product.quantityM > 0){
            const item = { ...product }
            console.log(item);
            console.log(product);
            cartCntx.addToCart({ ...item, quantityL: 0,quantityM : 1,quantityS:0, size: "M"  })
            proCntx.addProducts({ ...product, size: "M" })
        }
    }

    const quantitySHandler = (event) => {
        event.preventDefault()
        if (product.quantityS > 0) {
            const item = { ...product }
            cartCntx.addToCart({ ...item, quantityL: 0,quantityM : 0,quantityS:1, size: "S"  })
            // console.log(item);
            proCntx.addProducts({ ...product, size: "S" })
        }
    }

    return (
        <li key={product.id}>
            {product.id} -
            {product.name} -
            {product.description} -
            {product.price} -
            <button onClick={quantityLHandler}>{product.quantityL}</button>  -
            <button onClick={quantityMHandler}>{product.quantityM}</button> -
            <button onClick={quantitySHandler}>{product.quantityS}</button>
        </li>
    );
};

export default ListProduct;


