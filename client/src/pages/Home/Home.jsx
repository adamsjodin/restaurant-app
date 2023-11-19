import { useQuery } from "@tanstack/react-query";
import menu from "../../testdata/menu.json";
import ProductCard from "./Components/ProductCard/ProductCard";
import Offers from "./Components/Offers/Offers";

function Home() {
  const menuQuery = useQuery({
    queryKey: ["menu"],
    queryFn: () => wait(500).then(() => [...menu]),
  });

  if (menuQuery.isLoading) return <h1>Loading...</h1>;
  if (menuQuery.isError) {
    return <pre>{JSON.stringify(menuQuery.error)}</pre>;
  }

  return (
    <>
      <Offers />
      <ul className="menu">
        {menuQuery.data.map((product) => (
          <ProductCard key={product.id} props={product} />
        ))}
      </ul>
    </>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default Home;
