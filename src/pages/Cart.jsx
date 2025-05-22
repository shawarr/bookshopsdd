import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);

    }, []);

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleConfirmOrder = () => {
        localStorage.removeItem("cart"); // clear the cart
        alert("Order confirmed, an email has been sent for more details.")
        // go to confirmation screen
    };


    return (
        <div className={"text-white "}>
            <Header/>
            <div className="p-4 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty. <Link to="/" className="text-blue-500 underline">Go shopping</Link>.</p>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id}
                                     className="bg-gray-800 p-4 rounded-md shadow text-white flex justify-between items-center">
                                    <div>
                                        <img className={"w-40"} src={item.image_url}/>
                                        <h2 className="text-xl font-semibold">{item.title}</h2>
                                        <p>{item.author}</p>
                                        <p className="text-sm text-gray-300">Qty: {item.quantity}</p>


                                    </div>
                                    <p className="text-lg font-bold">JOD {item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 text-right text-white">
                            <h3 className="text-xl font-semibold">Total: JOD {total.toFixed(2)}</h3>
                            <button
                                onClick={handleConfirmOrder}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </>
                )}
            </div>
            <Footer/>
        </div>
    );
}
