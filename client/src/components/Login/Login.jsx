import { useEffect, useState } from 'react';
import './Login.scss'

function Login() {

    return (
        <>
        <section className="login background-color__black">
            <h2 className='login--heading'>Log in</h2>
            <input type="text" className='login--input' placeholder="Email" />
            <input type="text" className='login--input' placeholder="Password" />
            <section className='login--btns'>
                <button className='login--btn'>Log in</button>
                <p className='login--paragraph'>Sign up</p>
            </section>
            <p>Continue as guest</p>
        </section>
        </>
    );
}

export default Login;