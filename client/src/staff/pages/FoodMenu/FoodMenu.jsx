import ProductCard from '../../../pages/Home/Components/ProductCard/ProductCard';
import './FoodMenu.scss'
import axios from 'axios'
import { useState, useEffect } from 'react';

function FoodMenu() {

    const [getMenu, setGetMenu] = useState([]);

    const [updateMenu, setUpdateMenu] = useState({
        id: '0ge163U7_O5n5bJp-p99S', 
        title: '',
        price: ''
    });

    const handleMenuUpdate = (e) => {
        setUpdateMenu({...updateMenu, [e.target.name]: e.target.value})
    }
        //     axios.put('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu', updateMenu);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('updated', updateMenu);
        axios.put('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu', updateMenu)
        .then(res => console.log(res.data))
        .catch(err => console.error(err))
    };


    // useEffect(() => {
    //     axios.get('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu')
    //     .then(res => setGetMenu(res.data.menu))
    // }, [])


    return ( 
        <section className='foodMenu'>
                <form className='foodMenu__form' onSubmit={handleSubmit}>
                    <input 
                        className='foodMenu__form-input'
                        type="text" 
                        placeholder='Title' 
                        name='title'
                        onChange={handleMenuUpdate}
                        
                        />
                    <input 
                        className='foodMenu__form-input'
                        type="text" 
                        placeholder='Price' 
                        name='price'
                        onChange={handleMenuUpdate}
                        />
                        <button className='foodMenu__form-btn'>submit</button>
                </form>
            {
                // getMenu.map((data) => (
                //     <ProductCard props={data}/>
                // ))
            }
        </section>
     );
}

export default FoodMenu;