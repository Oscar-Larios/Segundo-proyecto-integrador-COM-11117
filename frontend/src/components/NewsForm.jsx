import { useState } from "react";
import styles from "./NewsForm.module.css";

export default function NewsForm({ initial = {}, onSubmit, onDelete, loading }) {
  const [form, setForm] = useState({
    title: initial.title || "",
    image_url: initial.image_url || "",
    body: initial.body || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.image_url || !form.body) {
      setError("Todos los campos son requeridos.");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.columns}>
        {/* Columna izquierda */}
        <div className={styles.left}>
          <label>
            Título
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Título del artículo"
            />
          </label>

          <label>
            URL de imagen
            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="https://..."
            />
          </label>

          {form.image_url && (
            <img className={styles.preview} src={form.image_url} alt="preview" />
          )}
        </div>

        {/* Columna derecha */}
        <div className={styles.right}>
          <label className={styles.bodyLabel}>
            Contenido
            <textarea
              name="body"
              value={form.body}
              onChange={handleChange}
              placeholder="Escribe el cuerpo de la noticia..."
            />
          </label>

          <div className={styles.actions}>
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? "Guardando…" : initial.id ? "Actualizar" : "Publicar"}
            </button>
            {onDelete && (
              <button
                type="button"
                className={styles.btnDanger}
                onClick={onDelete}
                disabled={loading}
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}