export type MerchantFormData = {
  merchantId?: string;
  secretKey?: string;
};

export type CustomerInformation = {
  customerId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  billingAddress?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  accountId?: string;
};

export type RedirectFormData = {
  charge: {
    chargeDescription: string;
    amount: string;
    currency: string;
  };
  returnUrl: string;
  postbackUrl: string;
  passthrough: {
    chargeId: string;
  };
  customerInformation: CustomerInformation;
};

export type RedirectResponseData = {
  redirectUrl?: string;
  status?: string;
  errorMessage?: string;
  errorCode?: string;
};

export type RefundFormData = {
  accountId?: string;
  customerId?: string;
  transactionId: string;
  amount: number;
  currency: string;
  reason: string;
};

export type RefundResponseData = {
  sessionId: string;
  status: string;
  transactionId: string;
  errorMessage: string;
  errorCode: string | number;
};
