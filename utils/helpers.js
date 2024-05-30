module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // Format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
};
