import { Link } from 'react-router-dom';
import './Start.scss'


function Start() {
  return (
    <section className='start'>
      <section>  
        <Link to="/staff/orders"><button className='start--btn'>Orders</button></Link>
        <Link to="/staff/reservations"><button className='start--btn'>Table reservations</button></Link>
        <Link to="/staff/menu"><button className='start--btn'>Food menu</button></Link>
        <Link to="/staff/hours"><button className='start--btn'>Opening hours</button></Link>
        <Link to="/staff/members"><button className='start--btn'>Members</button></Link>
      </section>
    </section>
  );
}

export default Start;