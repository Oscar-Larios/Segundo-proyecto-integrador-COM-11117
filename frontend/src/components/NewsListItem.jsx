import { Link } from "react-router-dom";
import styles from "./NewsListItem.module.css";

export default function NewsListItem({ article }) {
  const excerpt = article.body.length > 180
    ? article.body.slice(0, 180) + "…"
    : article.body;

  return (
    <article className={styles.item}>
      <Link to={`/articles/${article.id}`} className={styles.inner}>
        <div className={styles.imgWrap}>
          <img src={article.image_url} alt={article.title} loading="lazy" />
        </div>
        <div className={styles.content}>
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
