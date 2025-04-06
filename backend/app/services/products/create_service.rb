module Products
  class CreateService
    def initialize(params, foreign_exchange_service)
      @params = params
      @foreign_exchange_service = foreign_exchange_service
    end

    def call!
      product = Product.new(params)
      product.foreign_exchange = foreign_exchange_service.foreign_exchange
      product.save!

      product
    end

    private

    attr_reader :params, :foreign_exchange_service
  end
end
