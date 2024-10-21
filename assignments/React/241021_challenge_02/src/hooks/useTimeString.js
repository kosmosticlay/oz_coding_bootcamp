import { useState, useEffect } from "react";

export function useTimeString() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    function updateTime() {
      const currentDate = new Date();

      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");

      setTimeString(`${hours}:${minutes}:${seconds}`);
    }

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return timeString;
}
