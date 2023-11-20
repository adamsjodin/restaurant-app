
import "./Categories.scss";

export default function Categories() {
  const categories = [
    {dish: "Pizza", img: "category_pizza.jpg"},
    {dish: "Burger", img: "category_burger.jpg"},
    {dish: "Pasta", img: "category_pasta.jpg"},
    {dish: "Chicken", img: "category_chicken.jpg"},
    {dish: "Vego", img: "category_veg.jpg"},
    {dish: "Salads", img: "chicken_caesar.jpg"}
  ]

  function sortCategories(category) {
    //filter from menu - need to pass to productlist. Sent state as prop? 
    console.log(category.dish)
  }
  const categoryEl = categories.map((category, i) => {
    return (
    <section onClick={() => sortCategories(category)} key={i} className="card--category">
      <div><img src={"images/"+category.img}></img></div>
      <p>{category.dish}</p>
    </section>
    )
  })
  return (
    <article className="categories">
      <h3>Categoires</h3>
      <section className="categories-container">  
        {categoryEl && categoryEl}
      </section>
    </article>
  )
}
