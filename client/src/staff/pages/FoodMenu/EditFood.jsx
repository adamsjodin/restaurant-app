import axios from 'axios'
import { useState, useEffect } from 'react';
import './EditFood.scss'
import { IoMdClose } from "react-icons/io";

function EditFood({ props, onClose, state }) {
    const [getOutOfOrder, setGetOutOfOrder] = useState(props.outOfOrder)
    const [updateMenuMsg, setUpdateMenuMsg] = useState(false);

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

    const handleCloseBtn = () => {
        onClose();
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu', updateMenu)
            .then(res => {
                console.log('updated db', updateMenu);
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
                {updateMenuMsg ? 
                <div>
                    <h4 className='editFood__form-msg'>Product has been updated</h4>
                    <button className='editFood__form-btn' onClick={() => handleCloseBtn()}>Close</button>
                </div> :
                <form className='editFood__form' onSubmit={handleSubmit}>
                    <h2 className='editFood__form-title'>{title}</h2>
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
                            placeholder='Out of order'
                            name='outOfOrder'
                            checked={getOutOfOrder}
                            onChange={handleMenuUpdate}
                            id='outOfOrder'
                        />
                        <label htmlFor="outOfOrder">Out of order</label>
                    </section>
                    <button className='editFood__form-btn'>submit</button>
                </form>
            }
            </section>
        </>
    );
}

export default EditFood;