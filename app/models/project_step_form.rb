class ProjectStepForm
  include ActiveModel::Model
  attr_accessor :name, :description, :step_number, :todo_ids, :user_ids

  def save
    project = Project.new(name: name, description: description, user_ids: user_ids)

    if project.save
      step_number.each do |number|
        step = Step.create(step_number: number, project: project)
        step.todo_ids = todo_ids[number.to_s] if todo_ids[number.to_s].present?
      end
      true
    else
      false
    end
  end
end
