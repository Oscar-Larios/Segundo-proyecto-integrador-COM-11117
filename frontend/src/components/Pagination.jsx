import styles from "./Pagination.module.css";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.btn}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ← Anterior
      </button>
      <span className={styles.info}>
        Página {page} de {totalPages}
      </span>
      <button
        className={styles.btn}
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Siguiente →
      </button>
    </div>
  );
}
