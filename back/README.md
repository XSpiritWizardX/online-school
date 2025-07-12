# setup

```bash
# cd into online-school/back directory
cd back/

# install/update python and packages
uv sync

# OPTIONAL: override port for local development
# settings in this file take precedence over other .env files
cp example.env.local .env.local

# run flask with those packages
uv run -- flask run
```
