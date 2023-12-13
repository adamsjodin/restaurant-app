
import './Contact.scss'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

import { Map, APIProvider, AdvancedMarker } from '@vis.gl/react-google-maps';

const apiKeyGoogle = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
const apiIdGoogle = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_MAPS_ID;

function Contact() {

  const position = {
    lat: 37.912543268438945,
    lng: -0.7405194988617286
  }
  return (
    <section className='contact'>
      <section className='contact--location'>
        <h2 className='contact--heading'>34 Calle Isla Tabarca, Urb La Regia, Cabo Roig, 03189 Orihuela Costa, Spain</h2>
        <APIProvider apiKey={apiKeyGoogle}>
          <div className='contact--location-google'>
            <Map zoom={15} center={position} mapId={apiIdGoogle}>
              <AdvancedMarker position={position}>
              </AdvancedMarker>
            </Map>
          </div>
        </APIProvider>
        {/* <img src="/images/maps.png" alt="google maps" /> */}

      </section>
      <section className='contact--info'>
        <h3>+34 711 01 01 73</h3>
        <h3>claddagh@gmail.com</h3>
      </section>
      <section className="contact--social">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
                </section>
    </section>
  )
}
export default Contact
