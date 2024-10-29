class Step < ApplicationRecord
  belongs_to :project
  has_many :step_todos
  has_many :todos, through: :step_todos
end
