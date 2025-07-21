# setup

```bash
# cd into online-school/back directory
cd back/

# install/update python and packages
uv sync

# OPTIONAL: override port for local development
# settings in .env take precedence over .flaskenv settings
# cp example.env .env
# edit .env to update credentials, ports, etc.

# run app with those packages
uv run -- flask run
```

# get started with db
```bash
uv run alembic upgrade head
uv run flask seed
```

# update db schema

modify `app/models/model_name_singular.py`
modify `app/seeds/model_name_plural.py`
potentially modify `run.py` to add the new model seeds

```bash
uv run alembic revision --autogenerate -m "modify model_name"
uv run alembic upgrade head
uv run flask seed
```
