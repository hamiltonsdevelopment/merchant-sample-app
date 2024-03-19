import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RedirectFormData, RedirectResponseData } from "../types";
import { REDIRECT_FROM_ADVERTISER_ENDPOINT } from "../endpoints";
import { STOREFRONT_RETURN_ENDPOINT } from "../endpoints";
import { TRANSACTION_CONFIRMATION_ENDPOINT } from "../endpoints";
import { IMerchant } from "../app";
import TransactionDetails from "./TransactionDetails";
import SelectPayment from "./SelectPayment";

let defaultCoinAccountId = "ad71c7cf-e9ec-4e75-b5f7-0a9e6d7812d1";
let redirFormData = {
  charge: {
    chargeDescription: "PHP 1 Month",
    amount: "14.99",
    currency: "USD",
  },
  // These values are set for a local demo where FE runs on localhost:5173 and BE runs on localhost:8000
  // returnUrl: 'https://trafficjunky.com/checkout-complete',
  returnUrl: STOREFRONT_RETURN_ENDPOINT,
  // postbackUrl: 'https://trafficjunky.com/transaction-confirmation',
  postbackUrl: TRANSACTION_CONFIRMATION_ENDPOINT,
  passthrough: {
    chargeId: "charge_from_merchant",
    },
  customerInformation: {
    accountId: defaultCoinAccountId,
  },
};;
export const setProductChoice = (choice: any) => {
  if (choice==1) {
    redirFormData.charge.amount = "14.99";
    redirFormData.charge.chargeDescription = "PHP - 1 Month";
  } else if (choice==2) {
    redirFormData.charge.amount = "11.99";
    redirFormData.charge.chargeDescription = "PHP - Month 1 of 12";
  }
};

interface RedirectProps {
  merchantJwt: string | undefined;
  merchant: IMerchant;
  selectedPayment: boolean;
  setSelectedPayment: (selectedPayment: boolean) => void;
}
export const Redirect: FC<RedirectProps> = ({
  merchantJwt,
  merchant,
  selectedPayment,
  setSelectedPayment,
}) => {
  const chargeUuid = uuidv4();
  const defaultCoinAccountId = "ad71c7cf-e9ec-4e75-b5f7-0a9e6d7812d1";

  const initialRedirectFormState = {
    charge: {
      chargeDescription: "Premium 1 Month",
      amount: "14.99",
      currency: "USD",
    },
    // These values are set for a local demo where FE runs on localhost:5173 and BE runs on localhost:8000
    // returnUrl: 'https://trafficjunky.com/checkout-complete',
    returnUrl: STOREFRONT_RETURN_ENDPOINT,
    // postbackUrl: 'https://trafficjunky.com/transaction-confirmation',
    postbackUrl: TRANSACTION_CONFIRMATION_ENDPOINT,
    passthrough: {
      // chargeId: chargeUuid,
      chargeId: merchant.id,
    },
    customerInformation: {
      nbblAccountId: defaultCoinAccountId,
      customerId: "",
      email: "",
      firstName: "",
      lastName: "",
      billingAddress: {
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
    },
  };
  const [redirectResponseData, setRedirectResponseData] =
    useState<null | RedirectResponseData>(null);
  const [redirectFormData, setRedirectFormData] = useState<RedirectFormData>(
    initialRedirectFormState
  );
  const [isRedirectLoading, setIsRedirectLoading] = useState(false);

  const handleChargeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRedirectFormData({
      ...redirectFormData,
      charge: {
        ...redirectFormData.charge,
        [name]: value,
      },
    });
  };

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { customerInformation, ...rest } = redirectFormData;
    setRedirectFormData({
      ...rest,
      customerInformation: {
        ...customerInformation,
        [name]: value,
      },
    });
  };

  const handleBillingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    // make a copy of current formData without the accountId key inside customerInformation
    const { customerInformation, ...rest } = redirectFormData;
    const { accountId, ...restOfCustomerInfo } = customerInformation;

    setRedirectFormData({
      ...rest,
      customerInformation: {
        ...restOfCustomerInfo,
        billingAddress: {
          ...redirectFormData.customerInformation.billingAddress,
          [name]: value,
        },
      },
    });
  };

  let submissionData = null;
  const handleRedirectSubmit = async (
    // e: React.MouseEvent<HTMLElement>,
    isFromNewUser: boolean
  ) => {
    // e.preventDefault();
    setIsRedirectLoading(true);
    // only send the accountId if it is an existing user
    const { customerInformation, ...rest } = redirectFormData;
    const { accountId, ...restCustomerInformation } = customerInformation;

    if (!isFromNewUser) {
      submissionData = {
        ...rest,
        customerInformation: {
          accountId,
        },
      };
    } else {
      submissionData = {
        ...rest,
        customerInformation: {
          ...restCustomerInformation,
        },
      };
    }
    submissionData = redirFormData;

    const data = await fetch(REDIRECT_FROM_ADVERTISER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${merchantJwt}`,
      },
      body: JSON.stringify(submissionData),
    });
    const json = await data.json();
    console.log("JSON response: ", json);
    setRedirectResponseData(json);
    setIsRedirectLoading(false);
    return json;
  };

  const handleRedirect = (
    // e: React.MouseEvent<HTMLElement>,
    url: string | undefined
  ) => {
    const redirectURL = url;
    if (typeof redirectURL === "string") {
      // e.preventDefault();
      window.location.href = redirectURL;
    }
    return;
  };

  const parsedRedirectFormData = JSON.stringify(redirectFormData, null, "\t");
  const parsedRedirectJSONReponse = redirectResponseData
    ? JSON.stringify(redirectResponseData, null, "\t")
    : null;

  useEffect(() => {
    if (selectedPayment) handleRedirectSubmit(false);
  }, [selectedPayment]);

  useEffect(() => {
    if (
      !isRedirectLoading &&
      redirectResponseData &&
      redirectResponseData?.redirectUrl
    ) {
      handleRedirect(redirectResponseData?.redirectUrl);
    }
  }, [redirectResponseData, handleRedirect, isRedirectLoading]);
  return("");
  return (
    <div className="flex flex-col w-full pt-12">
      <h1 className="text-4xl text-primary">Purchase</h1>
      <div className="grid grid-cols-1 gap-6 w-full max-w-5xl">
        <form className="mt-8 w-full">
          <div className="grid grid-cols-2 gap-6">
            {/* <label className="block">
              <span className="text-gray-700 font-semibold">
                NBBL account Id
              </span>
              <input
                type="text"
                name="nbblAccountId"
                value={redirectFormData?.customerInformation.nbblAccountId}
                onChange={handleCustomerInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Please enter a nbbl account id..."
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">Customer Id</span>
              <input
                type="text"
                name="customerId"
                value={redirectFormData?.customerInformation.customerId}
                onChange={handleCustomerInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter a customer Id..."
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">Email</span>
              <input
                type="email"
                name="email"
                value={redirectFormData?.customerInformation?.email}
                onChange={handleCustomerInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Anneteblack@gmail.com"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">First Name</span>
              <input
                type="text"
                name="firstName"
                value={redirectFormData?.customerInformation?.firstName}
                onChange={handleCustomerInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Annete"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">Last Name</span>
              <input
                type="text"
                name="lastName"
                value={redirectFormData?.customerInformation?.lastName}
                onChange={handleCustomerInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Black"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">Address</span>
              <input
                type="text"
                name="address"
                value={
                  redirectFormData?.customerInformation?.billingAddress?.address
                }
                onChange={handleBillingAddressChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="2715 Ash Dr. San Jose, South Dakota 83475"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">Country</span>
              <input
                type="text"
                name="country"
                value={
                  redirectFormData?.customerInformation?.billingAddress?.country
                }
                onChange={handleBillingAddressChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="US"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">
                State/Province
              </span>
              <input
                type="text"
                name="state"
                value={
                  redirectFormData?.customerInformation?.billingAddress?.state
                }
                onChange={handleBillingAddressChange}
                className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="New Jersey"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">City</span>
              <input
                type="text"
                name="city"
                value={
                  redirectFormData?.customerInformation?.billingAddress?.city
                }
                onChange={handleBillingAddressChange}
                className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Orange"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">
                Zip/Postal Code
              </span>
              <input
                type="number"
                name="postalCode"
                value={
                  redirectFormData?.customerInformation?.billingAddress
                    ?.postalCode
                }
                onChange={handleBillingAddressChange}
                className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="123456789"
              />
            </label> */}
            <label className="block">
              <span className="text-gray-700 font-semibold">
                Charge Description
              </span>
              <textarea
                name="chargeDescription"
                value={redirectFormData?.charge?.chargeDescription}
                onChange={handleChargeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="A charge description..."
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">Amount (USD)</span>
              <input
                type="number"
                name="amount"
                value={redirectFormData?.charge?.amount}
                min={1}
                onChange={handleChargeChange}
                className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="USD 300"
              />
            </label>
            {/* <button
              type="submit"
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                handleRedirectSubmit(e, true)
              }
              className="bg-secondary text-white font-semibold py-2 px-2 max-w-[400px] hover:bg-[#1380FF]"
            >
              Purchase package (validate info)
            </button>
            <div></div> */}
            {/* <button
              type="submit"
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                handleRedirectSubmit(e, false)
              }
              disabled={
                isRedirectLoading || !!redirectResponseData || !selectedPayment
              }
              className="bg-secondary disabled:opacity-75 text-white font-semibold py-2 px-2 max-w-[400px] enabled:hover:bg-[#1380FF]"
            >
              Pay Using NBBL
            </button>
            <div></div> */}
            {/* {!isRedirectLoading &&
            redirectResponseData &&
            redirectResponseData?.redirectUrl ? (
              <button
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                  handleRedirect(e, redirectResponseData?.redirectUrl)
                }
                className="bg-secondary text-white font-semibold py-2 px-2 max-w-[400px] hover:bg-[#1380FF]"
              >
                Click me to follow the redirect URL
              </button>
            ) : null}
            {!isRedirectLoading && redirectResponseData ? (
              <button
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  setRedirectFormData({ ...initialRedirectFormState });
                  setRedirectResponseData(null);
                }}
                className="bg-primary text-white font-semibold py-2 px-2 max-w-[400px] hover:bg-[#ae0000]"
              >
                Reset Form & Response Data
              </button>
            ) : null} */}
          </div>
          {/* <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="bg-tertiary min-w-fit min-h-96 max-h-fit">
              <div className="flex flex-col p-6">
                <p>Request:</p>
                <div className="pt-4  whitespace-pre-wrap">
                  {parsedRedirectFormData}
                </div>
              </div>
            </div>
            <div className="bg-tertiary  min-w-fit min-h-96 max-h-fit">
              <div className="flex flex-col p-6">
                <p>Response:</p>
                {!isRedirectLoading && redirectResponseData ? (
                  <div className="pt-4 whitespace-pre-wrap">
                    {parsedRedirectJSONReponse}
                  </div>
                ) : (
                  <div className="pt-4">
                    Please fill the form with the data you want to test the
                    /redirect-from-merchant endpoint with
                  </div>
                )}
              </div>
            </div>
          </div> */}
        </form>
      </div>
      <SelectPayment
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
      />
    </div>
  );
};
