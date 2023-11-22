import Hours from "../Hours/Hours";
import './Footer.scss'
import { FaRegCopyright } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <>
            <section className="footer--mobile">
                <Hours />
            </section>
            <section className="footer--desktop">
                <section className="footer--desktop--hours">
                        <h2 className="footer--desktop--heading">Open Hours:</h2>
                    <section className='footer--desktop--lists'>
                        <ul className='hours--ul'>
                            <li>Monday:</li>
                            <li>Tuesday:</li>
                            <li>Wednesday:</li>
                            <li>Thursday:</li>
                            <li>Friday:</li>
                            <li>Saturday:</li>
                            <li>Sunday:</li>
                        </ul>

                        <ul className='hours--ul'>
                            <li>2pm - 10pm*</li>
                            <li>2pm - 10pm*</li>
                            <li>2pm - 10pm*</li>
                            <li>2pm - 10pm*</li>
                            <li>2pm - 10pm*</li>
                            <li>2pm - 10pm*</li>
                            <li>Closed </li>
                        </ul>
                    </section>
                    <p>*Please note that the kitchen closing 30 minutes earlier. </p>
                </section>
                <section className="footer--desktop--interest">
                    <ul>
                        <li>FAQ</li>
                        <li>Security</li>
                        <li>Private Policy</li>
                    </ul>
                </section>
                <section className="footer--desktop--social">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
                </section>
            </section>
            <div className="footer--desktop--copyright">
                <FaRegCopyright />
                <p> Furious Sheriffs 2023</p>
            </div>
        </>

    );
}

export default Footer;