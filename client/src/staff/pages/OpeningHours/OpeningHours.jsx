import React, { useEffect, useState } from "react";
import "./OpeningHoursStyles.scss";
import { Button, Input } from "../../../components/exports";
import axios from "axios";

function OpeningHours() {

  // const [Hours, setHours] = useState([]);

    useEffect(() => {
        axios.get('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/hours')
        .then(res => console.log(res.data.hours))
    }, [])

    const handleSubmit = (e) => {
      e.preventDefault()
      axios.put('https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/hours', Hours)
          .then(res => {
              console.log('updated db', updateMenu);
              updateMsg();
              return res;
          })
          .catch(err => console.error(err))
  }

  const initialHours = [
    "2pm - 10pm*",
    "2pm - 10pm*",
    "2pm - 10pm*",
    "2pm - 10pm*",
    "2pm - 10pm*",
    "2pm - 10pm*",
    "Closed",
  ];
  const [note, setNote] = useState(
    "*Please note that the kitchen closes 30 minutes earlier."
  );

  const [hours, setHours] = useState(initialHours);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (index, event, type) => {
    if (type === "hours") {
      const newHours = [...hours];
      newHours[index] = event.target.value;
      setHours(newHours);
    } else if (type === "note") {
      setNote(event.target.value);
    }
  };

  const renderHoursList = () => {
    return hours.map((hour, index) => (
      <li key={index}>
        {editMode ? (
          <Input
            type="text"
            value={hour}
            onChange={(event) => handleInputChange(index, event, "hours")}
          />
        ) : (
          hour
        )}
      </li>
    ));
  };

  return (
    <section className="hours-wrapper__staff">
      <section className="hours--lists">
        <ul className="hours--ul">
          <li>Monday:</li>
          <li>Tuesday:</li>
          <li>Wednesday:</li>
          <li>Thursday:</li>
          <li>Friday:</li>
          <li>Saturday:</li>
          <li>Sunday:</li>
        </ul>

        <ul className="hours--ul">{renderHoursList()}</ul>
      </section>
      <p>
        {editMode ? (
          <textarea
            value={note}
            onChange={(event) => handleInputChange(null, event, "note")}
          />
        ) : (
          note
        )}
      </p>
      <Button onClick={handleEditClick}>{editMode ? "Save" : "Edit"}</Button>
    </section>
  );
}

export default OpeningHours;
