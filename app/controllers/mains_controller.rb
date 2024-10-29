class MainsController < ApplicationController
  before_action :authenticate_user!
  def index
    @todos = current_user.todos
    @projects = current_user.projects
  end
end
