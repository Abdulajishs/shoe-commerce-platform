import { useContext } from "react";
import ProductContext from "../../store/product-context";
import ListProduct from "./ListProduct";

const Products = () =>{
    const {products} = useContext(ProductContext)
    // console.log(products);
    return(
        <ul>
            {products.map((product)=>(
                <ListProduct key={product.id} product={product} />
            )
        )}
        </ul>
        
    )
}
export default Products;