import axios from 'axios'
import { useState, useEffect } from 'react';
import './EditFood.scss'
import { IoMdClose } from "react-icons/io";

function EditFood({ onClose, title, id }) {

    const [getOutOfOrder, setGetOutOfOrder] = useState('')
    const [updateMenuMsg, setUpdateMenuMsg] = useState(false);

    useEffect(() => {
        axios.get('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu')
            .then(res => {
                setGetOutOfOrder(res.data.menu.outOfOrder);
            })
            .catch(err => console.error(err))
    }, [updateMenuMsg])

    console.log(getOutOfOrder);

    //price and title gets removed if not entered

    const [updateMenu, setUpdateMenu] = useState({
        id: id,
        title: '',
        price: '',
        outOfOrder: getOutOfOrder
    });

    const updateMsg = () => {
        setUpdateMenuMsg(true)
    };

    const handleMenuUpdate = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedValue = type === 'checkbox' ? checked : e.target.value;

        console.log('Updated Value:', updatedValue);
        setGetOutOfOrder(updatedValue)
        setUpdateMenu({ ...updateMenu, [name]: updatedValue })
    };

    const handleCloseBtn = () => {
        onClose();
    };

    const handleSubmit = () => {
        axios.put('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu', updateMenu)
            .then(res => {
                console.log('updated db', updateMenu);
                updateMsg();
                return res;
            })
            .catch(err => console.error(err))
        // .finally(() => {
        //     setUpdateMenu({
        //         id: '',
        //         title: '',
        //         price: ''
        //     });
        // });
    }

    return (
        <>
            <section className='editFood'>
                <div className='editFood__form-close' onClick={handleCloseBtn}>
                    <IoMdClose />
                </div>
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
                            checked={updateMenu.outOfOrder}
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