import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";

const TIMESTAMP_KEY = "articles_timestamp";

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(async (currentPage = 1) => {
    setLoading(true);
    setError(null);

    try {
      const timestamp = localStorage.getItem(TIMESTAMP_KEY);
      const data = await api.getArticles(currentPage, timestamp);

      setArticles(data.articles);
      setTotalPages(data.pages);

      if (currentPage === 1) {
        localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles(page);
  }, [page, fetchArticles]);

  const refresh = () => {
    localStorage.removeItem(TIMESTAMP_KEY);
    setPage(1);
    fetchArticles(1);
  };

  return { articles, page, setPage, totalPages, loading, error, refresh };
}