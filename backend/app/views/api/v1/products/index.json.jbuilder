json.products @products do |product|
  json.name product.name
  json.price product.price
  json.expiration_date product.expiration_date
  json.foreign_exchange do
    json.date product.foreign_exchange.date
    json.rates product.foreign_exchange.rates
  end
end
