import './Hours.scss'
import { useState } from 'react';

import HoursIcon from './HoursIcon';

function Hours() {

    const [openHours, setOpenHours] = useState(false)

    return (
        <>
        {
            openHours && 
            <section className="hours">
                <section className='hours--lists'>
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
        }
        <div onClick={() => setOpenHours(!openHours)}>
            <HoursIcon openHours={openHours} />
        </div>
        </>
    );
}

export default Hours;