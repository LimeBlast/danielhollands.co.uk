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

### Reviewing the PDF in development

The dev server serves `source/`, but the PDF is generated from `build/`, so
`npm run build` is what refreshes it. It also drops a copy at
`source/daniel-hollands-cv.pdf` (gitignored) so the Download CV link works at
http://localhost:4567/daniel-hollands-cv.pdf.

In VS Code this is the **Build: Site + PDF** task.

The dev server picks up the new PDF without a restart, but it does need one the
very first time the file is created, such as after a fresh clone.

Note that several sections are hidden in print (see `source/css/_print.scss`),
so edits to Fun Facts, Certificates, Contact, or Hobbies will not change the
PDF. The PDF is also not byte-reproducible, since Chrome embeds a creation
date, so don't compare hashes to check whether a change landed.

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
