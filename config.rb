# frozen_string_literal: true

require 'uglifier'

###
# Page options, layouts, aliases and proxies
###

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload, host: '0.0.0.0', js_host: 'localhost'
end

set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'img'

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_javascript, compressor: Uglifier.new(harmony: true)

  # Enable cache buster
  activate :asset_hash, ignore: %w[open-graph.png windows-tile-icon.png]

  # https://github.com/follmann/middleman-favicon-maker
  activate :favicon_maker, icons: {
    '_favicon_template.png' => [
      { icon: 'apple-touch-icon-180x180-precomposed.png' },
      { icon: 'apple-touch-icon-152x152-precomposed.png' },
      { icon: 'apple-touch-icon-144x144-precomposed.png' },
      { icon: 'apple-touch-icon-120x120-precomposed.png' },
      { icon: 'apple-touch-icon-114x114-precomposed.png' },
      { icon: 'apple-touch-icon-76x76-precomposed.png' },
      { icon: 'apple-touch-icon-72x72-precomposed.png' },
      { icon: 'apple-touch-icon-60x60-precomposed.png' },
      { icon: 'apple-touch-icon-57x57-precomposed.png' },
      { icon: 'apple-touch-icon-precomposed.png', size: '57x57' },
      { icon: 'apple-touch-icon.png', size: '57x57' },
      { icon: 'favicon-196x196.png' },
      { icon: 'favicon-160x160.png' },
      { icon: 'favicon-96x96.png' },
      { icon: 'favicon-32x32.png' },
      { icon: 'favicon-16x16.png' },
      { icon: 'favicon.png', size: '16x16' },
      { icon: 'favicon.ico', size: '64x64,32x32,24x24,16x16' },
      { icon: 'mstile-70x70.png', size: '70x70' },
      { icon: 'mstile-144x144.png', size: '144x144' },
      { icon: 'mstile-150x150.png', size: '150x150' },
      { icon: 'mstile-310x310.png', size: '310x310' },
      { icon: 'mstile-310x150.png', size: '310x150' }
    ]
  }
end
