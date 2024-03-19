import React, { FC, useEffect, useState } from "react";
import config from "../config";
import { MerchantFormData } from "../types";
import { MERCHANT_LOGIN_ENDPOINT, MERCHANT_LOGO_ENDPOINT } from "../endpoints";
import { IMerchant, merchants } from "../app";

interface MerchantLoginProps {
  setMerchantJwt: (merchantJwt: string) => void;
  merchant: IMerchant;
  setMerchant: (merchant: IMerchant) => void;
}
const MerchantLogin: FC<MerchantLoginProps> = ({
  setMerchantJwt,
  merchant,
}) => {
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState();

  const [merchantLogo, setMerchantLogo] = useState();

  const initialMerchantJwtFormState = {
    merchantId: config.merchantId,
    secretKey: config.privateKey,
  };

  const [merchantFormData, setMerchantFormData] = useState<MerchantFormData>(
    initialMerchantJwtFormState
  );

  const handleMerchantChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMerchantFormData({
      ...merchantFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchLoginData = async () => {
      setIsLoginLoading(true);
      const { merchantId, secretKey } = merchantFormData;

      const submissionData = {
        merchantId: merchantId,
        secretKey: secretKey,
      };
      const data = await fetch(MERCHANT_LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });
      const response = await data.json();
      setMerchantJwt(response.token);
      setIsLoginLoading(false);
      setResponseData(response);
    };

    fetchLoginData();
  }, [merchantFormData.merchantId]);

  useEffect(() => {
    const fetchMerchantLogo = async () => {
      const response = await fetch(
        `${MERCHANT_LOGO_ENDPOINT}?userId=${merchant.id}`
      );
      console.log(response);
    };
    fetchMerchantLogo();
  }, [merchant]);

  const parsedMerchantFormData = JSON.stringify(merchantFormData, null, "\t");

  return ( '' );
};

export default MerchantLogin;
