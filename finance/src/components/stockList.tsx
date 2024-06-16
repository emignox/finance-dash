import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

interface StockData {
  symbol: string;
  name: string;
  price: number;
}

function Stock() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<StockData[]>([]);

  const FethcData = async () => {
    try {
      const response = await axios.get(
        "https://financialmodelingprep.com/api/v3/stock/list?apikey=QgkW0L2PxXxupHEKzUsYUQV0Lfgv41P0"
      );
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FethcData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading"></div>
      ) : (
        <div>
          {data.map((item, index) => (
            <div className="flex gap-3" key={index}>
              <h1 className="text-blue-400 ">{item.symbol}</h1>
              <h1 className="text-blue-200">{item.name}</h1>
              <h1 className="text-red-900">{item.price}</h1>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default Stock;
