import { useState, useEffect } from "react";
import { api } from "../services/api";

export function useTrending() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getTrending()
      .then((data) => setTrending(data.trending || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { trending, loading, error };
}
