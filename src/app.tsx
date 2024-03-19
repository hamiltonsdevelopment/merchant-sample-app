import NibbleLogo from "./assets/bitsee_logo.png";

import "./App.css";

import { Redirect, setProductChoice } from "./components/Redirect";
// import { TransactionConfirmation } from "./components/TransactionConfirmation";
// import { TransactionFeed } from "./components/TransactionFeed";
// import Refund from "./components/Refund";
import MerchantLogin from "./components/MerchantLogin";
import { FC, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SelectPayment from "./components/SelectPayment";
import { v4 as uuidv4 } from "uuid";

import {
  MERCHANT_LOGIN_ENDPOINT,
  REDIRECT_FROM_ADVERTISER_ENDPOINT,
  STOREFRONT_RETURN_ENDPOINT,
  TRANSACTION_CONFIRMATION_ENDPOINT,
} from "./endpoints";
export interface IMerchant {
  id: string;
  name: string;
}

export const merchants: IMerchant[] = [
  { id: "ba4f89df-3545-4b04-bc26-b74d536be793", name: "Traffic Junky" },
  {
    id: "ba4f89df-3545-4b04-bc26-b74d536be794",
    name: "Traffic Junky Generous",
  },
];

interface IMyProducts {
  setSelectedPayment: (selectedPayment: boolean) => void;
}

const MyProductInfo = {
  0: { price: 0.5, name: "Whalers Puck", image: "src/assets/whalers_puck.jpg" },
  7: {
    price: 0.35,
    name: "Rockies Puck",
    image: "src/assets/rockies_puck.jpg",
  },
  1: { price: 0.5, name: "Whalers Puck", image: "src/assets/whalers_puck.jpg" },
  2: {
    price: 0.75,
    name: "Black Hawks Puck",
    image: "src/assets/black_hawks_puck.jpg",
  },
  3: {
    price: 0.8,
    name: "Nordiques Puck",
    image: "src/assets/nordiques_puck.jpg",
  },
  4: {
    price: 0.9,
    name: "North Stars Puck",
    image: "src/assets/north_stars_puck.jpg",
  },
  5: {
    price: 19.93,
    name: "Montreal Classic",
    image: "src/assets/mtl-puck.jpg",
  },
  6: {
    price: 0.35,
    name: "Rockies Puck",
    image: "src/assets/rockies_puck.jpg",
  },
};

const set_Product_Choice = (choice: any) => {
  /*
  if (choice==1) {
    redirFormData.charge.amount = "14.99";
    redirFormData.charge.chargeDescription = "PHP - 1 Month";
  } else if (choice==2) {
    redirFormData.charge.amount = "11.99";
    redirFormData.charge.chargeDescription = "PHP - Month 1 of 12";
  } */
};

let selectedProduct = 1;
set_Product_Choice(selectedProduct);

const MyProductsSelector = () => {
  const [selected1, setSelected1] = useState(selectedProduct == 1);
  const [selected2, setSelected2] = useState(selectedProduct == 2);
  const [selected3, setSelected3] = useState(selectedProduct == 3);
  const [selected4, setSelected4] = useState(selectedProduct == 4);
  const [selected5, setSelected5] = useState(selectedProduct == 5);
  const [selected6, setSelected6] = useState(selectedProduct == 6);

  const handleButtonClick = (num: any) => {
    selectedProduct = num;
    setProductChoice(selectedProduct);
    setSelected1(num == 1);
    setSelected2(num == 2);
    setSelected3(num == 3);
    setSelected4(num == 4);
    setSelected5(num == 5);
    setSelected6(num == 6);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "-40px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "-40px",
          }}
        >
          <button
            className={`button ${selectedProduct === 1 ? "selected" : ""}`}
            onClick={() => {
              handleButtonClick(1);
            }}
            style={{
              borderRadius: "8px",
              border: `6px solid ${selectedProduct === 1 ? "orange" : "black"}`,
              transform: "scale(0.75)",
              backgroundColor: "white",
            }}
          >
            <img src={MyProductInfo[0].image} alt="Button Image" />
            {MyProductInfo[1].name + " $" + MyProductInfo[0].price.toFixed(2)}
          </button>

          <button
            className={`button ${selectedProduct === 2 ? "selected" : ""}`}
            onClick={() => {
              handleButtonClick(2);
            }}
            style={{
              borderRadius: "8px",
              border: `6px solid ${selectedProduct === 2 ? "orange" : "black"}`,
              transform: "scale(0.75)",
              backgroundColor: "white",
            }}
          >
            <img src={MyProductInfo[2].image} alt="Button Image" />
            {MyProductInfo[2].name + " $" + MyProductInfo[2].price.toFixed(2)}
          </button>

          <button
            className={`button ${selectedProduct === 3 ? "selected" : ""}`}
            onClick={() => {
              handleButtonClick(3);
            }}
            style={{
              borderRadius: "8px",
              border: `6px solid ${selectedProduct === 3 ? "orange" : "black"}`,
              transform: "scale(0.75)",
              backgroundColor: "white",
            }}
          >
            <img src={MyProductInfo[3].image} alt="Button Image" />
            {MyProductInfo[3].name + " $" + MyProductInfo[3].price.toFixed(2)}
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className={`button ${selectedProduct === 4 ? "selected" : ""}`}
            onClick={() => {
              handleButtonClick(4);
            }}
            style={{
              borderRadius: "8px",
              border: `6px solid ${selectedProduct === 4 ? "orange" : "black"}`,
              transform: "scale(0.75)",
              backgroundColor: "white",
            }}
          >
            <img src={MyProductInfo[4].image} alt="Button Image" />
            {MyProductInfo[4].name + " $" + MyProductInfo[4].price.toFixed(2)}
          </button>

          <button
            className={`button ${selectedProduct === 5 ? "selected" : ""}`}
            onClick={() => {
              handleButtonClick(5);
            }}
            style={{
              borderRadius: "8px",
              border: `6px solid ${selectedProduct === 5 ? "orange" : "black"}`,
              transform: "scale(0.75)",
              backgroundColor: "white",
            }}
          >
            <img src={MyProductInfo[5].image} alt="Button Image" />
            {MyProductInfo[5].name + " $" + MyProductInfo[5].price.toFixed(2)}
          </button>

          <button
            className={`button ${selectedProduct === 6 ? "selected" : ""}`}
            onClick={() => {
              handleButtonClick(6);
            }}
            style={{
              borderRadius: "8px",
              border: `6px solid ${selectedProduct === 6 ? "orange" : "black"}`,
              transform: "scale(0.75)",
              backgroundColor: "white",
            }}
          >
            <img src={MyProductInfo[6].image} alt="Button Image" />
            {MyProductInfo[6].name + " $" + MyProductInfo[6].price.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

const MyProducts: FC<IMyProducts> = ({ setSelectedPayment }) => {
  const queryMerchantId = new URLSearchParams(window.location.search).get(
    "merchantId",
  );
  const handleButtonClick = () => {
    // const productInfo = MyProductInfo[productId as keyof typeof MyProductInfo];
    const productInfo =
      MyProductInfo[selectedProduct as keyof typeof MyProductInfo];

    /*
Standalone version of doing the 3 following actions:
1. Merchant Login - get JWT token
2. Redirect from Merchant - get redirect URL
3. Redirect to Payment Gateway - redirect to payment gateway

Notes:
- selected package is hardcoded to PHP - 1 Month ($14.99)
- merchantId is hardcoded to ba4f89df-3545-4b04-bc26-b74d536be793
- accountId is hardcoded to ad71c7cf-e9ec-4e75-b5f7-0a9e6d7812d1
*/

    fetch(MERCHANT_LOGIN_ENDPOINT, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
      referrer: STOREFRONT_RETURN_ENDPOINT,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `{"merchantId":"${
        queryMerchantId ?? "ba4f89df-3545-4b04-bc26-b74d536be600"
      }","secretKey":"privateKey12345"}`,
      method: "POST",
      mode: "cors",
      credentials: "omit",
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        return fetch(REDIRECT_FROM_ADVERTISER_ENDPOINT, {
          method: "POST",
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            charge: {
              chargeDescription: productInfo.name,
              amount: productInfo.price,
              currency: "USD",
            },
            returnUrl: STOREFRONT_RETURN_ENDPOINT,
            postbackUrl: TRANSACTION_CONFIRMATION_ENDPOINT,
            passthrough: {
              chargeId: "charge-" + uuidv4().substring(0, 8),
            },
            customerInformation: {
              accountId: "ad71c7cf-e9ec-4e75-b5f7-0a9e6d7812d1",
            },
          }),
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          console.log("Re1directing to BitSee...");
          window.location.href = data.redirectUrl;
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "-20px",
          }}
        >
          <img
            src="https://nbbl-user-avatars.s3.us-east-1.amazonaws.com/public/images/puckstore.png"
            alt="Puck Store Logo"
            style={{ width: "50%", height: "50%" }}
          />
        </div>
        <MyProductsSelector />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <button
            className={"button text-black"}
            onClick={() => {
              handleButtonClick();
            }}
            style={{
              borderRadius: "8px",
              border: "3px solid black",
              transform: "scale(0.75)",
              backgroundColor: "white",
              fontSize: "200%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseOver={(e) => {
              e.target.style.border = "6px solid #1380ff";
            }}
            onMouseOut={(e) => {
              e.target.style.border = "6px solid white";
            }}
          >
            <span
              style={{
                marginTop: "0px",
                fontWeight: "bold",
                pointerEvents: "none",
                fontStyle: "italic",
              }}
            >
              Pay Now!
            </span>{" "}
            <span
              style={{
                marginTop: "0px",
                fontWeight: "bold",
                pointerEvents: "none",
                fontSize: "50%",
              }}
            >
              Powered By
            </span>
            <img
              src="src/assets/Bitsee-Wordmark-Black.svg"
              alt="Button Image"
              style={{ width: "100%", height: "100%", pointerEvents: "none" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export const App = () => {
  const [merchantJwt, setMerchantJwt] = useState<string | undefined>();
  const [primaryMerchant, setMerchant] = useState<IMerchant>(merchants[0]);
  const [selectedPayment, setSelectedPayment] = useState<boolean>(false);
  const toastRef = useRef<boolean>(false);

  useEffect(() => {
    if (toastRef.current) return;
    const queryParams = new URLSearchParams(window.location.search);
    const stringResult = queryParams.get("result");

    try {
      const result = JSON.parse(stringResult || "{}");
      const data = JSON.parse(result.data || "{}");

      const merchantUsed = merchants.find(
        (merchant) => merchant.id === data.passthrough?.chargeId,
      );

      if (merchantUsed) {
        toast.success(
          `Thank you for your purchase using $${data.orderTotal} from ${merchantUsed?.name}. Your transaction ID was ${data.transactionId}`,
        );
      }
    } catch (e) {
      console.error(e);
    }
    toastRef.current = true;
  }, []);

  // const buttonClassname = '';
  // "border-2 border-gray p-3 disabled:opacity-40 rounded-lg h-20 w-32 flex items-center justify-center enabled:hover:bg-gray-100 enabled:hover:border-blue-300";
  // md:bg-[length:1023px_629.43px]
  // lg:bg-[length:1279px_786.94px]

  return (
    <div>
      <Toaster />
      <div
        className="flex flex-col relative  bg-center bg-repeat bg-auto 
      bg-final-puckstore-demo min-h-screen h-screen max-h-screen items-center justify-center"
      >
        <MyProducts setSelectedPayment={setSelectedPayment} />
      </div>
      {/* <TransactionConfirmation />
        <TransactionFeed merchantJwt={merchantJwt} />
        <Refund merchantJwt={merchantJwt} /> */}
    </div>
  );
};

export default App;
