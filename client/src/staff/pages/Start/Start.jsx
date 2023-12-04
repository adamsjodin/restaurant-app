import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import './Start.scss'

function Start() {
  return (
    <section className='start'>
      <figure>
        <img src="/logos/claddagh.png" alt="Claddagh - Food & Bar" />
      </figure>
      <section>  
        <Link to="/staff/orders"><button className='start--btn'>Orders</button></Link>
        <button className='start--btn'>Table reservations</button>
        <button className='start--btn'>Tables settings</button>
        <Link to="/staff/menu"><button className='start--btn'>Food menu</button></Link>
        <button className='start--btn'>Members</button>
      </section>
    </section>
  );
}

export default Start;