Rails.application.routes.draw do
  devise_for :users

  root to: 'home#index'

  get 'user/:username', to: 'user#show', as: 'user'

  get '/user/:username/avatar', to: 'user#edit_avatar', as: 'avatar'

  delete 'user/:username', to: 'user#destroy'

  patch '/user/:username/avatar', to: 'user#update_avatar'

  get '/users/:query', to: 'user#search_user'

  get '/find', to: 'user#find', as: 'find'

  resources :trips

  resources :photos
end