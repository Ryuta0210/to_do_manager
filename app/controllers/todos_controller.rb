class TodosController < ApplicationController
  def index
    @todos = Todo.all.map { |todo| { id: todo.id, title: todo.title.truncate(10, omission: '...') } }
    render json: { todos: @todos.as_json(only: [:id, :title]) }
    @calendar
  end

  def update_completed
    selected_todos = JSON.parse(params[:selected_todos])
    todos = Todo.where(id: selected_todos)
    
    todos.each do |todo|
    todo.update(completed: 1)
    end
    
    render json: todos
  end

  def my_todos
    @todos = current_user.todos
  end

  def new
    @todo = Todo.new
  end

  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      # ユーザーIDの配列を順に処理し、TodoUserレコードを作成
      if params[:room][:user_ids].present?
        params[:room][:user_ids].each do |user_id|
          TodoUser.create(todo_id: @todo.id, user_id: user_id)
        end
      end
      render json: { todo: @todo, message: "Todo created successfully" }, status: :created
    else
      render json: { error: @todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @todo = Todo.find(params[:id])
  end

  private

  def todo_params
    params.require(:todo).permit(:title, :content, :start_date, :dead_date, :user_id, :genre_id)
  end
end
