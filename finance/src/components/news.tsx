// components/FinancialNews.tsx
import React from "react";
import useFetchNews from "./fetch-news/fetch";
import { useState } from "react";
import StockList from "./stockList";
const Topics = [
  "Nasdaq",
  "Bitcoin",
  "Apple",
  "Tesla",
  "Amazon",
  "Facebook",
  "Google",
  "Ethereum",
];

const FinancialNews: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState(Topics[0]);
  const { news, loading, error } = useFetchNews(selectedTopic);

  if (loading) {
    return <div className="loading"></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="overflow-hidden ">
        <StockList />
      </div>
      <div className="flex ">
        <section className="flex flex-col items-start justify-start w-3/4 h-screen p-2 bg-white shadow-inner gap-y-1 rounded-xl ">
          <h1 className="my-2 text-2xl font-bold">Topics</h1>
          {Topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => setSelectedTopic(topic)}
              className="w-full px-4 py-2 text-xl font-thin transition duration-300 ease-in-out transform border-2 border-blue-600 rounded-md text-start hover:border-red-500 hover:scale-105"
            >
              {topic}
            </button>
          ))}
        </section>
        <div className="text-black">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((article, index) => (
              <div
                key={index}
                className="flex flex-col p-6 bg-transparent rounded-lg shadow-lg"
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
                >
                  <h2 className="mb-2 text-xl font-bold text-blue-500">
                    {article.title}
                  </h2>
                </a>
                <p className="flex-grow mb-4">{article.description}</p>
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt=""
                    className="object-cover w-full h-48 mb-4 rounded-md"
                  />
                )}
                <p className="mt-auto text-sm">
                  <strong>Source:</strong> {article.source.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialNews;
