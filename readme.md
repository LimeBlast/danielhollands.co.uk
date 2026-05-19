# My Name is Daniel
## Repository for my curriculum vitae site

### Technology

This site is powered by the [middleman static site generator](https://middlemanapp.com/), running inside a Docker container. Node.js is required on the host for PDF generation and CSS linting.

### Development

Build the Docker image (first time, or after Gemfile changes):

```bash
docker compose build
```

Start the dev server at http://localhost:4567 with livereload:

```bash
docker compose up
```

### Building

To build the site and generate the PDF in one command:

```bash
npm run build
```

This runs `middleman build` inside Docker, then generates `build/daniel-hollands-cv.pdf` on the host using Puppeteer. Run `npm install` first if you haven't already.

To run each step separately:

```bash
docker compose run --rm web bundle exec middleman build   # Build site
node generate-pdf.js                                      # Generate PDF
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

The site is hosted on [Netlify](https://www.netlify.com/), deployed automatically upon pushing commits to `main`. The PDF is generated automatically as part of the Netlify build and is available at `/daniel-hollands-cv.pdf`.
