import { useNavigate } from "react-router-dom";
import "./header.scss";
import { IoLogOutOutline } from '../../../utils/iconExports';

export default function Header() {
  const navigate = useNavigate()

  function logOut() {
    localStorage.setItem("role", "")
    navigate("/")
    window.location.reload()
  }
  
  return (
    
    <header className="topbar topbar__staff">
      <img className="topbar__staff__menu" src={`${"https://main.d3fwnezvh2vvf4.amplifyapp.com/"}logos/menu.png`} onClick={() => {navigate("/")}} />
      <img className="topbar__staff__img" src={`${"https://main.d3fwnezvh2vvf4.amplifyapp.com/"}logos/claddagh.png`} alt="claddagh"></img>
      <IoLogOutOutline className="nav--icon" onClick={() => logOut()} />
    </header>
  )
}
