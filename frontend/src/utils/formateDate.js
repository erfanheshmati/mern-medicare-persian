export const formateDate = (date, config) => {
  const defaultOptions = { day: "numeric", month: "short", year: "numeric" };
  const options = config ? config : defaultOptions;
  const persianOptions = { ...options, calendar: "persian" };
  return new Date(date).toLocaleDateString("fa-IR", persianOptions);
};
