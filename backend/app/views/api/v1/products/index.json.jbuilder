json.products @products do |product|
  json.name product.name
  json.price product.price
  json.description product.expiration_date
end
