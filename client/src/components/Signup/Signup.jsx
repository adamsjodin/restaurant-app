import Button from '../Button/Button';
import Input from '../Input/Input';
import './Signup.scss';
function Signup() {
    return (
        <>
            <section className='signup'>
                <h2 className='signup--heading'>Sign up</h2>

                    <Input className='signup--input-text' type="text" placeholder='First name'/>
                    <Input className='signup--input-text' type="text" placeholder='Last name'/>
                    <Input className='signup--input-text' type="text" placeholder='Email'/>
                    <Input className='signup--input-text' type="text" placeholder='Phone'/>
                    <Input className='signup--input-text' type="text" placeholder='Password'/>
                    <Input className='signup--input-text' type="text" placeholder='Verify password'/>

                <section className='signup--input-container'>
                    <div className='signup--input-checkbox-container'>
                        <Input className='signup--input-checkbox' id="terms" type="checkbox" />
                        <label htmlFor="terms">I agree the terms and conditions</label>
                    </div>

                    <div className='signup--input-checkbox-container'>
                        <Input className='signup--input-checkbox' id="newsletter" type="checkbox" />
                        <label htmlFor="newsletter">I want to sign up for the newsletter</label>
                    </div>

                    <div className='signup--input-checkbox-container'>
                        <Input className='signup--input-checkbox' id="info" type="checkbox" />
                        <label htmlFor="info">I agree that Claddagh saving my personal information</label>
                    </div>
                    <div className='signup--btn'>
                    <Button type='submit'>Confirm sign up</Button>
                    </div>
                </section>
            </section>
        </>
    );
}

export default Signup;