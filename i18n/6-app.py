#!/usr/bin/env python3
"""Flask app with user locale preference."""

from __future__ import annotations

from flask import Flask, g, render_template, request
from flask_babel import Babel


class Config:
    """App configuration."""

    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel()

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """Retrieve user dict from ?login_as=<id>."""
    login_as = request.args.get("login_as")
    if not login_as:
        return None
    try:
        user_id = int(login_as)
    except (TypeError, ValueError):
        return None
    return users.get(user_id)


@app.before_request
def before_request():
    """Set logged-in user on flask.g."""
    g.user = get_user()


def get_locale() -> str:
    """Locale priority: URL -> user -> header -> default."""
    languages = app.config["LANGUAGES"]

    locale = request.args.get("locale")
    if locale in languages:
        return locale

    user = getattr(g, "user", None) or get_user()
    if user:
        user_locale = user.get("locale")
        if user_locale in languages:
            return user_locale

    header_locale = request.accept_languages.best_match(languages)
    if header_locale:
        return header_locale

    return app.config["BABEL_DEFAULT_LOCALE"]


babel.init_app(app, locale_selector=get_locale)


@app.route("/", strict_slashes=False)
def index() -> str:
    """Render index page."""
    return render_template("6-index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
