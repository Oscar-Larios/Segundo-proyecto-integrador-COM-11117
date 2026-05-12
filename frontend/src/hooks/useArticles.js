import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";

const STORAGE_KEY = "articles_cache";
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
      const cached = localStorage.getItem(STORAGE_KEY);
      const timestamp = localStorage.getItem(TIMESTAMP_KEY);
      const isFirstLoad = !cached || !timestamp;

      if (isFirstLoad) {
        // Primera vez: traer todo y guardar en localStorage
        const data = await api.getArticles(currentPage);
        setArticles(data.articles);
        setTotalPages(data.pages);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.articles));
        localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
      } else {
        // Siguientes renders: pedir solo nuevos desde el timestamp
        const data = await api.getArticles(currentPage, timestamp);
        const previous = JSON.parse(cached);
        const merged = [...data.articles, ...previous];
        setArticles(merged);
        setTotalPages(data.pages || totalPages);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
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
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TIMESTAMP_KEY);
    fetchArticles(page);
  };

  return { articles, page, setPage, totalPages, loading, error, refresh };
}
