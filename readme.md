# My Name is Daniel
## Repository for my curriculum vitae site

### Technology

This site is powered by the [middleman static site generator](https://middlemanapp.com/), running inside a Docker container.

You can use `docker compose` to build the image and run the middleman server:

```bash
docker compose build
docker compose up
```

and can build the site using:

```bash
docker build -t danielhollands . && docker run -v build:/usr/src/app/build danielhollands
```

Alternatively you can use the following commands from inside the docker container:

```bash
middleman server [options]   # Start the preview server
middleman build [options]    # Builds the static site for deployment
middleman console [options]  # Start an interactive console in the context of your...
```

### Linting

**ERB templates** — run inside Docker:

```bash
docker compose run --rm web bundle exec erb_lint --lint-all
```

**SCSS styles** — run locally (requires Node):

```bash
npm install        # First time only
npm run lint:css
```

To auto-fix issues where possible:

```bash
npm run lint:css -- --fix
```

### Deployment

The site is hosted on [Netlify](https://www.netlify.com/), deployed automatically upon pushing commits to `main`.
