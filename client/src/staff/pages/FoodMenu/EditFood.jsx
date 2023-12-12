import axios from 'axios'
import { useState, useEffect } from 'react';
import './EditFood.scss'
import { IoMdClose } from "react-icons/io";
import { deleteProduct } from '../../../utils/functions';

function EditFood({ props, onClose, state }) {
    const [getOutOfOrder, setGetOutOfOrder] = useState(props.outOfOrder)
    const [updateMenuMsg, setUpdateMenuMsg] = useState(false);
    const [showPopup, setShowPopup] = useState(false)

    const [updateMenu, setUpdateMenu] = useState({
        id: props.id,
        title: props.title,
        price: props.price,
        outOfOrder: getOutOfOrder
    });

    const updateMsg = () => {
        setUpdateMenuMsg(true)
        state(getOutOfOrder)
    };

    const handleMenuUpdate = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedValue = type === 'checkbox' ? checked : e.target.value;
        setGetOutOfOrder(updatedValue)
        setUpdateMenu({ ...updateMenu, [name]: updatedValue })
        setGetOutOfOrder(updatedValue)
    };

    function handleRemove() {
        deleteProduct(props.id)
        setShowPopup(prev => !prev) //VARFÖR FUNKAR DET INTE??
        console.log(showPopup)
        onClose()

    }


    const handleCloseBtn = () => {
        onClose();
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu', updateMenu)
            .then(res => {
                updateMsg();
                return res;
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <section className='editFood'>
                <div className='editFood__form-close' onClick={handleCloseBtn}>
                    <IoMdClose />
                </div>
                {showPopup ?    
                    <section className='popup'>
                        <h3>Item removed from menu</h3>
                    <button onClick={() => setShowPopup(!showPopup)}>Got it! </button>
                </section> : ""}
                {updateMenuMsg ? 
                <div>
                    <h4 className='editFood__form-msg'>Product has been updated</h4>
                    <button className='editFood__form-btn' onClick={() => handleCloseBtn()}>Close</button>
                </div> :
                <>
                <form className='editFood__form' onSubmit={handleSubmit}>
                    <h2 className='editFood__form-title'>{props.title}</h2>
                    <input
                        className='editFood__form-input'
                        type="text"
                        placeholder='Change title'
                        name='title'
                        value={updateMenu.title}
                        onChange={handleMenuUpdate}
                    />
                    <input
                        className='editFood__form-input'
                        type="text"
                        placeholder='Change price'
                        name='price'
                        value={updateMenu.price}
                        onChange={handleMenuUpdate}
                    />
                    <section>
                        <input
                            className='editFood__form-input'
                            type="checkbox"
                            placeholder='Out of Stock'
                            name='outOfOrder'
                            checked={getOutOfOrder}
                            onChange={handleMenuUpdate}
                            id='outOfOrder'
                        />
                        <label htmlFor="outOfOrder">Out of Stock</label>
                    </section>
                    <button className='editFood__form-btn'>submit</button>
                    
                </form>
                <button onClick={() => handleRemove()} className='editFood__form-btn red'>Remove</button>
                </>
            }
            </section>

        </>
    );
}

export default EditFood;