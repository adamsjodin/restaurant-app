
import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import AnimatedRoutes from "./components/Animations/AnimatedRoutes";
import './App.css'
import Hours from './components/Hours/Hours';
import Footer from './components/Footer/Footer';
import SplashPage from "./pages/Splash/Splash";
import { useEffect, useState } from "react";


function App() {
  const [showSplash, setShowSplash] = useState(localStorage.getItem('splashShown') !== 'true');
  
  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem('splashShown', 'true');
      }, 4000);
  
      return () => clearTimeout(timer);
    }
  }, [showSplash]);
  
  return showSplash ? (
    <SplashPage />
   ) : ( <>
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
