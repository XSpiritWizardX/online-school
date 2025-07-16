# setup

```bash
cd front/ # cd into the online-school/front directory
npm install # install/update js packages
```

## run development

```bash
npm run dev
```

### use a browser to view front end

browse to [`localhost:5173`] (or whatever port is configured)

## configuration

vite attempts to read configuration from the following files in the
following order.  settings in later files override settings in earlier
files.

| file                                    | in git? |
| :-------------------------------------- | :-----: |
| `.env`                                  |   ✅    |
| `.env.local`                            |   ❌    |
| `.env.[mode]` (e.g. `.env.development`) |   ✅    |
| `.env.[mode].local`                     |   ❌    |

`mode` is determined by how the app is started.

| how it started   | mode          |
| :--------------- | ------------: |
| `npm run dev`    | "development" |
| `npm run build`  | "production"  |

## build for production

read port (and other configuration) from `.env.production`
```bash
npm run build
```

### deploy
TODO

