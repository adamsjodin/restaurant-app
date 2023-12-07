import ProductCard from '../../../pages/Home/Components/ProductCard/ProductCard';
import axios from 'axios'
import { useState, useEffect } from 'react';
import EditFood from './EditFood';
import AddToMenu from './AddToMenu';

function FoodMenu() {

    const [getMenu, setGetMenu] = useState([]);

    useEffect(() => {
        axios.get('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu')
        .then(res => setGetMenu(res.data.menu))
    }, [])

    return ( 
        <section className='foodMenu'>
                  <ul className="foodMenu__products">
            {
                getMenu.map((data, i) => (
                    <ProductCard key={i} props={data} className='staff' editFood={<EditFood />}/>
                    ))
                }
            </ul>
                <AddToMenu /> 
        </section>
     );
}

export default FoodMenu;