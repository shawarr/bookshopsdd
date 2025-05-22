import {useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from '../firebase';
import {useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
export default function App() {
    const {id} = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity]=useState(1);
    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingIndex = cart.findIndex((item) => item.id ===book.id);
        if(existingIndex !== -1){
            cart[existingIndex].quantity +=quantity;
        }else{
            cart.push({...book, quantity})
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        setQuantity(1);
        alert(`${book.title} added to cart!`);
    }
    useEffect(()=> {
        const fetchBook = async () => {
            try {
                const docRef = doc(db,"books", id)
                const docSnap= await getDoc(docRef);

                if(docSnap.exists()) {
                    setBook({id:docSnap.id, ...docSnap.data()});
                }
                else{
                    console.log('No such book!')
                }

            }
            catch(e){
                console.error(e)
            }
            finally{
                setLoading(false);
            }
        }
        fetchBook();
    },[id])
    if(loading) return <p className={"p-4"}>Loading Book...</p>
    if(!book) return <p className={"p-4"}>Book not found</p>
    return (

        <div className={"bg-gray-900"}>
            <Header/>
            <div className="p-6 max-w-3xl mx-auto text-white">
                <p className={"text-blue-200 p-2 m-2 italic underline"}>{book.category}</p>
                <img src={book.image_url}
                     alt={book.title}
                     className={"w-full max-h-full object-cover rounded-lg  shadow-md shadow-gray-700"}
                />
                <h1 className={"text-3xl font-bold mt-4"}>{book.title}</h1>
                <p className={"text-xl"}>{book.author}</p>
                <p className={"hover:text-blue-500 text-lg text-white font-semibold mt-2"}>JOD {book.price}</p>
                <button className={"mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"} onClick={() => setQuantity((prev) => Math.max(1, prev -1))}>-</button>
                <button className={"mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"} onClick={handleAddToCart}>Add to Cart ({quantity})</button>
                <button className={"mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md ml-2 "} onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                <div className={"bg-blue-700/20 p-4 my-4 rounded-2xl shadow-2xl shadow-black text-white"}>
                    <p>
                        {book.description}
                    </p>
                </div>

            </div>
            <Footer/>
        </div>
    )
}