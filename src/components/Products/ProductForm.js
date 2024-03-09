import { useContext, useRef } from "react";
import classes from "./ProductForm.module.css";
import ProductContext from "../../store/product-context";

const ProductForm = () => {
    const idRef = useRef();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const lRef = useRef();
    const mRef = useRef();
    const sRef = useRef();

    const proCntx = useContext(ProductContext);

    const submitHandler = (event) => {
        event.preventDefault()

        const product = {
            id : idRef.current.value,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            quantityL: lRef.current.value,
            quantityM: mRef.current.value,
            quantityS: sRef.current.value
        }

        proCntx.addProducts(product)

    }
    return (
        <form onSubmit={submitHandler} className={classes["product-form"]}>
            <div className={classes["form-group"]}>
                <label htmlFor="id" className={classes.label}>Id :</label>
                <input id="id" type="number" ref={idRef} required className={classes.input} />
            </div>
            <div className={classes["form-group"]}>
                <label htmlFor="name" className={classes.label}>Name :</label>
                <input id="name" type="text" ref={nameRef} required className={classes.input} />
            </div>
            <div className={classes["form-group"]}>
                <label htmlFor="description" className={classes.label}>Description :</label>
                <input id="description" type="text" ref={descriptionRef} required className={classes.input} />
            </div>
            <div className={classes["form-group"]}>
                <label htmlFor="price" className={classes.label}>Price :</label>
                <input id="price" type="number" ref={priceRef} required className={classes.input} />
            </div>
            <div className={classes["form-group"]}>
                <label className={classes.label}>Quantity Available</label>
                <div className={classes["quantity-input"]}>
                    <div>
                        <p>L</p>
                        <input id="quantityL" type="number" min="0" ref={lRef} required className={classes.input} />
                    </div>
                    <div>
                        <p>M</p>
                        <input id="quantityM" type="number" min="0" ref={mRef} required className={classes.input} />
                    </div>
                    <div>
                        <p>S</p>
                        <input id="quantityS" type="number" min="0" ref={sRef} required className={classes.input} />
                    </div>
                </div>
            </div>
            <button type="submit" className={classes.button}>Add Products</button>
        </form>
    )
}

export default ProductForm;
