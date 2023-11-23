import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import AnimatedRoutes from "./components/Animations/AnimatedRoutes";

function App() {
  return (
    <>
      <header>
        <Topbar />
      </header>
      <main>
        <AnimatedRoutes />
      </main>
    </>
  );
}

export default App;
