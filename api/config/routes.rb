Rails.application.routes.draw do
  get 'orders/index'
  get 'orders/create'
  get 'orders/show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :customers do
    resources :orders, only: [:index, :create, :show]
  end
end
