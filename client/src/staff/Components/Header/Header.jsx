import { useNavigate } from "react-router-dom"
import "./header.scss"

export default function Header() {
  const navigate = useNavigate()
  
  return (
    
    <header className="topbar topbar__staff">
      <img className="topbar__staff__menu" src="../logos/menu.png" onClick={() => {navigate("/")}} />
      <img className="topbar__staff__img" src="../logos/claddagh.png" alt="claddagh"></img>
    </header>
  )
}
