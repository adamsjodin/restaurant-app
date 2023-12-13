import React, { useEffect, useState } from "react";
import "./OpeningHoursStyles.scss";
import { Button, Input } from "../../../components/exports";
import axios from "axios";

function OpeningHours() {
  const [hours, setHours] = useState([]);
  const [note, setNote] = useState("");
  const [editMode, setEditMode] = useState(false);
  const daysOrder = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const sortedHours = hours
    .slice()
    .sort((a, b) => daysOrder.indexOf(a.days) - daysOrder.indexOf(b.days));

  useEffect(() => {
    axios
      .get(
        "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/hours"
      )
      .then((res) => {
        setHours(res.data.hours);
        if (res.data.hours.some((item) => item.notes)) {
          setNote(res.data.hours.find((item) => item.notes).notes);
        }
      })
      .catch((err) => console.error(err));
  }, []);
const handleSubmit = () => {
  const updatePromises = [];
  hours.forEach((hour) => {
    console.log(hour);
    const updatePromise = axios.put(
      "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/hours",
      hour 
    );
    updatePromises.push(updatePromise);
  });
  Promise.all(updatePromises)
    .then((responses) => {
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
};

  const handleEditClick = () => {
    if (editMode) {
       handleSubmit()
      setEditMode(!editMode);
    } else {
      setEditMode(!editMode);
    }
  };

  const handleInputChange = (id, event, type) => {
    console.log("Input Change:", id, event.target.value);
    if (type === "hours") {
      setHours((prevHours) => {
        const updatedHours = prevHours.map((hour) =>
          hour.id === id ? { ...hour, hours: event.target.value } : hour
        );
        return updatedHours;
      });
    } else if (type === "note") {
      setNote(event.target.value);
      setHours((prevHours) => {
        const updatedHours = prevHours.map((hour) =>
          hour.notes !== undefined ? { ...hour, notes: event.target.value } : hour
        );
        return updatedHours;
      });
    }
  };

  return (
    <section className="hours-wrapper__staff">
      <section className="hours--lists">
        <ul className="hours--ul">
          {sortedHours.map((hour, index) => (
           <li key={hour.id}>
           {editMode && hour.hours !== undefined ? (
             <div className="hours-div" key={`edit-${hour.id}`}>
               <label htmlFor={`hoursInput-${hour.id}`} key={`label-${hour.id}`}>
                 {hour.days}:
               </label>
               <Input
                 id={`hoursInput-${hour.id}`}
                 type="text"
                 placeholder={hour.hours}
                 onChange={(event) => handleInputChange(hour.id, event, "hours")}
                 key={`input-${hour.id}`}
               />
             </div>
           ) : (
             hour.hours && `${hour.days}: ${hour.hours}`
           )}
         </li>
          ))}
        </ul>
      </section>
      <p>
        {editMode ? (
          <textarea
            placeholder={note}
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
