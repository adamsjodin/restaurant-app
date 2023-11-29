import { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.scss'
import Signup from "../Signup/Signup"

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
    async function handleSubmit() {
        await axios.post("https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/login", loginObj)
        .then((res) => {
          checkRole(res.data)
        })
        .catch((error) => {
            setError(true)
          console.error("Error login in user: ", error);
        })
    }
    

    function checkRole(data) {
        if (data.success) {
            setError(false)
            let userInfo = JSON.parse(data.body)
            if (userInfo.role === "member") {
                console.log(userInfo.role)
                localStorage.setItem("userId", JSON.stringify(userInfo.id))
                localStorage.setItem("userName", JSON.stringify(userInfo.name))
                state(false)
            } else if (userInfo.role === "staff") {
                console.log(userInfo.role)
                console.log("Navigate to staff page")
                state(false)
                //Insert navigate here. 
            }
        } else {
            setError(true)
        }
    }
    

    return (
        <>
        <section className="login background-color__black">
            <h2 className='login--heading'>Log in</h2>
            <input type="text" className='login--input' placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" className='login--input' placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            {error && <p>Something went wrong, try again!</p>}
            <section className='login--btns'>
                <button className='login--btn' onClick={() => handleSubmit() }>Log in</button>
                <p className='login--paragraph' onClick={() => setShowSignup(true)}>Sign up</p>
            </section>
            {showSignup && <Signup />}
            <p>Continue as guest</p>
        </section>
        </>
    );
}

export default Login;