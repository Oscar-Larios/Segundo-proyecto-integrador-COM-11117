import { Link } from "react-router-dom";
import styles from "./NewsCard.module.css";

export default function NewsCard({ article }) {
  const excerpt = article.body.length > 120
    ? article.body.slice(0, 120) + "…"
    : article.body;

  return (
    <article className={styles.card}>
      <Link to={`/articles/${article.id}`}>
        <div className={styles.imgWrap}>
          <img src={article.image_url} alt={article.title} loading="lazy" />
        </div>
        <div className={styles.body}>
          <span className={styles.author}>{article.author}</span>
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.excerpt}>{excerpt}</p>
          <time className={styles.date}>
            {new Date(article.created_at).toLocaleDateString("es-MX", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </time>
        </div>
      </Link>
    </article>
  );
}
