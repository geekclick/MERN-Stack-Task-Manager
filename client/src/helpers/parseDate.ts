export const parseDate = (inputDate: string) => {
  const date = new Date(inputDate);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};
