
import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import AnimatedRoutes from "./components/Animations/AnimatedRoutes";
import './App.css'
import Hours from './components/Hours/Hours';
import Footer from './components/Footer/Footer';
import Settings from "./components/Settings/Settings";
import Categories from "./pages/Home/Components/Categories/Categories";
import ProductCard from "./pages/Home/Components/ProductCard/ProductCard";


function App() {
  return (
    <>
      <header>
        <Topbar />
      </header>
      <main>
        <AnimatedRoutes />
      </main>
      { window.innerWidth < 600 ? <Hours /> : <Footer />}
    </>
  );
}

export default App;
