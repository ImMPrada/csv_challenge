module Api
  module V1
    class ProductsController < ApplicationController
      def index
        @products = Product.all
      end
    end
  end
end
