from flask import render_template, redirect, url_for
from flask_login import login_required, current_user
from app.main import bp


@bp.route("/")
def index():
    if current_user.is_authenticated:
        return redirect(url_for("main.dashboard"))
    return redirect(url_for("auth.login"))


@bp.route("/dashboard")
@login_required
def dashboard():
    return render_template("dashboard.html", username=current_user.id)
