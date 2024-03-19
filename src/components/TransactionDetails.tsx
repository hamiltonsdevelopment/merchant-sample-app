import React from "react";

interface ITransactionDetails {
  amount: number;
  processingFee: number;
}
const TransactionDetails = ({ amount, processingFee }: ITransactionDetails) => {
  return (
    <div>
      <div className="my-5">
        <b>TRANSACTION DETAILS</b>
      </div>
      <div className="flex justify-between">
        <span>Amount Selected</span>
        <span>${amount}</span>
      </div>
      <div className="flex justify-between">
        <span>Coin Processing Fee ({processingFee * 100}%)</span>
        <span>${amount * processingFee}</span>
      </div>
      <div className="flex justify-between">
        <span>Total Amount Charged</span>
        <span>${Math.round(amount * (1 + processingFee) * 100) / 100}</span>
      </div>
    </div>
  );
};

export default TransactionDetails;
