Rails.application.routes.draw do
  get 'me/index'
  get 'me_controller/index'
  post '/signin', to: 'user_token#create'
  post 'user_token' => 'user_token#create'
  get 'user/create'
  get 'todos', to: 'todo#index', format: :json
  post 'todos', to: 'todo#create', format: :json
  put 'todos/:id', to: 'todo#update', format: :json
  delete 'todos/:id', to: 'todo#destroy', format: :json
  get '/', to: 'static_page#index'
  get '/signup', to: 'static_page#index', format: :json
  post '/signup', to: 'user#create'
  get '/signin', to: 'static_page#index'
  get '/me', to: 'me#index', format: :json
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
