import { FC, useState } from "react";
import { TRANSACTION_FEED_ENDPOINT } from "../endpoints";

interface TransactionFeedProps {
  merchantJwt: string | undefined;
}
interface ITime {
  disabled: boolean;
  value: Date;
  epochValue: number;
}
const initTime: ITime = {
  disabled: true,
  value: new Date(),
  epochValue: new Date().getTime(),
};
export const TransactionFeed: FC<TransactionFeedProps> = ({ merchantJwt }) => {
  const [startTime, setStartTime] = useState<ITime>(initTime);
  const [endTime, setEndTime] = useState<ITime>(initTime);
  console.log(startTime.value.toISOString());

  const [isLoadingTransactionFeed, setIsLoadingTransactionFeed] =
    useState(false);
  const [transactionFeedResponse, setTransactionFeedResponse] = useState(null);

  const handleTransactionFeedRequest = async (
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    setIsLoadingTransactionFeed(true);

    const data = await fetch(
      `${TRANSACTION_FEED_ENDPOINT}?${
        startTime.disabled ? "" : `startTime=${startTime.epochValue}&`
      }${endTime.disabled ? "" : `endTime=${endTime.epochValue}`}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${merchantJwt}`,
        },
      }
    );
    const json = await data.json();
    setIsLoadingTransactionFeed(false);
    setTransactionFeedResponse(json);
  };

  const parsedTransactionFeedResponse = transactionFeedResponse
    ? JSON.stringify(transactionFeedResponse, null, "\t")
    : null;

  return (
    <div className="flex flex-col w-full py-12">
      <h1 className="text-4xl text-primary">Transaction Feed</h1>
      <div className="grid grid-cols-1 gap-6 w-full max-w-5xl">
        <form className="mt-8 w-full">
          <div className="grid grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-700 font-semibold">Start time</span>
              <div className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  className="rounded"
                  onChange={() =>
                    setStartTime({
                      ...startTime,
                      disabled: !startTime.disabled,
                    })
                  }
                />
                <input
                  type="datetime-local"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 hover:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                  value={startTime.value.toISOString().slice(0, -1)}
                  style={!startTime.disabled ? { cursor: "pointer" } : {}}
                  onChange={(e) =>
                    setStartTime({
                      ...startTime,
                      value: new Date(e.target.value),
                      epochValue: new Date(e.target.value).getTime(),
                    })
                  }
                  disabled={startTime.disabled}
                />
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 hover:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                  style={!startTime.disabled ? { cursor: "pointer" } : {}}
                  value={startTime.epochValue}
                  onChange={(e) =>
                    setStartTime({
                      ...startTime,
                      value: new Date(Number(e.target.value)),
                      epochValue: Number(e.target.value),
                    })
                  }
                  disabled={startTime.disabled}
                />
              </div>
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">End time</span>
              <div className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  className="rounded"
                  onChange={() =>
                    setEndTime({ ...endTime, disabled: !endTime.disabled })
                  }
                />
                <input
                  type="datetime-local"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 hover:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                  style={!endTime.disabled ? { cursor: "pointer" } : {}}
                  disabled={endTime.disabled}
                  value={endTime.value.toISOString().slice(0, -1)}
                  onChange={(e) =>
                    setEndTime({
                      ...endTime,
                      value: new Date(e.target.value),
                      epochValue: new Date(e.target.value).getTime(),
                    })
                  }
                />
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 hover:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                  style={!endTime.disabled ? { cursor: "pointer" } : {}}
                  disabled={endTime.disabled}
                  value={endTime.epochValue}
                  onChange={(e) =>
                    setEndTime({
                      ...endTime,
                      value: new Date(Number(e.target.value)),
                      epochValue: Number(e.target.value),
                    })
                  }
                />
              </div>
            </label>
            <button
              type="submit"
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                handleTransactionFeedRequest(e)
              }
              className="bg-secondary text-white font-semibold py-2 px-2 max-w-[400px] hover:bg-[#1380FF]"
            >
              Send Transaction Feed Request
            </button>
            <div></div>
          </div>
          <div className="grid grid-cols-1 gap-6 pt-6">
            <div className="bg-tertiary  min-w-fit min-h-96 max-h-fit">
              <div className="flex flex-col p-6">
                <p>Response:</p>
                {!isLoadingTransactionFeed && transactionFeedResponse ? (
                  <div className="pt-4 whitespace-pre-wrap">
                    {parsedTransactionFeedResponse}
                  </div>
                ) : (
                  <div className="pt-4">
                    Please fill the form with the data you want to test the
                    /tranaction-feed endpoint with
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
