from flask import Blueprint, jsonify, current_app
import requests

health_bp = Blueprint("health", __name__)


@health_bp.route("/health", methods=["GET"])
def health():
    api_key = current_app.config["NYT_API_KEY"]
    nyt_ok = False

    try:
        r = requests.get(
            "https://api.nytimes.com/svc/topstories/v2/home.json",
            params={"api-key": api_key},
            timeout=4,
        )
        nyt_ok = r.status_code == 200
    except Exception:
        nyt_ok = False

    return jsonify({
        "status": "ok",
        "nyt_api_active": nyt_ok,
    })
