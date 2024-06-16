// components/FinancialNews.tsx
import React from "react";
import useFetchNews from "./fetch-news/fetch";

const FinancialNews: React.FC = () => {
  const { news, loading, error } = useFetchNews("nasdaq");

  if (loading) {
    return <div className="loading"></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-black">
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h2>{article.title}</h2>
            </a>
            <p>{article.description}</p>
            <img src={`${article.urlToImage}`} alt="" />
            <p>
              <strong>Source:</strong> {article.source.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialNews;
