export default function getDateClient(date) {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month =
    dateObj.getMonth() + 1 < 10
      ? "0" + (dateObj.getMonth() + 1)
      : dateObj.getMonth() + 1;
  const day =
    dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate();
  const hour =
    dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours();
  const minute =
    dateObj.getMinutes() < 10
      ? "0" + dateObj.getMinutes()
      : dateObj.getMinutes();

  return {
    year,
    month,
    day,
    hour,
    minute,
  };
}
