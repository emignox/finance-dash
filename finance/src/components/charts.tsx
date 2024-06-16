import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import axios from "axios";

interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
const symbols = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "AMZN",
  "FB",
  "TSLA",
  "NFLX",
  "NVDA",
  "DIS",
  "BABA",
  "IBM",
  "INTC",
  "ORCL",
  "QCOM",
  "ADBE",
  "CSCO",
  "CMCSA",
  "PEP",
  "KO",
  "MCD",
];
function App() {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<StockData[]>([]);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0]);

  useEffect(() => {
    axios
      .get(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${selectedSymbol}?apikey=${import.meta.env.VITE_APP_API_KEY_STOCK}`
      )
      .then((response) => {
        const stockData: StockData[] = [];
        for (const data of response.data.historical) {
          stockData.push({
            date: data.date,
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close,
            volume: data.volume,
          });
        }
        setData(stockData);
      });
  }, [selectedSymbol]);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const myChart = echarts.init(chartRef.current);
      setChart(myChart);

      const reversedData = [...data].reverse();
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },

        grid: [
          {
            height: "50%",
            bottom: "40%",
          },
          {
            top: "70%",
            height: "20%",
          },
        ],
        xAxis: [
          {
            data: reversedData.map((item) => item.date),
            gridIndex: 0,
          },
          {
            data: reversedData.map((item) => item.date),
            gridIndex: 1,
          },
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            splitArea: {
              show: true,
            },
            gridIndex: 0,
          },
          {
            type: "value",
            scale: true,
            splitArea: {
              show: true,
            },
            gridIndex: 1,
          },
        ],
        series: [
          {
            type: "candlestick",
            data: reversedData.map((item) => [
              item.open,
              item.close,
              item.low,
              item.high,
            ]),
            xAxisIndex: 0,
            yAxisIndex: 0,
          },
          {
            type: "bar",
            data: reversedData.map((item) => item.volume),
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              color: "rgba(0,0,0,0.2)",
              barGap: "50%",
            },
          },
        ],
      });
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      if (chart) {
        chart.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chart]);

  return (
    <div className="flex w-full h-screen overflow-hidden ">
      <div className="flex flex-col items-start justify-start py-10 ml-1 gap-y-1 overflow-auto h-[100vh]">
        <h1 className="text-4xl font-bold text-start">Stock Charts</h1>
        {symbols.map((symbol) => (
          <div
            key={symbol}
            onClick={() => setSelectedSymbol(symbol)}
            className={`w-full duration-150 transform border-2 ${selectedSymbol === symbol ? "border-red-500" : "border-blue-500"} rounded-lg cursor-pointer hover:border-red-500`}
          >
            <button className="px-4 py-2 text-yellow-900 rounded-md">
              {symbol}
            </button>
          </div>
        ))}
      </div>
      <div
        className=""
        ref={chartRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default App;
