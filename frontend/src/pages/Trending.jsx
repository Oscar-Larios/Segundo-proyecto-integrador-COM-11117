import { useTrending } from "../hooks/useTrending";
import styles from "./Trending.module.css";

export default function Trending() {
  const { trending, loading, error } = useTrending();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Trending Topics</h1>
        <p className={styles.subtitle}>Lo más relevante del New York Times en este momento.</p>
      </header>

      {loading && <p className={styles.state}>Cargando trending…</p>}
      {error && <p className={styles.stateError}>Error: {error}</p>}

      <div className={styles.grid}>
        {trending.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            {item.image && (
              <div className={styles.imgWrap}>
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
            )}
            <div className={styles.content}>
              <span className={styles.section}>{item.section}</span>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <p className={styles.abstract}>{item.abstract}</p>
              <span className={styles.date}>
                {item.published_date
                  ? new Date(item.published_date).toLocaleDateString("es-MX", {
                      year: "numeric", month: "long", day: "numeric",
                    })
                  : ""}
              </span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
