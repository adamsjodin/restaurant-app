import { useEffect, useState } from "react";

export default function Countdown({ onTimeout, isCountdownActive }) {
    const [countdown, setCountdown] = useState(60);
  
    useEffect(() => {
      let interval;
  
      if (isCountdownActive) {
        interval = setInterval(() => {
          setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
        }, 1000);
      }
  
      if (countdown === 0) {
        clearInterval(interval);
        onTimeout();
      }
  
      return () => clearInterval(interval);
    }, [countdown, isCountdownActive, onTimeout]);
  
    useEffect(() => {
      if (isCountdownActive) {
        setCountdown(60);
      }
    }, [isCountdownActive]);
  
    return (
      <span>{`${Math.floor(countdown / 60)
        .toString()
        .padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`}</span>
    );
  }