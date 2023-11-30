import './Settings.scss'
import '../Signup/Signup.scss'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { MdClose } from "react-icons/md";


function Settings({action}) {


    return (
        <section className='settings overlay background-color__black'>
            <MdClose onClick={() => action(false)} />
            <section className='settings--info'>
            <h2 className='settings--heading'>Settings</h2>
                <Input className='settings--input-text' type="text" placeholder='First name' />
                <Input className='settings--input-text' type="text" placeholder='Last name' />
                <Input className='settings--input-text' type="text" placeholder='Email' />
                <Input className='settings--input-text' type="text" placeholder='Phone' />
                <Input className='settings--input-text' type="text" placeholder='Old password' />
                <Input className='settings--input-text' type="text" placeholder='New password' />
                <Input className='settings--input-text' type="text" placeholder='Verify new password' />
            </section >
            <section className='settings--cardInfo-text'>
            <Input className='settings--input-text' type="text" placeholder='Name on card' />
            <Input className='settings--input-text' type="text" placeholder='Card number' />
            </section>
            <section className='settings--cardInfo-number'>
                <input className='settings--cardInfo-box' type="text" placeholder='MM / YY' />
                <input className='settings--cardInfo-box' type="text" placeholder='CVV' />
            </section>
            <div className='settings--btn'>
                <Button>Confirm Change</Button>
            </div>
        </section>

    );
}

export default Settings;