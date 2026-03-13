# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal CV/portfolio website for Daniel Hollands, built with **Middleman** (Ruby static site generator) and served via **Netlify** from the `master` branch.

## Development Commands

The project runs inside Docker:

```bash
docker compose build    # Build the container (first time or after Gemfile changes)
docker compose up       # Start dev server at http://localhost:4567 with livereload
```

To run commands inside the container directly:

```bash
docker compose run web middleman build --verbose    # Production build to ./build/
docker compose run web bundle exec middleman server  # Dev server without compose
```

There are no automated tests or linters configured.

## Architecture

**One-page scroll CV** assembled from ERB partials via Middleman's template system.

- `source/index.html.erb` — assembles all partials in order
- `source/layouts/layout.erb` — HTML shell, loads CSS/JS assets
- `source/partials/_*.erb` — one file per CV section (employment, skills, certificates, education, etc.)
- `config.rb` — Middleman config: asset pipeline (Sass/Compass/Susy), build optimizations (minification, asset hashing, PNG compression), and favicon generation for multiple platforms

**CSS** uses Sass + Compass + Susy grid framework. Entry point: `source/css/application.css.scss`.

**JS** is jQuery-based with one-page-nav for sticky navigation. Entry point: `source/js/main.js`.

**Images** have retina (`@2x`) variants and are served via `retina.js`.

## Deployment

Pushing to `master` triggers an automatic Netlify deploy. The `build/` directory is gitignored — Netlify runs `middleman build` itself.
