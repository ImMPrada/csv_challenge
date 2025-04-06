module Api
  module V1
    class ProductsController < ApplicationController
      include Pagy::Backend

      def index
        apply_filters
        apply_sorting
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

      def apply_sorting
        if params[:sort_by_name].present?
          direction = params[:sort_by_name] == 'asc' ? :asc : :desc
          @scope = scope.order(name: direction)
        elsif params[:sort_by_expiration_date].present?
          direction = params[:sort_by_expiration_date] == 'asc' ? :asc : :desc
          @scope = scope.order(expiration_date: direction)
        end
      end
    end
  end
end
