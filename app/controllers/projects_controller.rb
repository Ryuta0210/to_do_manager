class ProjectsController < ApplicationController
  def my_projects
    @projects = current_user.projects
  end

  def new
    @project_step = ProjectStepForm.new
  end

  def create
    @project_step = ProjectStepForm.new(project_params)

    if @project_step.save
      redirect_to my_projects_projects_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @project = Project.find(params[:id])
  end

  private

  def project_params
    params.require(:project_step_form).permit(:name, :description, step_number: [], user_ids: [], todo_ids: {})
  end
end
