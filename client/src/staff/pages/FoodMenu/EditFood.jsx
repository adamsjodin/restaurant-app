import axios from 'axios'
import { useState } from 'react';
import './EditFood.scss'
import { IoMdClose } from "react-icons/io";
import { deleteProduct, booleanStates } from '../../../utils/functions';

function EditFood({ props, onClose, action }) {
    const [getOutOfOrder, setGetOutOfOrder] = useState(props.outOfOrder)
    const [updateMenuMsg, setUpdateMenuMsg] = useState(false);
    const [state, setState] = useState(booleanStates())

    const [updateMenu, setUpdateMenu] = useState({
        id: props.id,
        title: props.title,
        price: props.price,
        outOfOrder: getOutOfOrder
    });

    const updateMsg = () => {
        setUpdateMenuMsg(true)
        action(getOutOfOrder)
    };

    const handleMenuUpdate = (e) => {
        const { name, type, checked } = e.target;
        const updatedValue = type === 'checkbox' ? checked : e.target.value
        if (type === 'checkbox') {setGetOutOfOrder(updatedValue)}
        setUpdateMenu({ ...updateMenu, [name]: updatedValue })
        console.log(name, type, checked, e.target.value, updatedValue);
    };

    function handleRemove() {
        deleteProduct(props.id)
        setState({showRemoveConf: true});
    }

    function handleCloseConf() {
        setState({showRemoveConf: false})
        window.location.reload()
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
                {state.showRemoveConf ?    
                    <section className='popup'>
                        <h3>Item removed from menu</h3>
                    <button onClick={() => handleCloseConf()}>Got it! </button>
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
                <button onClick={() => handleRemove()} className='editFood__form-btn editFood__form-btn--remove'>Remove</button>
                </>
            }
            </section>

        </>
    );
}

export default EditFood;