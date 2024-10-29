class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.string :title, null:false
      t.text :content
      t.string :genre_id, null:false
      t.date :start_date
      t.date :dead_date, null:false
      t.references :user, null:false, foreign_key:true
      t.timestamps
    end
  end
end
