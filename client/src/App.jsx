import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import AnimatedRoutes from "./components/Animations/AnimatedRoutes";
import Hours from "./components/Hours/Hours";
import Footer from "./components/Footer/Footer";
import SplashPage from "./pages/Splash/Splash";
import { useEffect, useState } from "react";
import AnimatedRoutesStaff from "./staff/Components/Animations/AnimatedRoutesStaff"


function App() {
  const [showSplash, setShowSplash] = useState(
    localStorage.getItem("splashShown") !== "true"
  );
  const staff = localStorage.getItem("role") === "staff";

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
    {staff ? <AnimatedRoutesStaff /> : 
    <>
      <header>
        <Topbar /> 
      </header>
      <main>
        <AnimatedRoutes />
      </main>
      {window.innerWidth < 600 ? <Hours /> : <Footer />} 
      </>
      }
    </>
  );
}

export default App;
