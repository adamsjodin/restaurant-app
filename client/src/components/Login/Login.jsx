import { useEffect, useState } from 'react';
import './Login.scss'
import Signup from "../Signup/Signup"
import { handleLogin } from '../../utils/functions';

function Login({state}) {
    const [loginObj, setLoginObj] = useState({
        email: "",
        password: ""
    })
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showSignup, setShowSignup] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoginObj({
            email: email,
            password: password
        })
    }, [email, password])
    

    return (
        <>
        <section className="login background-color__black">
            <h2 className='login--heading'>Log in</h2>
            <input type="text" className='login--input' placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" className='login--input' placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            {error && <p>Something went wrong, try again!</p>}
            <section className='login--btns'>
                <button className='login--btn' onClick={() => handleLogin({setError, loginObj, state}) }>Log in</button>
                <p className='login--paragraph' onClick={() => setShowSignup(true)}>Sign up</p>
            </section>
            {showSignup && <Signup />}
            <p>Continue as guest</p>
        </section>
        </>
    );
}

export default Login;