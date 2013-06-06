###
# Compass
###

# Susy grids in Compass
# First: gem install susy
# require 'susy'

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

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'css'

set :js_dir, 'js'

set :images_dir, 'img'

set :build_dir, 'public_html'

#activate :livereload, :host => '192.168.0.100' # work
activate :livereload, :host => '192.168.1.99' # home
#config[:file_watcher_ignore] += [ /.idea\// ]

# Chrome needs a precision of 7 to round properly
Sass::Script::Number.precision = 7

# firesass support http://stackoverflow.com/a/10695532/1049688
compass_config do |compass|
  compass.sass_options = {:debug_info => true}
end

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :cache_buster

  # Use relative URLs
  # activate :relative_assets

  # Use asset hash
  activate :asset_hash

  # disable firesass support for build http://stackoverflow.com/a/10695532/1049688
  compass_config do |compass|
    compass.sass_options = {:debug_info => false}
  end

  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  activate :smusher

  # Or use a different image path
  # set :http_path, "/Content/images/"

  # https://github.com/follmann/middleman-favicon-maker
  activate :favicon_maker
end