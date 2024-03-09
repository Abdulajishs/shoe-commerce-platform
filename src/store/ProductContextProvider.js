import { useCallback, useEffect, useState } from "react"
import ProductContext from "./product-context"

const ProductContextProvider = (props) => {
    const [enteredProducts, setEnteredProducts] = useState([])

    const addProductsHandler = async (product) => {
        const existingProductIndex = enteredProducts.findIndex((ele) => ele.id === product.id);
        console.log(existingProductIndex);
        console.log(product);
        if (existingProductIndex !== -1) {
            const updateProduct = [...enteredProducts]
            if (product.size === "L") {
                updateProduct[existingProductIndex].quantityL = Number(updateProduct[existingProductIndex].quantityL) - 1
            }else if (product.size === "M") {
                updateProduct[existingProductIndex].quantityM = Number(updateProduct[existingProductIndex].quantityM) - 1
            }else if (product.size === "S"){
                updateProduct[existingProductIndex].quantityS = Number(updateProduct[existingProductIndex].quantityS) - 1
            }
            // console.log(product._id);
            // console.log(updateProduct[existingProductIndex]);
            const body = {...updateProduct[existingProductIndex]}
            delete body._id 
            // console.log(body);
            try {
                const response = await fetch(`https://crudcrud.com/api/08fdb1902608468c8002adfd5e4ffbca/products/${updateProduct[existingProductIndex]._id}`, {
                    method: "PUT",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                console.log(response);
                if (response.ok) {
                    setEnteredProducts(updateProduct)
                } else {
                    throw new Error("addProduct failed")
                }
            } catch (error) {
                alert(error.message)
            }

        } else {
            try {
                const response = await fetch("https://crudcrud.com/api/08fdb1902608468c8002adfd5e4ffbca/products", {
                    method: "POST",
                    body: JSON.stringify(product),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    console.log(data);
                    setEnteredProducts(prevproduct => [...prevproduct, product])
                } else {
                    throw new Error("addProduct failed")
                }
            } catch (error) {
                alert(error.message)
            }
        }
    }
    const getProductFromServer = useCallback(async () => {
        try {
            const response = await fetch("https://crudcrud.com/api/08fdb1902608468c8002adfd5e4ffbca/products")
            const data = await response.json()
            if (response.ok) {
                console.log(data);
                return data
            } else {
                throw new Error("addProduct failed")
            }
        } catch (error) {
            alert(error.message)
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProductFromServer()
            setEnteredProducts(data)
        }
        fetchData()
    }, [getProductFromServer])

    const productContext = {
        products: enteredProducts,
        addProducts: addProductsHandler
    }
    return (
        <>
            {/* {console.log(productContext.products)} */}
            <ProductContext.Provider value={productContext}>{props.children}</ProductContext.Provider>
        </>
    )
}

export default ProductContextProvider;