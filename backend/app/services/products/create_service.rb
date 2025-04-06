module Products
  class CreateService
    def initialize(params)
      @params = params
    end

    def call!
      Product.create!(@params)
    end
  end
end
