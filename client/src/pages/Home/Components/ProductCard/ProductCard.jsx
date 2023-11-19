import { Truncate } from '@primer/react';
import Button from '../../../../components/Button/Button';
import './ProductCard.scss';
import { FaInfo } from 'react-icons/fa';

function ProductCard({ props }) {
  const { title, description, price, imgUrl } = props;

  return (
    <article className="product">
        <figure className="product__image" style={{ backgroundImage: `url(${imgUrl})` }}></figure>
        <section className="product__info">
            <h3>{title}</h3>
            <Truncate inline title={description}>{description}</Truncate>
            <section className='product__info--bottom'>
                <h3>{price} kr</h3>
                <Button className="add">Add +</Button>
            </section>
        </section>
        <FaInfo />
    </article>
  )
}

export default ProductCard