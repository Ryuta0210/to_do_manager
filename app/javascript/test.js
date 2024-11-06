document.getElementById("test_button").addEventListener("click", function(e){
  e.preventDefault()
  const titleForm = document.querySelector(".project_form_a")
  titleForm.innerHTML = ``
  const projectNameForm = `
    <div class="project_form_a">
      <label for= "project_name">タイトルだよん</label>
      <input type="text" class="project_name" id= "project_name" name="project_step_form[name]">
    </div>
    `
  titleForm.insertAdjacentHTML("beforeend", projectNameForm)
})