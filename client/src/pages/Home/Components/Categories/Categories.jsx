
import "./Categories.scss";

export default function Categories() {
  const categories = [
    {dish: "Pizza", imgUrl: "/images/category_pizza.jpg"},
    {dish: "Burger", imgUrl: "/images/category_burger.jpg"},
    {dish: "Pasta", imgUrl: "/images/category_pasta.jpg"},
    {dish: "Chicken", imgUrl: "/images/category_chicken.jpg"},
    {dish: "Vego", imgUrl: "/images/category_veg.jpg"},
    {dish: "Salads", imgUrl: "/images/chicken_caesar.jpg"}
  ]

  function sortCategories(category) {
    //filter from menu - need to pass to productlist. Sent state as prop? 
    console.log(category.dish)
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
    <article className="categories">
      <h3>Categories</h3>
      <section className="category-list">  
        {categoryEl && categoryEl}
      </section>
    </article>
  )
}
