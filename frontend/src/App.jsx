import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";
import Trending from "./pages/Trending";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/create" element={<CreateArticle />} />
        <Route path="/edit/:id" element={<EditArticle />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </div>
  );
}
