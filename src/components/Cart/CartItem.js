import { useContext } from "react";
import CartContext from "../../store/cart-context";
import ListCart from "./ListCart";
import classes from "./CartItem.module.css"
import { useNavigate } from "react-router-dom";

const CartItem = (props) => {
    const { cartItems } = useContext(CartContext)
    const history = useNavigate()

    const total = cartItems.reduce((acc,item)=> acc+Number(item.price*(item.quantityL +item.quantityM+item.quantityS)) ,0);

    const purchaseHandler = (event) =>{
        event.preventDefault();
        alert("Thanks for purchasing...")
    }

    const cancelHandler = (event) =>{
        event.preventDefault();
        history("/")
    }

    return (
        <section className={classes.section}>
            <ul>
                {cartItems.map((item) => (
                    <ListCart key={item.id} item={item} />
                )
                )}
            </ul>
            <h3>Total -  {total}</h3>
            <button onClick={purchaseHandler}>Purchase</button>
            <button onClick={cancelHandler}>Cancel</button>
        </section>
    )
}

export default CartItem;