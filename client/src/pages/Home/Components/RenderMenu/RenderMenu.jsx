import ProductCard from "../ProductCard/ProductCard";


export default function RenderMenu({ filteredItems, editIngredients,toggleEditIngredients }) {
  const handleProductClick = (product) => {
    editIngredients(product);
  };

  return (
    <section className="menu">
      <h3 className="menu__title">Products</h3>
      <ul className="menu__list">
        {filteredItems.map((product) => (
         <ProductCard
         key={product.id}
         props={product}
         onClick={() => handleProductClick(product)}
         toggleEditIngredients={toggleEditIngredients}
       />
        ))}
      </ul>
    </section>
  );
}
