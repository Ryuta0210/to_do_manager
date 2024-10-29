class TodosController < ApplicationController
  def index
  end

  def my_todos
    @todos = current_user.todos
  end

  def new
    @todo = Todo.new
  end

  def create
    @todo = Todo.new(todo_params)
    @todo.save
    params[:room][:user_ids].each do |user_id|
      TodoUser.create(todo_id: @todo.id, user_id: user_id)
    
    end
  end

  def show
    @todo = Todo.find(params[:id])
  end

  private
  def todo_params
    params.require(:todo).permit(:title, :content, :genre_id, :start_date,:dead_date)
  end
end
