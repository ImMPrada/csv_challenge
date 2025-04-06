module Api
  module V1
    class ProductsController < ApplicationController
      include Pagy::Backend

      def index
        apply_filters
        @pagy, @products = pagy(scope)
      end

      private

      def scope
        @scope ||= Product.all
      end

      def filter_params
        %w[name]
      end

      def apply_filters
        filter_params.each do |param|
          next if params[param].blank?

          @scope = scope.send("by_#{param}", params[param])
        end
      end
    end
  end
end
