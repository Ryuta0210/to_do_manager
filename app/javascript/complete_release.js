window.addEventListener("load", ()=>{
  const releaseButton = document.getElementById("main_view_done_relerease_button") 
  if (!releaseButton) return

  releaseButton.addEventListener("click", (e)=>{
    e.preventDefault

    const selectedTodos = []
    const checkBoxes = document.querySelectorAll('input[type="checkbox"][id^="todo_"]')

    checkBoxes.forEach((checkBox)=>{
      if (checkBox.checked){
        selectedTodos.push(checkBox.id.replace("todo_",""))
      }
    })

    const formData = new FormData()
    formData.append("selected_todos", JSON.stringify(selectedTodos))

    const XHR = new XMLHttpRequest()
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    XHR.open("POST", "/todos/release_complete", true)
    XHR.setRequestHeader("X-CSRF-Token", csrfToken);
    XHR.responseType = "json"
    XHR.onload = () => {
      if (XHR.status === 200) {
        const updatedTodos = XHR.response; 
        updatedTodos.forEach(todo => {
          const todoRow = document.querySelector(`#todo_${todo.id}`).closest("tr");
          const doneCell = todoRow.querySelector(".todo_done");
          doneCell.textContent = "";
          todoRow.style.backgroundColor = "white";

        });
      } else {
        console.error("更新に失敗しました");
      }
    };

    XHR.send(formData)

  })
})