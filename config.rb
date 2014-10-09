###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
  config[:file_watcher_ignore] += [/.idea\//]
end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Chrome needs a precision of 7 to round properly
Sass::Script::Number.precision = 7

# firesass support http://stackoverflow.com/a/10695532/1049688
compass_config do |compass|
  compass.sass_options = { :debug_info => true }
end

set :css_dir, 'css'

set :js_dir, 'js'

set :images_dir, 'img'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash, ignore: %w(open-graph.png windows-tile-icon.png)

  # Compress PNGs after build
  # First: gem install middleman-smusher
  require "middleman-smusher"
  activate :smusher

  # https://github.com/follmann/middleman-favicon-maker
  activate :favicon_maker, :icons => {
      "_favicon_template.png" => [
          { icon: "apple-touch-icon-152x152-precomposed.png" },
          { icon: "apple-touch-icon-144x144-precomposed.png" },
          { icon: "apple-touch-icon-114x114-precomposed.png" },
          { icon: "apple-touch-icon-72x72-precomposed.png" },
      ]
  }

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

activate :deploy do |deploy|

  # https://github.com/karlfreeman/middleman-deploy/wiki/How-to-store-passwords-some-place-other-than-in-config.rb
  file     = File.open(".ftp_password", "r")
  password = file.read
  file.close

  deploy.method   = :ftp
  deploy.host     = "91.208.99.4"
  deploy.path     = "/public_html/"
  deploy.user     = "limeblast@danielhollands.co.uk"
  deploy.password = password

  deploy.build_before = true # default: false
end