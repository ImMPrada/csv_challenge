Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :chunks, only: %i[create]
    end
  end

  mount ActionCable.server => '/cable'

  get 'up' => 'rails/health#show', as: :rails_health_check
end
