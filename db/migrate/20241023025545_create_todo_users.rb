class CreateTodoUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :todo_users do |t|
      t.references :todo, null:false, foreign_key:true
      t.references :user, null:false, foreign_key:true
      t.timestamps
    end
  end
end
