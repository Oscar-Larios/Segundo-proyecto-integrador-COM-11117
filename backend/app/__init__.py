from flask import Flask
from flask_cors import CORS
from .database import db
from .config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)

    from .routes.articles import articles_bp
    from .routes.trending import trending_bp
    from .routes.health import health_bp

    app.register_blueprint(articles_bp, url_prefix="/api")
    app.register_blueprint(trending_bp, url_prefix="/api")
    app.register_blueprint(health_bp, url_prefix="/api")

    with app.app_context():
        db.create_all()

    return app
