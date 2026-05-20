import { useState, useEffect } from "react";
import { useArticles } from "../hooks/useArticles";
import NewsCard from "../components/NewsCard";
import NewsListItem from "../components/NewsListItem";
import Pagination from "../components/Pagination";
import styles from "./Home.module.css";

export default function Home() {
  const isMobile = window.innerWidth <= 600;
  const [viewMode, setViewMode] = useState(isMobile ? "list" : "cards");
  const { articles, page, setPage, totalPages, loading, error, refresh } = useArticles();

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={styles.main}>
      <div className={styles.toolbar}>
        <h1 className={styles.sectionTitle}>Últimas noticias</h1>
        <div className={styles.controls}>
          {!isMobile && (
            <>
              <button
                className={`${styles.viewBtn} ${viewMode === "cards" ? styles.active : ""}`}
                onClick={() => setViewMode("cards")}
              >
                ▦ Cards
              </button>
              <button
                className={`${styles.viewBtn} ${viewMode === "list" ? styles.active : ""}`}
                onClick={() => setViewMode("list")}
              >
                ☰ Lista
              </button>
            </>
          )}
          <button className={styles.refreshBtn} onClick={refresh}>↺ Actualizar</button>
        </div>
      </div>

      {loading && <p className={styles.state}>Cargando artículos…</p>}
      {error && <p className={styles.stateError}>Error: {error}</p>}

      {!loading && articles.length === 0 && (
        <p className={styles.state}>No hay artículos aún. ¡Publica el primero!</p>
      )}

      {viewMode === "cards" ? (
        <div className={styles.grid}>
          {articles.map((a) => <NewsCard key={a.id} article={a} />)}
        </div>
      ) : (
        <div className={styles.list}>
          {articles.map((a) => <NewsListItem key={a.id} article={a} />)}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </main>
  );
}