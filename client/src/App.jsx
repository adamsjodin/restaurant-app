import './App.css'
import Hours from './components/Hours/Hours'
import Nav from './components/Menu/Nav'
import Form from './components/Form/Form'
import Home from './pages/Home/Home'
import { useState } from 'react'

function App() {
  const [form, setForm] = useState(false);
  const [home, setHome] = useState(false);
  const [hours, setHours] = useState(false);
  return (
    <section style={{ display: "grid", gap: "2em"}}>
      <Nav />
      <button onClick={() => setHours(!hours)}>{hours ? "Hide" : "Show"} Hours</button>
      {hours ? <Hours /> : "" }

      <button onClick={() => setForm(!form)}>{form ? "Hide" : "Show"} Form</button>
      {form ? <Form /> : "" }

      <button onClick={() => setHome(!home)}>{home ? "Hide" : "Show"} Home</button>
      {home ? <Home /> : "" }

    </section>
  )
}

export default App
