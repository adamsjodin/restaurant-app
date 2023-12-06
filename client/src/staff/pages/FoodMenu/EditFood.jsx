import axios from 'axios'
import { useState, useEffect } from 'react';
import './EditFood.scss'
import { IoMdClose } from "react-icons/io";

function EditFood({ onClose }) {
    const [getOutOfOrder, setGetOutOfOrder] = useState(false)
    const [updateMenuMsg, setUpdateMenuMsg] = useState(false);

    useEffect(() => {
        fetchData();
      }, [updateMenuMsg]);
      

      const fetchData = async () => {
        try {
          const response = await axios.get('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu');
          const data = response.data.menu[0].outOfOrder;
          setGetOutOfOrder(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    //  {
    //     getMenu && getMenu.map((data) => (
    //         setGetOutOfOrder(data.getOutOfOrder)
    //     ))
    // } 
   

    //price and title gets removed if not entered

    const [updateMenu, setUpdateMenu] = useState({
        id: '5oo9fRt0t644ZbX7djtGZ',
        title: 'Quattro Formaggi',
        price: '120',
        outOfOrder: getOutOfOrder
    });


    const updateMsg = () => {
        setUpdateMenuMsg(true)
    };

    const handleMenuUpdate = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedValue = type === 'checkbox' ? checked : value;

        setUpdateMenu({ ...updateMenu, [name]: updatedValue })
        setGetOutOfOrder(updatedValue)
    };

    const handleCloseBtn = () => {
        onClose();
    };

    const handleSubmit = (e) => {
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
                    <input
                        className='editFood__form-input'
                        type="text"
                        placeholder='ID'
                        name='id'
                        value='id'
                        onChange={handleMenuUpdate}
                    />
                    <input
                        className='editFood__form-input'
                        type="text"
                        placeholder='Title'
                        name='title'
                        value={updateMenu.title}
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
                            checked={getOutOfOrder}
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