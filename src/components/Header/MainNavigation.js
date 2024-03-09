import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css"
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const MainNavigation = () => {
    const cartCntx = useContext(CartContext);
    const total = cartCntx.cartItems.reduce((acc, item) => acc + Number(item.quantityL + item.quantityM + item.quantityS), 0)
    return (
            <header className={classes.header}>
                <h1>Shoe Commerce</h1>
                <ul>
                    <li>
                        <Link to='/'>Admin</Link>
                    </li>
                    <li>
                        <Link to='/products'>Products</Link>
                    </li>
                    <li>

                        <Link to='/cart'>Cart -{total}</Link>

                    </li>
                </ul>
            </header>
    )

}

export default MainNavigation;