class StepTodo < ApplicationRecord
  belongs_to :step
  belongs_to :todo
end
