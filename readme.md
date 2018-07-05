# My Name is Daniel
## Repository for my curriculum vitae site

### Technology

This site is powered by the [middleman static site generator](https://middlemanapp.com/).

```bash
middleman server [options]   # Start the preview server
middleman build [options]    # Builds the static site for deployment
middleman console [options]  # Start an interactive console in the context of your...
```

### Deployment

The site is hosted on [GitHub Pages](https://pages.github.com/), deployed via the [middleman-gh-pages](https://github.com/edgecase/middleman-gh-pages) gem.

```bash
rake build    # Compile all files into the build directory
rake publish  # Build and publish to Github Pages (if you have trouble deploying, delete the `build` directory)
```
