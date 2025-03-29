Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :csv_uploads, only: [:create]
    end
  end
end 