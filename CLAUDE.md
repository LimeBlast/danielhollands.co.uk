# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal CV/portfolio website for Daniel Hollands, built with **Middleman 4** (Ruby static site generator) and served via **Netlify** from the `main` branch.

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

After changing the Gemfile, extract the updated lock file:

```bash
docker run --rm danielhollands cat /usr/src/app/Gemfile.lock > Gemfile.lock
```

There are no automated tests or linters configured.

## Architecture

**One-page scroll CV** assembled from ERB partials via Middleman's template system.

- `source/index.html.erb` — assembles all partials in order
- `source/layouts/layout.erb` — HTML shell, loads CSS/JS assets; uses `current_page.data.title` (not `data.page.title`) for frontmatter
- `source/partials/_*.erb` — one file per CV section (employment, skills, certificates, education, etc.)
- `config.rb` — Middleman config: build optimizations (minification, asset hashing) and favicon generation

**CSS** uses Sass (via sassc/LibSass). No Compass or Susy — all replaced with plain CSS and flexbox. Entry point: `source/css/application.css.scss`.

- `source/css/_base.scss` — Sass variables (colours, fonts, layout breakpoints: `$desktop-breakpoint: 40em`, `$max-width: 1000px`, `$menu-width-pct: 25%`)
- `source/css/_mixins.scss` — `em()` and `rem()` utility functions only
- Responsive breakpoint is `@media (min-width: #{$desktop-breakpoint})`
- Two-column desktop layout: dark sidebar (25%) + blue content area (75%) via CSS gradient on `.wrap`; `.menu` is `position: fixed`; `.main` has `margin-left: 25%`

**JS** is vanilla JavaScript with one-page-nav for sticky navigation. Individual vendor scripts are loaded via `javascript_include_tag` in `layout.erb` (no Sprockets concatenation). Entry point: `source/js/main.js`.

**Images** — icons are SVG files in `source/img/icons/`, referenced via `background-image: url('/img/icons/xxx.svg')` in the CSS. Content images (header photo, certificates) use retina `@2x` PNG variants in `source/img/`.

## Deployment

Pushing to `main` triggers an automatic Netlify deploy. The `build/` directory is gitignored — Netlify runs `middleman build` itself.

## Stack Versions

- Ruby 4.0.4 (Docker + `.ruby-version`)
- Middleman 4.6.x
- sassc 2.4.x (LibSass, Sass 3.4-compatible syntax)
