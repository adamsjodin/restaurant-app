import { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Signup.scss';
import { validateForm } from "../../utils/validation";
import axios from 'axios';
import { MdClose } from 'react-icons/md';

function Signup(handleChange) {

    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);

    const handleTermsChange = () => {
        setTermsChecked(!termsChecked);
    };

    const [signup, setSignup] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'member',
    });
    
    function handleChange(e) {
        const { name, value } = e.target;
        setSignup((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    const handleSubmit = (e) => {
        
        e.preventDefault();
        const errors = validateForm(signup);
        
        if (Object.keys(errors).length === 0 && termsChecked ) {

            axios.post('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/user', signup)
                .then(res => {
                    setSignup({
                        name: '',
                        email: '',
                        phone: '',
                        password: '',
                    });
                    setFormErrors({});
                    setFormSubmitted(true);
                    
                    return res;
                })
                .catch(err => console.log(err));
        } else {
            setFormSubmitted(false);
            setFormErrors(errors);
        }
    };

    return (
        <>
            <section className='signup background-color__black'>
            <MdClose onClick={() => action(false)} />
                <h2 className='signup--heading'>Sign up</h2>

                <form className='signup--form' onSubmit={handleSubmit}>

                    <Input 
                        className='signup--input-text'
                        type="text" 
                        placeholder='Name' 
                        name='name' 
                        value={signup.name} 
                        onChange={handleChange}
                        errorMessage={formErrors.name}
                        />
                        {formErrors.name && <h4 className='signup--errors'>{formErrors.name}</h4>}
                    <Input 
                        className='signup--input-text'
                        type="text" 
                        placeholder='Email' 
                        name='email' 
                        value={signup.email} 
                        onChange={handleChange}
                        errorMessage={formErrors.email}
                        />
                        {formErrors.email && <h4 className='signup--errors'>{formErrors.email}</h4>}

                    <Input 
                        className='signup--input-text'
                        type="text" 
                        placeholder='Phone' 
                        name='phone' 
                        value={signup.phone} 
                        onChange={handleChange}
                        />
                        {formErrors.phone && <h4 className='signup--errors'>{formErrors.phone}</h4>}

                    <Input 
                        className='signup--input-text'
                        type="password" 
                        placeholder='Password' 
                        name='password' 
                        value={signup.password} 
                        onChange={handleChange}
                        errorMessage={formErrors.password}
                        />
                        {formErrors.password && <h4 className='signup--errors'>{formErrors.password}</h4>}

                    <section className='signup--input-container'>
                        <div className='signup--input-checkbox-container'>
                            <Input
                                className='signup--input-checkbox'
                                id="terms"
                                type="checkbox"
                                checked={termsChecked}
                                onChange={handleTermsChange}
                            />
                            <label htmlFor="terms">I agree the terms and conditions</label>
                            {!termsChecked && <h4 className='signup--errors'>Please agree to the terms and conditions</h4>}

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
                        {
                            formSubmitted && 
                            <h2 className='signup--submitted'>Thank you for signing up!</h2>
                        }
                    </section>
                </form>
            </section>

        </>
    );
}

export default Signup;