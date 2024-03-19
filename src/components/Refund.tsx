import React, { FC, useState } from "react";
import { RefundFormData, RefundResponseData } from "../types";
import { REFUND_ENDPOINT } from "../endpoints";

interface RefundProps {
  merchantJwt: string | undefined;
}
const Refund: FC<RefundProps> = ({ merchantJwt }) => {
  const initialRefundFormState: RefundFormData = {
    transactionId: "",
    currency: "USD",
    amount: 1,
    reason: "",
  };
  const [refundFormData, setRefundFormData] = useState<RefundFormData>(
    initialRefundFormState
  );
  const [refundResponseData, setRefundResponseData] =
    useState<RefundResponseData | null>();
  const [isLoadingRefund, setIsLoadingRefund] = useState<boolean>();

  const parsedRefundFormData = JSON.stringify(refundFormData, null, "\t");
  const parsedRefundJSONReponse = JSON.stringify(
    refundResponseData ?? null,
    null,
    "\t"
  );

  const handleRefundInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setRefundFormData({
      ...refundFormData,
      [name]: !isNaN(+value) ? +value : value,
    });
  };

  const handleRefundSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoadingRefund(true);
    const data = await fetch(REFUND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${merchantJwt}`,
      },
      body: JSON.stringify(refundFormData),
    });
    const json = await data.json();
    setIsLoadingRefund(false);
    setRefundResponseData(json);
    return json;
  };

  return (
    <div className="flex flex-col w-full py-12">
      <h1 className="text-4xl text-primary">Refund /refund-from-merchant</h1>
      <div className="grid grid-cols-1 gap-6 w-full max-w-5xl">
        <form className="mt-8 w-full">
          <div className="grid grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-700 font-semibold">Customer Id</span>
              <input
                type="email"
                name="customerId"
                value={refundFormData.customerId}
                onChange={handleRefundInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="<uuid>"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">
                Coin Account Id
              </span>
              <input
                type="text"
                name="accountId"
                value={refundFormData.accountId}
                onChange={handleRefundInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="<uuid>"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">
                Transaction Id
              </span>
              <input
                type="text"
                name="transactionId"
                value={refundFormData.transactionId}
                onChange={handleRefundInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="<uuid>"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">Amount</span>
              <input
                type="number"
                name="amount"
                value={refundFormData.amount}
                onChange={handleRefundInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter an amount..."
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">Currency</span>
              <input
                type="text"
                name="currency"
                value={refundFormData.currency}
                onChange={handleRefundInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="USD"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">Reason</span>
              <textarea
                name="reason"
                value={refundFormData.reason}
                onChange={handleRefundInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Reason to ask for a refund..."
              />
            </label>

            <button
              type="submit"
              onClick={handleRefundSubmit}
              className="bg-secondary text-white font-semibold py-2 px-2 max-w-[400px] hover:bg-[#1380FF]"
            >
              Execute Refund
            </button>
            {!isLoadingRefund && refundResponseData ? (
              <button
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  setRefundFormData({ ...initialRefundFormState });
                  setRefundResponseData(null);
                }}
                className="bg-primary text-white font-semibold py-2 px-2 max-w-[400px] hover:bg-[#ae0000]"
              >
                Reset Form & Response Data
              </button>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="bg-tertiary min-w-fit min-h-96 max-h-fit">
              <div className="flex flex-col p-6">
                <p>Request:</p>
                <div className="pt-4  whitespace-pre-wrap">
                  {parsedRefundFormData}
                </div>
              </div>
            </div>
            <div className="bg-tertiary  min-w-fit min-h-96 max-h-fit">
              <div className="flex flex-col p-6">
                <p>Response:</p>
                {!isLoadingRefund && refundResponseData ? (
                  <div className="pt-4 whitespace-pre-wrap">
                    {parsedRefundJSONReponse}
                  </div>
                ) : (
                  <div className="pt-4">
                    Please fill the form with the data you want to test the
                    /redirect-from-merchant endpoint with
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Refund;
