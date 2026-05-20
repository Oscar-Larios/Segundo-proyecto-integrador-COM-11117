import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import styles from "./ArticleDetail.module.css";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = sessionStorage.getItem("current_user") || "";

  useEffect(() => {
    api.getArticle(id)
      .then(setArticle)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className={styles.state}>Cargando…</p>;
  if (error) return <p className={styles.stateError}>Error: {error}</p>;
  if (!article) return null;

  const isOwner = currentUser && currentUser === article.author;

  return (
    <main className={styles.main}>
      <Link to="/" className={styles.back}>← Volver</Link>

      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.author}>{article.author}</span>
          <h1 className={styles.title}>{article.title}</h1>
          <time className={styles.date}>
            {new Date(article.created_at).toLocaleDateString("es-MX", {
              weekday: "long", year: "numeric", month: "long", day: "numeric",
            })}
          </time>
          {isOwner && (
            <Link to={`/edit/${article.id}`} className={styles.btnEdit}>
              Editar artículo
            </Link>
          )}
        </header>

        <div className={styles.columns}>
          <div className={styles.imageCol}>
            <img className={styles.hero} src={article.image_url} alt={article.title} />
          </div>

          <div className={styles.bodyCol}>
            {article.body.split("\n").map((para, i) =>
              para ? <p key={i}>{para}</p> : null
            )}
          </div>
        </div>
      </article>
    </main>
  );
}