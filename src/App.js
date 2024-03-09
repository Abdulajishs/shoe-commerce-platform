import { Route, Routes } from "react-router-dom";
import RootLayout from "./pages/Root";
import Admin from "./pages/Admin";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <>
    <RootLayout>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </RootLayout>

    </>
  )
}

export default App;
