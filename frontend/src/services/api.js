const BASE = import.meta.env.VITE_API_URL || "/api";

function getUser() {
  return sessionStorage.getItem("current_user") || "";
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "X-User": getUser(),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "Error del servidor");
  }

  return res.json();
}

export const api = {
  getArticles: (page = 1, since = null) => {
    const params = new URLSearchParams({ page, per_page: 10 });
    if (since) params.append("since", since);
    return request(`/articles?${params}`);
  },
  getArticle: (id) => request(`/articles/${id}`),
  createArticle: (data) =>
    request("/articles", { method: "POST", body: JSON.stringify(data) }),
  updateArticle: (id, data) =>
    request(`/articles/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  replaceArticle: (id, data) =>
    request(`/articles/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteArticle: (id) =>
    request(`/articles/${id}`, { method: "DELETE" }),
  getTrending: () => request("/trending"),
};
