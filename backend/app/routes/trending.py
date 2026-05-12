from flask import Blueprint, jsonify, current_app
import requests

trending_bp = Blueprint("trending", __name__)

NYT_BASE = "https://api.nytimes.com/svc/topstories/v2/home.json"


@trending_bp.route("/trending", methods=["GET"])
def get_trending():
    api_key = current_app.config["NYT_API_KEY"]

    try:
        response = requests.get(NYT_BASE, params={"api-key": api_key}, timeout=5)
        response.raise_for_status()
        data = response.json()
    except requests.RequestException as e:
        return jsonify({"error": f"No se pudo conectar a la API de NYT: {str(e)}"}), 502

    # Transformar: solo devolvemos lo necesario para el render
    articles = []
    for item in data.get("results", [])[:10]:
        multimedia = item.get("multimedia") or []
        image = next(
            (m["url"] for m in multimedia if m.get("format") == "Super Jumbo"),
            None,
        )
        articles.append({
            "title": item.get("title", ""),
            "abstract": item.get("abstract", ""),
            "url": item.get("url", ""),
            "image": image,
            "published_date": item.get("published_date", ""),
            "section": item.get("section", ""),
        })

    return jsonify({"trending": articles})
