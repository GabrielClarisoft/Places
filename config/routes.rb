Rails.application.routes.draw do
  devise_for :users

  root to: 'home#index'

  get 'user/:username', to: 'user#show', as: 'user'

  get '/user/:username/avatar', to: 'user#edit_avatar', as: 'avatar'

  delete 'user/:username', to: 'user#destroy'

  patch '/user/:username/avatar', to: 'user#update_avatar'

  get '/users/:query', to: 'user#search_user'

  get '/find', to: 'user#find', as: 'find'

  # admin

  get 'admin', to: 'admin#show', as: 'admin'

  get 'admin/new_user', to: 'admin#new_user', as: 'admin_new_user'

  post 'admin/create_user', to: 'admin#create_user'

  resources :trips

  resources :photos
end