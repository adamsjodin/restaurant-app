import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import AnimatedRoutes from "./components/Animations/AnimatedRoutes";
import Hours from "./components/Hours/Hours";
import Footer from "./components/Footer/Footer";
import SplashPage from "./pages/Splash/Splash";
import { useEffect, useState } from "react";
import ProductCard from "./pages/Home/Components/ProductCard/ProductCard";
import Home from "./pages/Home/Home";
import FoodMenu from "./staff/pages/FoodMenu/FoodMenu";

function App() {
  const [showSplash, setShowSplash] = useState(
    localStorage.getItem("splashShown") !== "true"
  );

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("splashShown", "true");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return showSplash ? (
    <SplashPage />
  ) : (
    <>
      <header>
        <Topbar />
      </header>
      <main>
        {/* <FoodMenu /> */}
        <AnimatedRoutes />
      </main>
      {window.innerWidth < 600 ? <Hours /> : <Footer />}
    </>
  );
}

export default App;
