import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import NewsForm from "../components/NewsForm";
import styles from "./FormPage.module.css";

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const currentUser = sessionStorage.getItem("current_user") || "";

  useEffect(() => {
    api.getArticle(id)
      .then(setArticle)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (form) => {
    setSaving(true);
    setError("");
    try {
      await api.updateArticle(id, form);
      navigate(`/articles/${id}`);
    } catch (e) {
      setError(e.message);
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Eliminar este artículo?")) return;
    setSaving(true);
    try {
      await api.deleteArticle(id);
      navigate("/");
    } catch (e) {
      setError(e.message);
      setSaving(false);
    }
  };

  if (loading) return <p className={styles.state}>Cargando…</p>;

  if (article && article.author !== currentUser) {
    return (
      <div className={styles.notice}>
        <p>No tienes permiso para editar este artículo.</p>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Editar artículo</h1>
      {error && <p className={styles.error}>{error}</p>}
      {article && (
        <NewsForm
          initial={article}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          loading={saving}
        />
      )}
    </main>
  );
}
