export const convertTime = (time) => {
  // timeParts will return an array
  const timeParts = time.split(":");
  let hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  let meridiem = "AM";
  if (hours >= 12) {
    meridiem = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }
  //   return (
  //     hours.toString().padStart(2) + minutes.toString().padStart(2, "0") + " " + meridiem
  //   );
  return `${hours}:${minutes.toString().padStart(2, "0")} ${meridiem}`;
};
