class Todo < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :genre
  
  has_many :todo_users
  has_many :users, through: :todo_users
  has_many :step_todos
  has_many :steps, through: :step_todos
end
