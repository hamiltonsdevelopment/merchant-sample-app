import { useState, useEffect } from 'react';
import { TRANSACTION_CONFIRMATION_ENDPOINT } from '../endpoints';

export const TransactionConfirmation = () => {
  const [isLoadingTCPayload, setIsLoadingTCPayload] = useState(false);
  const [tcPayload, setTCPayload] = useState(null);
  // on load, check if GET /transaction-confirmation returns the tcPayload
  useEffect(() => {
    const getTCPayload = async () => {
      setIsLoadingTCPayload(true);
      const data = await fetch(TRANSACTION_CONFIRMATION_ENDPOINT);
      const json = await data.json();
      console.log('Transaction Confirmation JSON response: ', json);
      setTCPayload(json);
      setIsLoadingTCPayload(false);
    };
    getTCPayload();
  }, []);

  const parsedTCPayload = tcPayload
    ? JSON.stringify(tcPayload, null, '\t')
    : null;

  return (
    <div className="flex flex-col w-full py-12">
      <h1 className="text-4xl text-primary">transaction-confirmation</h1>
      <div className="grid grid-cols-1 gap-6 w-full max-w-5xl">
        <form className="mt-8 w-full">
          <div className="grid grid-cols-2 gap-6"></div>
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="bg-tertiary min-w-fit min-h-96 max-h-fit">
              <div className="flex flex-col p-6">
                <p>Request:</p>
                <div className="pt-4  whitespace-pre-wrap"></div>
              </div>
            </div>
            <div className="bg-tertiary  min-w-fit min-h-96 max-h-fit">
              <div className="flex flex-col p-6">
                <p>Response:</p>
                {!isLoadingTCPayload && tcPayload ? (
                  <div className="pt-4 whitespace-pre-wrap">
                    {parsedTCPayload}
                  </div>
                ) : (
                  <div className="pt-4">
                    No JSON data returned from /transaction-confirmation
                    endpoint
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
