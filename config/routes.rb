Rails.application.routes.draw do
  devise_for :users

  root to: 'home#index'

  get 'user/:username', to: 'user#show', as: 'user'

  resources :trips

end