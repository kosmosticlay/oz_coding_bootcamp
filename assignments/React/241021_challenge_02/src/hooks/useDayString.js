import { useState, useEffect } from "react";

export function useDayString() {
  const [dayString, setDayString] = useState("");

  useEffect(() => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.toString().slice(4, 7);
    const date = currentDate.getDate();
    const day = currentDate.toString().slice(0, 3);

    setDayString(`${day} ${date} ${month} ${year}`);
  }, []);

  return dayString;
}
