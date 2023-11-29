import { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Signup.scss';
import axios from 'axios';

function Signup(state) {

    const [signup, setSignup] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'member',
        password: '',
        verifyPassword: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setSignup((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/user', signup)
            .then(res => {

                setSignup({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    password: '',
                    verifyPassword: '',
                })
                state(false)
                return res;
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <section className='signup'>
                <h2 className='signup--heading'>Sign up</h2>

                <form onSubmit={handleSubmit}>

                    <Input className='signup--input-text' type="text" placeholder='First name' name='firstName' value={signup.firstName} onChange={handleChange} />
                    <Input className='signup--input-text' type="text" placeholder='Last name' name='lastName' value={signup.lastName} onChange={handleChange} />
                    <Input className='signup--input-text' type="text" placeholder='Email' name='email' value={signup.email} onChange={handleChange} />
                    <Input className='signup--input-text' type="text" placeholder='Phone' name='phone' value={signup.phone} onChange={handleChange} />
                    <Input className='signup--input-text' type="password" placeholder='Password' name='password' value={signup.password} onChange={handleChange} />
                    <Input className='signup--input-text' type="password" placeholder='Verify password' name='verifyPassword' value={signup.verifyPassword} onChange={handleChange} />

                    <section className='signup--input-container'>
                        <div className='signup--input-checkbox-container'>
                            <input className='signup--input-checkbox' id="terms" type="checkbox" />
                            <label htmlFor="terms">I agree the terms and conditions</label>
                        </div>

                        <div className='signup--input-checkbox-container'>
                            <input className='signup--input-checkbox' id="newsletter" type="checkbox" />
                            <label htmlFor="newsletter">I want to sign up for the newsletter</label>
                        </div>

                        <div className='signup--input-checkbox-container'>
                            <input className='signup--input-checkbox' id="info" type="checkbox" />
                            <label htmlFor="info">I agree that Claddagh saving my personal information</label>
                        </div>
                        <div className='signup--btn'>
                            <Button type='submit'>Confirm sign up</Button>
                        </div>
                    </section>
                </form>
            </section>

        </>
    );
}

export default Signup;