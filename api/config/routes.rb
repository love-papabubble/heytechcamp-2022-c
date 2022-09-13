Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :customers do
    resources :orders, only: [:index, :create, :show]
  end
  namespace :users do
    resources :orders, only: [:index, :show, :update]
  end
end
