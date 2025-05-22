import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore"
import {db} from "../firebase";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {FormButton} from "../components/FormButton.jsx";
import {Link} from "react-router-dom";
export default function Home(){
    const [books,setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const filteredBooks = books.filter((book) =>( book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase()) || book.category.toLowerCase().includes(searchTerm.toLowerCase())))
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "books"))
                const booksData = querySnapshot.docs.map((doc)=> ({
                    id:doc.id,
                    ...doc.data()
                }))
                setBooks(booksData);
            }
            catch (e) {
                console.error(e)
            }
        }
        fetchBooks();
    },[])
    return (

        <div className={"bg-gray-900"}>
            <Header/>
            <div className="px-4 sm:mx-auto max-w-md mt-4 text-white">
                <input
                    type="text"
                    placeholder="Search books..."
                    className="w-full block mb-2 p-2 border-2 border-blue-500 rounded-md shadow-md shadow-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2 m-2">
                {filteredBooks.map((book) => (
                    <div key={book.id} className="bg-blue-700/20 shadow-md rounded-xl p-4 flex flex-col justify-between h-full text-white">
                        <img src={book.image_url} alt={book.title} className="w-full h-max object-cover rounded-md"/>
                        <h3 className="text-xl font-semibold mt-2">{book.title}</h3>
                        <p className="text-sm ">{book.author}</p>
                        <p className="text-lg font-bold mt-1 mb-2">JOD {book.price}</p>
                        <Link to={`/product/${book.id}`}>

                            <div className={"flex align-middle justify-center items-center mb-4"}>
                                <button className={"text-white bg-blue-500 px-4 py-2 rounded-md hover:text-white/80 transition"} >View Info</button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );

}