module Api
  module V1
    class ProductsController < ApplicationController
      include Pagy::Backend

      def index
        @pagy, @products = pagy(scope)
      end

      private

      def scope
        @scope ||= Product.all
      end
    end
  end
end
