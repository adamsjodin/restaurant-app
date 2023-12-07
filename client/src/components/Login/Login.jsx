import { useState } from 'react';
import './Login.scss'
import Signup from "../Signup/Signup"
import { handleLogin, booleanStates, oneState } from '../../utils/functions';

function Login({loginState}) {
    const [loginObj, setLoginObj] = useState({
        email: "",
        password: ""
    })
    const [showSignup, setShowSignup] = useState(false)
    const [error, setError] = useState(false)
    const [state, setState] = useState(booleanStates())

    
    function loginFunction() {
        handleLogin({setError, loginObj, setState})
        loginState(false)
    }

    return (
        <>
        <section className="login background-color__black">
            <h2 className='login--heading'>Log in</h2>
            <input type="text" className='login--input' placeholder="Email" onChange={(e) => setLoginObj({...loginObj, email: e.target.value})}/>
            <input type="password" className='login--input' placeholder="Password" onChange={(e) => setLoginObj({...loginObj, password: e.target.value})}/>
            {error && <p>Something went wrong, try again!</p>}
            <section className='login--btns'>
                <button className='login--btn' onClick={() => loginFunction() }>Log in</button>
                <p className='login--paragraph' onClick={() => setShowSignup(true)}>Sign up</p>
            </section>
            {showSignup && <Signup action={() => {setShowSignup()}} />}
            <p onClick={() => {loginState(false)}}>Continue as guest</p>
        </section>
        </>
    );
}

export default Login;