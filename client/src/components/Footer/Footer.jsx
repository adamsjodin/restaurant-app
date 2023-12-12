import Hours from "../Hours/Hours";
import "./Footer.scss";
import { FaRegCopyright } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import HoursList from "../Hours/HoursList";

const screenWidth = window.innerWidth;

function Footer() {
  return (
    <>
    { screenWidth < 800 ?
      <Hours />
      : 
      <section className="footer--desktop">
        <div className="footer--desktop--top">
          <section className="footer--desktop--top--hours">
            <h2 className="footer--desktop--top--heading">Open Hours:</h2>
            <section className="footer--desktop--top--lists">
             <HoursList/>
            </section>
          </section>
          <section className="footer--desktop--top--interest">
            <ul>
              <li>FAQ</li>
              <li>Security</li>
              <li>Private Policy</li>
            </ul>
          </section>
          <section className="footer--desktop--top--social">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </section>
        </div>
        <div className="footer--desktop--copyright">
          <FaRegCopyright />
          <p> Furious Sheriffs 2023</p>
        </div>
      </section>
    }
    </>
  );
}

export default Footer;
