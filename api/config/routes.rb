Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :customers do
    resources :orders, only: %i[index create show]
    resources :items, only: [:index]
  end
  namespace :users do
    resources :orders, only: %i[index show update]
  end
end
