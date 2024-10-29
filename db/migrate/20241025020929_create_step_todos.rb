class CreateStepTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :step_todos do |t|
      t.references :step, null: false, foreign_key: true # Stepsテーブルへの外部キー
      t.references :todo, null: false, foreign_key: true # Todosテーブルへの外部キー

      t.timestamps
    end
  end
end
