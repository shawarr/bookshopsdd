import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Confirm from "./pages/Confirm";
import RequireAuth from "./components/RequireAuth.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/product/:id"
                    element={
                        <RequireAuth>
                            <Product />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <RequireAuth>
                            <Cart />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/confirm"
                    element={
                        <RequireAuth>
                            <Confirm />
                        </RequireAuth>
                    }
                />
            </Routes>
        </Router>
    );
}
export default App;
