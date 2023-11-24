import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../utils/functions";
import { CiSearch } from "react-icons/ci";
import ProductCard from "./Components/ProductCard/ProductCard";
import Offers from "./Components/Offers/Offers";
import Categories from "./Components/Categories/Categories";
import Search from "./Components/Search/Search";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


function Home() {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearchIconClick = () => {
    setIsSearching(!isSearching);
  };

  const menuQuery = useQuery({
    queryKey: ["menu"],
    queryFn: getProducts,
  });

  const menuItems = menuQuery?.data?.menu || [];

  if (menuQuery.isLoading) return <h1 style={{ minHeight: "100vh" }}>Food is coming...</h1>;
  if (menuQuery.isError) {
    return <pre>{JSON.stringify(menuQuery.error)}</pre>;
  }

  const filteredItems = selectedCategory
  ? menuItems.filter((product) => product.categories.includes(selectedCategory)) : menuItems

  return (
    <>
      {isSearching ?  null : (
        <>
          <Offers />
          <Categories setSelectedCategory={setSelectedCategory} />
        </>
      )}

      <div className="search__icon" onClick={handleSearchIconClick}>
        <CiSearch />
      </div>

      {isSearching ? (
        <Search menuItems={menuItems} isSearching={isSearching} />
      ) : (
        <section className="menu">
          <h3 className="menu__title">Products</h3>
          <ul className="menu__list">
            {filteredItems.map((product) => (
              <ProductCard key={product.id} props={product} />
            ))}
          </ul>
        </section>
      )}
      
      <ReactQueryDevtools />
      
    </>
  );
}

export default Home;
