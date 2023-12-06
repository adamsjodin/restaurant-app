import { useEffect, useState } from "react";
import "./App.css";
import SplashPage from "./pages/Splash/Splash";

import {
  AnimatedRoutes,
  AnimatedRoutesStaff,
  TopBar,
  Hours,
  Footer,
} from "./components/exports";

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
      {staff ? (
        <AnimatedRoutesStaff />
      ) : (
        <>
          <header>
            <TopBar />
          </header>
          <main>
            <AnimatedRoutes />
          </main>
          {window.innerWidth < 600 ? <Hours /> : <Footer />}
        </>
      )}
    </>
  );
}

export default App;
