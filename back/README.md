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
