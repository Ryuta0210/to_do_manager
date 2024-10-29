class AddStepsToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :steps, :json, default: {}
  end
end
