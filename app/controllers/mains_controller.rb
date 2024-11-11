class MainsController < ApplicationController
  before_action :authenticate_user!
  def index
    today = Date.today
    current_user_todos = current_user.todos
    @todos =  current_user_todos
              .where("dead_date<=?", today)
              .order(completed: :asc, dead_date: :asc)
    @projects = current_user.projects
  end
end
