from flask import Blueprint, request, jsonify
from ..database import db
from ..models.article import Article
from ..middleware.auth import get_current_user, require_user
from datetime import datetime, timezone

articles_bp = Blueprint("articles", __name__)


# GET /api/articles?page=1&per_page=10&since=<ISO_DATE>
@articles_bp.route("/articles", methods=["GET"])
def list_articles():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    since = request.args.get("since")

    query = Article.query.order_by(Article.created_at.desc())

    if since:
        try:
            since_dt = datetime.fromisoformat(since.replace("Z", "+00:00"))
            query = query.filter(Article.created_at > since_dt)
        except ValueError:
            pass

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        "articles": [a.to_dict() for a in pagination.items],
        "total": pagination.total,
        "pages": pagination.pages,
        "current_page": page,
    })


# GET /api/articles/<id>
@articles_bp.route("/articles/<int:article_id>", methods=["GET"])
def get_article(article_id):
    article = Article.query.get_or_404(article_id)
    return jsonify(article.to_dict())


# POST /api/articles
@articles_bp.route("/articles", methods=["POST"])
@require_user
def create_article():
    user = get_current_user()
    data = request.get_json()

    if not data or not all(k in data for k in ("title", "image_url", "body")):
        return jsonify({"error": "Faltan campos: title, image_url, body"}), 400

    article = Article(
        title=data["title"],
        image_url=data["image_url"],
        body=data["body"],
        author=user,
    )
    db.session.add(article)
    db.session.commit()
    return jsonify(article.to_dict()), 201


# PATCH /api/articles/<id>
@articles_bp.route("/articles/<int:article_id>", methods=["PATCH"])
@require_user
def update_article(article_id):
    user = get_current_user()
    article = Article.query.get_or_404(article_id)

    if article.author != user:
        return jsonify({"error": "No tienes permiso para editar este artículo"}), 403

    data = request.get_json()
    for field in ("title", "image_url", "body"):
        if field in data:
            setattr(article, field, data[field])

    db.session.commit()
    return jsonify(article.to_dict())


# PUT /api/articles/<id>
@articles_bp.route("/articles/<int:article_id>", methods=["PUT"])
@require_user
def replace_article(article_id):
    user = get_current_user()
    article = Article.query.get_or_404(article_id)

    if article.author != user:
        return jsonify({"error": "No tienes permiso para reemplazar este artículo"}), 403

    data = request.get_json()
    if not all(k in data for k in ("title", "image_url", "body")):
        return jsonify({"error": "Faltan campos para reemplazar"}), 400

    article.title = data["title"]
    article.image_url = data["image_url"]
    article.body = data["body"]
    db.session.commit()
    return jsonify(article.to_dict())


# DELETE /api/articles/<id>
@articles_bp.route("/articles/<int:article_id>", methods=["DELETE"])
@require_user
def delete_article(article_id):
    user = get_current_user()
    article = Article.query.get_or_404(article_id)

    if article.author != user:
        return jsonify({"error": "No tienes permiso para eliminar este artículo"}), 403

    db.session.delete(article)
    db.session.commit()
    return jsonify({"message": "Artículo eliminado"}), 200
