Rails.application.routes.draw do
  devise_for :users
  root to: "mains#index"

  resources :todos do
    collection do
      get 'my_todos', to: 'todos#my_todos'
    end
  end

  resources :projects do
    collection do
      get 'my_projects', to: 'projects#my_projects'
    end
    resources :steps
  end
end