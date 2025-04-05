Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :chunks, only: %i[create]
      resources :csv_uploads, only: [] do
        get :progress, on: :member
      end

      resources :products, only: [index]
    end
  end

  get 'up' => 'rails/health#show', as: :rails_health_check
end
