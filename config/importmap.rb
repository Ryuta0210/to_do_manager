# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "menu", to:"menu.js"
pin "add_delete_step", to:"add_delete_step.js"
pin "todo_search", to:"todo_search.js"
pin "new_todo", to:"new_todo.js"
pin "step_selection", to:"step_selection.js"
pin "completed", to:"completed.js"
pin "complete_release", to:"complete_release.js"
pin "delete_popup", to:"delete_popup.js"


