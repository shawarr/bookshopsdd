import {useEffect, useState} from "react";
import {Form, useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import styles from "../styles/Form.module.css";
import {FormButton} from "../components/FormButton.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [redirect,setRedirect] = useState();
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(userCredential.user, {displayName: name})
            setRedirect(true);
        }
        catch(error) {
           setError(error);
           console.error(error.message);
        }
    }
    useEffect(() => {
        if(redirect){
            navigate("/")
        }
    })
    return (
        <div className={"flex flex-col min-h-screen"}>
            <Header/>

                <main className={"flex-grow flex items-center justify-center align-middle shadow-lg rounded-xl p-6 w-full max-w-md mx-auto mt-4 mb-4 transition duration-300 ease-in-out hover:shadow:2xl"}>

                    <form onSubmit={handleSubmit}>
                        <div className={"text-3xl font-bold mb-6"}>
                            <h1>Sign Up</h1>
                        </div>
                        <div className={styles.formRow}>

                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                   placeholder={"Name"}/>
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


                        <FormButton text={"Sign Up"} type={"submit"}/>
                        <hr className={"text-black/30 mb-4"}/>
                        <FormButton text={"Already have an account?"} clickFunction={() => navigate("/login")}/>

                    </form>

                </main>
            <Footer/>


        </div>
    )
}
export default Signup;