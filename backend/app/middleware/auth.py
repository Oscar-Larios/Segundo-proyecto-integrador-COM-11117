from flask import request, jsonify
from functools import wraps


def get_current_user():
    """Extrae el usuario del header X-User."""
    return request.headers.get("X-User", "").strip()


def require_user(f):
    """Decorator: rechaza si no hay X-User en el header."""
    @wraps(f)
    def decorated(*args, **kwargs):
        user = get_current_user()
        if not user:
            return jsonify({"error": "Header X-User requerido"}), 401
        return f(*args, **kwargs)
    return decorated
