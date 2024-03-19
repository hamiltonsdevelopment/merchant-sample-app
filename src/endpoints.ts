export const LOCAL_BACKEND_URL = import.meta.env.VITE_LOCAL_BACKEND_URL;
export const EXTERNAL_BACKEND_URL = import.meta.env.VITE_EXTERNAL_BACKEND_URL;
export const TRANSACTION_CONFIRMATION_ENDPOINT =
  LOCAL_BACKEND_URL + "/transaction-confirmation";
export const MERCHANT_LOGIN_ENDPOINT =
  EXTERNAL_BACKEND_URL + "/merchants/merchant-login";
export const REDIRECT_FROM_ADVERTISER_ENDPOINT =
  EXTERNAL_BACKEND_URL + "/v1/redirect-from-merchant";
export const TRANSACTION_FEED_ENDPOINT =
  EXTERNAL_BACKEND_URL + "/v1/transaction-feed";
export const REFUND_ENDPOINT =
  EXTERNAL_BACKEND_URL + "/v1/refund-from-merchant";
export const STOREFRONT_RETURN_ENDPOINT = import.meta.env.VITE_RETURN_URL;
export const MERCHANT_LOGO_ENDPOINT =
  EXTERNAL_BACKEND_URL + "/v1/internal/avatar";
