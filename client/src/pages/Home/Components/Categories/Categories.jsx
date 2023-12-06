import categories from '../../../../testdata/categories.json';
import "./Categories.scss";

export default function Categories({ setSelectedCategory }) {
  const categoryEl = categories.map((category, i) => {
    return (
    <section onClick={() => setSelectedCategory(category.dish.toLowerCase())} key={i} className="category">
      <figure className="category__image" style={{ backgroundImage: `url(${category.imgUrl})` }}></figure>
      <p>{category.dish}</p>
    </section>
    )
  })
  return (
    <section className="categories">
      <h3>Categories</h3>
      <ul className="categories__list">  
        {categoryEl}
      </ul>
    </section>
  )
}
