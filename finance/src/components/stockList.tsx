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

  const FetchData = async () => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/stock/list?apikey=${import.meta.env.VITE_APP_API_KEY_STOCK}`
      );
      console.log(response.data);
      const slicedData = response.data.slice(0, response.data.length / 9); // Prendi solo 1/6 dei dati
      setData(slicedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading"></div>
      ) : (
        <div className="flex slider ">
          {data.map((item, index) => (
            <div
              className="flex items-center justify-center gap-3 px-4 py-2 border-t border-b border-r w-72 "
              key={index}
            >
              <h1 className="text-xl font-thin ">{item.symbol}</h1>
              <h1 className="text-xl font-thin">{item.price}</h1>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default Stock;
