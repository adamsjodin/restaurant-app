import { useState } from 'react';
import axios from 'axios';
import './Login.scss'
import Signup from "../Signup/Signup"

function Login() {
    const [loginObj, setLoginObj] = useState({
        email: "",
        password: ""
    })
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showSignup, setShowSignup] = useState(false)


    function handleSubmit() {
        setLoginObj({
            email: email,
            password: password
        })
        axios.post("https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/login", loginObj)
        .then((res) => {
            console.log(res.data)
          checkRole(res.data)
        })
        .catch((error) => {
          console.error("Error login in user: ", error);
        })
    }

    function checkRole(data) {
        if (data.success) {
            console.log("success")
            let userInfo = JSON.parse(data.body)
            if (userInfo.role === "member") {
                console.log("member")
                localStorage.setItem("userId", JSON.stringify(userInfo.id))
                localStorage.setItem("userName", JSON.stringify(userInfo.name))

            }

        }
    }

    return (
        <>
        <section className="login background-color__black">
            <h2 className='login--heading'>Log in</h2>
            <input type="text" className='login--input' placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" className='login--input' placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
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