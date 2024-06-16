// hooks/useFetchNews.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { Article, NewsResponse } from "../interfaces/news-interface";

const useFetchNews = (query: string) => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = "440e1a7f7c6f4bab9f9f3e739f40c3ab";
      const today = new Date().toString().split("T")[0];
      const sort = "popularity";
      const url = `https://newsapi.org/v2/everything?q=${query}&from=${today}&sortBy=${sort}&apiKey=${apiKey}`;

      try {
        const response = await axios.get<NewsResponse>(url);
        setNews(response.data.articles);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query]);

  return { news, loading, error };
};

export default useFetchNews;
