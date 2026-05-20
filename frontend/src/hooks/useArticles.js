import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";

const CACHE_KEY = "articles_cache";
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
      // Siempre pide la página completa sin filtro de fecha
      const data = await api.getArticles(currentPage);
      setArticles(data.articles);
      setTotalPages(data.pages);

      // Guarda en caché solo la página 1
      if (currentPage === 1) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data.articles));
        localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
      }
    } catch (err) {
      // Si falla la red, intenta mostrar caché
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached && currentPage === 1) {
        setArticles(JSON.parse(cached));
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles(page);
  }, [page, fetchArticles]);

  const refresh = () => {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(TIMESTAMP_KEY);
    fetchArticles(page);
  };

  return { articles, page, setPage, totalPages, loading, error, refresh };
}