json.products @products do |product|
  json.name product.name
  json.price product.price
  json.expiration_date product.expiration_date
end
