import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { wait } from "../../utils/functions";
import menu from "../../testdata/menu.json";
import ProductCard from "./Components/ProductCard/ProductCard";
import Offers from "./Components/Offers/Offers";
import Categories from "./Components/Categories/Categories";
import Search from "./Components/Search/Search";
import { CiSearch } from "react-icons/ci";

function Home() {
  const [isSearching, setIsSearching] = useState(false);
  const handleSearchIconClick = () => {
    console.log(isSearching);
    setIsSearching(!isSearching);
  };

  const menuQuery = useQuery({
    queryKey: ["menu"],
    queryFn: () => wait(500).then(() => [...menu]),
  });

  const menuItems = menuQuery.data || [];

  if (menuQuery.isLoading) return <h1>Loading...</h1>;
  if (menuQuery.isError) {
    return <pre>{JSON.stringify(menuQuery.error)}</pre>;
  }

  return (
    <>
      {isSearching ? null : (
        <>
          <Offers />
          <Categories />
        </>
      )}

      <div className="search__icon" onClick={handleSearchIconClick}>
        <CiSearch />
      </div>
      
      {isSearching ? (
        <Search menuItems={menuItems} isSearching={isSearching} />
      ) : (
        <ul className="menu">
          {menuItems.map((product) => (
            <ProductCard key={product.id} props={product} />
          ))}
        </ul>
      )}
    </>
  );
}

export default Home;
