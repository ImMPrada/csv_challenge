module Api
  module V1
    class ChunksController < ApplicationController
      def index
        @products = Product.all
      end
    end
  end
end
