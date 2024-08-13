import React from 'react';

const CurrencyFormatter = ({ amount }) => {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);

  return <span>{formattedAmount}</span>;
};

export default CurrencyFormatter;