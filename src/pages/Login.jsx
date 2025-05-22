import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../firebase"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "../styles/Form.module.css";
import {FormButton} from "../components/FormButton.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [redirect,setRedirect] = useState()
    const [error,setError] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
        await signInWithEmailAndPassword(auth, email, password)
            setRedirect(true)
        }
        catch(error){
            setError(error)
            console.error(error.message)
        }

    }
    useEffect(()=> {
        if(redirect){
            navigate('/')
        }
    })
    return (
        <div className={"flex flex-col min-h-screen text-white bg-gray-900"}>
            <Header/>

            <main className={"flex-grow flex items-center justify-center align-middle shadow-lg rounded-xl p-6 w-full max-w-md mx-auto mt-4 mb-4 transition duration-300 ease-in-out hover:shadow:2xl"}>

                <form onSubmit={handleLogin}>
                    <div className={"text-3xl font-bold mb-6"}>
                        <h1>Log In</h1>
                    </div>


                    <div className={styles.formRow}>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                               placeholder={"Email Address"}/></div>

                    <div className={styles.formRow}>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                               placeholder={"Password"}/></div>

                    {error && (
                        <div><p className={"text-red-500 mb-1"}>{error.message}</p></div>
                    )}


                    <FormButton text={"Log In"} type={"submit"}/>
                    <hr className={"text-black/30 mb-4"}/>
                    <FormButton text={"Don't have an account?"} clickFunction={() => navigate("/signup")}/>

                </form>

            </main>
            <Footer/>


        </div>
    )
}