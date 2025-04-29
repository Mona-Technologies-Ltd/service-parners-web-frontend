export const formatCurrency = (value) => {
  if (!value) return "0.00";

  // Remove any non-numeric characters except decimal point
  const numericValue = value.toString().replace(/[^0-9.]/g, "");

  // Format the number with commas and 2 decimal places
  return new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(numericValue));
};
