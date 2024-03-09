import { useCallback, useEffect, useState } from "react";
import CartContext from "./cart-context";

const CartContextProvider = (props) => {

    const [enteredCart, setEnteredCart] = useState([]);

    const addToCartHandler = async (item) => {
        const existingItemIndex = enteredCart.findIndex((ele) => ele.id === item.id)
        console.log(item);
        // console.log(enteredCart);
        if (existingItemIndex !== -1) {
            const updateItem = [...enteredCart];
            if (item.size === "L") {
                updateItem[existingItemIndex].quantityL = Number(updateItem[existingItemIndex].quantityL) + 1
            } else if (item.size === "M") {
                updateItem[existingItemIndex].quantityM = Number(updateItem[existingItemIndex].quantityM) + 1
            } else if (item.size === "S") {
                updateItem[existingItemIndex].quantityS = Number(updateItem[existingItemIndex].quantityS) + 1
            }
            const body = { ...updateItem[existingItemIndex] }
            // console.log(body);
            delete body._id
            delete body.size
            // console.log(body);
            // console.log(updateItem[existingItemIndex]._id)
            try {
                const response = await fetch(`https://crudcrud.com/api/08fdb1902608468c8002adfd5e4ffbca/cart/${updateItem[existingItemIndex]._id}`, {
                    method: "PUT",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                // console.log(response);
                if (response.ok) {
                    setEnteredCart(updateItem)
                } else {
                    throw new Error("Not adding cart item to server")
                }
            } catch (error) {
                alert(error.message)
            }

        } else {
            const body = {...item}
            delete body.size
            delete body._id
            try {
                const response = await fetch("https://crudcrud.com/api/08fdb1902608468c8002adfd5e4ffbca/cart", {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await response.json()
                if (response.ok) {
                    // console.log(data);
                    setEnteredCart(prevCart => [...prevCart, data])
                } else {
                    throw new Error("Not adding cart item to server")
                }
            } catch (error) {
                alert(error.message)
            }
        }
    }


    const getItemFromServerHandler = useCallback(async () => {
        try {
            const response = await fetch("https://crudcrud.com/api/08fdb1902608468c8002adfd5e4ffbca/cart")
            const data = await response.json()
            if (response.ok) {
                console.log(data);
                return data
            } else {
                throw new Error("Not retrive cart item from server")
            }
        } catch (error) {
            alert(error.message)
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getItemFromServerHandler()
            setEnteredCart(data)
        }
        fetchData()
    }, [getItemFromServerHandler])

    const cartContext = {
        cartItems: enteredCart,
        addToCart: addToCartHandler,
        getItemFromServer: getItemFromServerHandler,
        removeFromCart: () => { }
    }

    return (
        <>
            {console.log(cartContext.cartItems)}
            <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
        </>
    )
}

export default CartContextProvider;