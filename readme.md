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

### Deployment

The site is hosted on [Netlify](https://www.netlify.com/), deployed automatically upon pushing commits to master.
