
import "./Categories.scss";

export default function Categories({ setSelectedCategory }) {
  const categories = [
    {dish: "Pizza", imgUrl: "/images/category_pizza.jpg"},
    {dish: "Burgers", imgUrl: "/images/category_burger.jpg"},
    {dish: "Pasta", imgUrl: "/images/category_pasta.jpg"},
    {dish: "Chicken", imgUrl: "/images/category_chicken.jpg"},
    {dish: "Vego", imgUrl: "/images/category_veg.jpg"},
    {dish: "Salads", imgUrl: "/images/chicken_caesar.jpg"}
  ]

  function sortCategories(category) {
    setSelectedCategory(category.dish.toLowerCase());
  }
  const categoryEl = categories.map((category, i) => {
    return (
    <section onClick={() => sortCategories(category)} key={i} className="category">
      <figure className="category__image" style={{ backgroundImage: `url(${category.imgUrl})` }}></figure>
      <p>{category.dish}</p>
    </section>
    )
  })
  return (
    <section className="categories">
      <h3>Categories</h3>
      <ul className="category-list">  
        {categoryEl && categoryEl}
      </ul>
    </section>
  )
}
