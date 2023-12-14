import axios from "axios";
import { useEffect, useState } from "react";
function HoursList() {
  const [hours, setHours] = useState([]);
  const [note, setNote] = useState("");
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
  return (
    <section className="hours--wrapper">
      <ul className="hours--ul">
        {sortedHours.map((hour) =>
          hour.hours !== undefined ? (
            <li key={hour.id}>{hour.days + ": " + hour.hours}</li>
          ) : null
        )}
      </ul>
      <p>{note} </p>
    </section>
  );
}

export default HoursList;
