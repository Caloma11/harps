activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

require 'sprockets/es6'
activate :sprockets do |s|
  s.supported_output_extensions << '.es6'
end


page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

configure :build do
  # Use “pretty” URLs (without the `.html` suffix)
  activate :directory_indexes

  # Append hashes to compiled assets
  activate :minify_css
  activate :asset_hash
  activate :relative_assets
  set :relative_links, true
end

activate :deploy do |deploy|
  deploy.build_before = true
  deploy.deploy_method = :git
end

helpers do

end
