# setup

this needs to happen only once after each cloning or pulling

```bash
# cd into online-school/back directory
cd back/

# install/update python and packages
uv sync

# OPTIONAL: override port for local development
# settings in .env take precedence over .flaskenv settings
# cp example.env .env
# edit .env to update credentials, ports, etc.

# create and seed the db
uv run flask seed undo
uv run flask db upgrade
uv run flask seed all
```

# run the app

this will happen multiple times during development

```bash
uv run flask run
```

# db stuff

## get started with db
```bash
uv run flask seed undo
uv run flask db upgrade
uv run flask seed all
```

## update db schema, eg add new table

  - modify `app/models/model_name_singular.py`
  - potentially modify `app/models/__init___.py` to add the new model
  - modify `app/seeds/model_name_plural.py`
  - potentially modify `app/seeds/__init___.py` to add the new model
    seeds

to create a migration and run it, after making the above changes,

```bash
uv run flask db migrate -m "modify model_name in cool way"
uv run flask seed undo
uv run flask db upgrade
uv run flask seed all
```
