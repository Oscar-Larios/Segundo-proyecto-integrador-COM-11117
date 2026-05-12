import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import NewsForm from "../components/NewsForm";
import styles from "./FormPage.module.css";

export default function CreateArticle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentUser = sessionStorage.getItem("current_user");

  if (!currentUser) {
    return (
      <div className={styles.notice}>
        <p>Debes iniciar sesión (ingresar tu nombre de usuario) para publicar.</p>
      </div>
    );
  }

  const handleSubmit = async (form) => {
    setLoading(true);
    setError("");
    try {
      const article = await api.createArticle(form);
      navigate(`/articles/${article.id}`);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Publicar artículo</h1>
      {error && <p className={styles.error}>{error}</p>}
      <NewsForm onSubmit={handleSubmit} loading={loading} />
    </main>
  );
}
