import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [user, setUser] = useState(sessionStorage.getItem("current_user") || "");
  const [inputVal, setInputVal] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    if (inputVal.trim()) {
      sessionStorage.setItem("current_user", inputVal.trim());
      setUser(inputVal.trim());
      setShowLogin(false);
      setInputVal("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("current_user");
    setUser("");
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <span className={styles.date}>
          {new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
        <div className={styles.userArea}>
          {user ? (
            <>
              <span className={styles.userGreet}>Hola, <strong>{user}</strong></span>
              <button className={styles.btnSmall} onClick={handleLogout}>Salir</button>
            </>
          ) : (
            <button className={styles.btnSmall} onClick={() => setShowLogin(true)}>Iniciar sesión</button>
          )}
        </div>
      </div>

      <div className={styles.masthead}>
        <Link to="/" className={styles.logo}>The Daily Chronicle</Link>
      </div>

      <nav className={styles.nav}>
        <Link to="/">Inicio</Link>
        <Link to="/trending">Trending</Link>
        {user && <Link to="/create">Publicar</Link>}
      </nav>

      {showLogin && (
        <div className={styles.loginOverlay} onClick={() => setShowLogin(false)}>
          <div className={styles.loginBox} onClick={(e) => e.stopPropagation()}>
            <h3>Tu nombre de usuario</h3>
            <p>Se guardará en esta sesión para identificar tus artículos.</p>
            <input
              type="text"
              placeholder="Ej: oscar_morales"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
            <button onClick={handleSave}>Guardar</button>
          </div>
        </div>
      )}
    </header>
  );
}
