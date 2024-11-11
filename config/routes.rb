Rails.application.routes.draw do
  devise_for :users
  root to: "mains#index"

  resources :todos do
    collection do
      get 'my_todos', to: 'todos#my_todos'
      post "register_complete", to: 'todos#register_complete'
      post "register_complete", to: 'todos#register_complete'
      post "release_complete", to: 'todos#release_complete'
      delete "destroy_selected", to: 'todos#destroy_selected'
    end
  end

  resources :projects do
    collection do
      get 'my_projects', to: 'projects#my_projects'
    end
    resources :steps
  end
end