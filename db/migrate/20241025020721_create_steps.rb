class CreateSteps < ActiveRecord::Migration[7.0]
  def change
    create_table :steps do |t|
      t.integer :step_number, null: false
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
