import { useEffect, useState, useRef } from "react";

export default function Countdown({ onTimeout, isCountdownActive, duration }) {
  const [countdown, setCountdown] = useState(duration * 60);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (isCountdownActive) {
      // Start or resume the countdown
      intervalRef.current = setInterval(() => {
        setCountdown((prevCountdown) =>
          prevCountdown > 0 ? prevCountdown - 1 : 0
        );
      }, 1000);
    } else {
      // Clear the interval when the countdown is not active
      clearInterval(intervalRef.current);
    }
  }, [isCountdownActive]);

  useEffect(() => {
    if (countdown === 0) {
      onTimeout();
    }
  }, [countdown, onTimeout]);

  return (
    <span>{`${Math.floor(countdown / 60)
      .toString()
      .padStart(2, "0")}:${(countdown % 60)
      .toString()
      .padStart(2, "0")}`}</span>
  );
}
