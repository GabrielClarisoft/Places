Rails.application.routes.draw do
  devise_for :users

  # devise_scope :user
  # do
  #   post 'login', to: 'devise/sessions#new'
  # end

  root to: 'home#index'

  get 'user/:username', to: 'user#show', as: 'profile'
end