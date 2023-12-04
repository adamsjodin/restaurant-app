import axios from 'axios'
import { useState } from 'react';
import './EditFood.scss'
import Input from '../../../components/Input/Input'
import { IoMdClose } from "react-icons/io";

function EditFood({ onClose }) {


    const [updateMenu, setUpdateMenu] = useState({
        id: '0ge163U7_O5n5bJp-p99S',
        newValue: '',
        price: '',
        outOfOrder: false
    });

    const [updateMenuMsg, setUpdateMenuMsg] = useState(false);

    const updateMsg = () => {
        setUpdateMenuMsg(true)
    };

    const handleMenuUpdate = (e) => {
        setUpdateMenu({ ...updateMenu, [e.target.name]: e.target.value })
    };

    const handleCloseBtn = () => {
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu', updateMenu)
            .then(res => {
                setUpdateMenu({
                    id: '0ge163U7_O5n5bJp-p99S',
                    newValue: '',
                    price: ''
                })
                updateMsg();
                return res;
            })
            .catch(err => console.error(err))
    };

    return (
        <>
            <section className='editFood'>
                <div className='editFood__form-close' onClick={handleCloseBtn}>
                    <IoMdClose />
                </div>
                <form className='editFood__form' onSubmit={handleSubmit}>
                    <input
                        className='editFood__form-input'
                        type="text"
                        placeholder='Title'
                        name='newValue'
                        value={updateMenu.newValue}
                        onChange={handleMenuUpdate}
                    />
                    <input
                        className='editFood__form-input'
                        type="text"
                        placeholder='Price'
                        name='price'
                        value={updateMenu.price}
                        onChange={handleMenuUpdate}
                    />
                    <section>
                        <input
                            className='editFood__form-input'
                            type="checkbox"
                            placeholder='Out of order'
                            name='outOfOrder'
                            value={updateMenu.outOfOrder}
                            onChange={handleMenuUpdate}
                            id='outOfOrder'
                        />
                        <label htmlFor="outOfOrder">Out of order</label>
                    </section>
                    <button className='editFood__form-btn'>submit</button>
                    {updateMenuMsg && <h4 className='editFood__form-msg'>Product has been updated</h4>}
                </form>
            </section>
        </>
    );
}

export default EditFood;