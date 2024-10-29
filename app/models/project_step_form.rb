class ProjectStepForm
  include ActiveModel::Model
  attr_accessor :name, :description, :step_number, :todo_ids, :user_ids

  def save
    project = Project.new(name: name, description: description)
    project.user_ids = user_ids

    if project.save
      # Stepを複数作成するためにループを使用
      step_number.each do |number|
        step = Step.new(step_number: number, project_id: project.id)
        if step.save

          step.todo_ids = todo_ids[number.to_s] # 各ステップに対応するtodo_idsを指定する
          step.save
        else
          project.destroy
          return false
        end
      end
      return true
    else
      return false
    end
  end
end