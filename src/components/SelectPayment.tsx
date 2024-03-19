import React from "react";

interface ISelectPayement {
  setSelectedPayment: (selectedPayment: boolean) => void;
  selectedPayment: boolean;
}
const SelectPayment = ({
  setSelectedPayment,
  selectedPayment,
}: ISelectPayement) => {
  const buttonClassname =
    "border-2 border-gray p-3 disabled:opacity-40 rounded-lg h-20 w-32 flex items-center justify-center enabled:hover:bg-gray-100 enabled:hover:border-blue-300";
  return (
    <div className="flex flex-col w-full py-12">
      <h1 className="text-4xl text-primary">Select Payment</h1>
      <div className="flex mt-4 gap-5">
        <button
          className={`${buttonClassname} ${
            selectedPayment && "border-blue-300 bg-gray-100"
          }`}
          onClick={() => setSelectedPayment(true)}
        >
          <img src="src/assets/nibble-logo.png" className="h-full" />
        </button>
        <button className={buttonClassname} disabled>
          <img src="src/assets/paxum-logo-color.png" className="h-full" />
        </button>
        <button className={buttonClassname} disabled>
          <img src="src/assets/crypto_biller.png" style={{ height: 30 }} />
        </button>
        <button className={buttonClassname} disabled>
          <img src="src/assets/wire_transfer.png" className="h-full" />
        </button>
        <button className={buttonClassname} disabled>
          <img src="src/assets/alipay.png" style={{ height: 30 }} />
        </button>
        <button className={buttonClassname} disabled>
          <img src="src/assets/WeChat_Pay.png" style={{ height: 30 }} />
        </button>
        <button className={buttonClassname} disabled>
          <img src="src/assets/promo_code.png" style={{ height: 30 }} />
        </button>
      </div>
    </div>
  );
};

export default SelectPayment;
