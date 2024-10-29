# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_10_25_020929) do
  create_table "project_todos", charset: "utf8", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.bigint "todo_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_project_todos_on_project_id"
    t.index ["todo_id"], name: "index_project_todos_on_todo_id"
  end

  create_table "project_users", charset: "utf8", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_project_users_on_project_id"
    t.index ["user_id"], name: "index_project_users_on_user_id"
  end

  create_table "projects", charset: "utf8", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "step_todos", charset: "utf8", force: :cascade do |t|
    t.bigint "step_id", null: false
    t.bigint "todo_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["step_id"], name: "index_step_todos_on_step_id"
    t.index ["todo_id"], name: "index_step_todos_on_todo_id"
  end

  create_table "steps", charset: "utf8", force: :cascade do |t|
    t.integer "step_number", null: false
    t.bigint "project_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_steps_on_project_id"
  end

  create_table "todo_users", charset: "utf8", force: :cascade do |t|
    t.bigint "todo_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["todo_id"], name: "index_todo_users_on_todo_id"
    t.index ["user_id"], name: "index_todo_users_on_user_id"
  end

  create_table "todos", charset: "utf8", force: :cascade do |t|
    t.string "title", null: false
    t.text "content"
    t.string "genre_id", null: false
    t.date "start_date"
    t.date "dead_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "family_name", null: false
    t.string "first_name", null: false
    t.string "full_name", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "project_todos", "projects"
  add_foreign_key "project_todos", "todos"
  add_foreign_key "project_users", "projects"
  add_foreign_key "project_users", "users"
  add_foreign_key "step_todos", "steps"
  add_foreign_key "step_todos", "todos"
  add_foreign_key "steps", "projects"
  add_foreign_key "todo_users", "todos"
  add_foreign_key "todo_users", "users"
end
