 export const getFiscalYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  const nextYear = (year + 1).toString().slice(-2);
  return `${year.toString().slice(-2)}-${nextYear}`;
};