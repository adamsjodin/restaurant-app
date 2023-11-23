
import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import AnimatedRoutes from "./components/Animations/AnimatedRoutes";
import './App.css'
import Hours from './components/Hours/Hours';
import Footer from './components/Footer/Footer';


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
