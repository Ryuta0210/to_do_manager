class RemoveUserFromTodos < ActiveRecord::Migration[7.0]
  def change
    remove_reference :todos, :user, null: false, foreign_key: true
  end
end
