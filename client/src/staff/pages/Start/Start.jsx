import Button from '../../../components/Button/Button';
import './Start.scss'

function Start() {
  return (
    <section className='start'>
      <figure>
        <img src="/logos/claddagh.png" alt="Claddagh - Food & Bar" />
      </figure>
      <section>  
        <button className='start--btn'>Orders</button>
        <button className='start--btn'>Table reservations</button>
        <button className='start--btn'>Tables settings</button>
        <button className='start--btn'>Food menu</button>
        <button className='start--btn'>Members</button>
      </section>
    </section>
  );
}

export default Start;