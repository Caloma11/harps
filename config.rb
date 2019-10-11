activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :sprockets

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

configure :build do
  # Use “pretty” URLs (without the `.html` suffix)
  activate :directory_indexes

  # Append hashes to compiled assets
  activate :asset_hash
  activate :minify_css
  # activate :minify_javascript
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
