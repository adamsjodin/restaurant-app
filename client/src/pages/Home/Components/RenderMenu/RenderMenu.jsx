import ProductCard from "../ProductCard/ProductCard";


export default function RenderMenu({ filteredItems, addToCart }) {
  return (
    <section className="menu">
      <h3 className="menu__title">Products</h3>
      <ul className="menu__list">
        {filteredItems.map((product) => (
          <ProductCard key={product.id} props={product} onClick={addToCart} />
        ))}
      </ul>
    </section>
  );
}
