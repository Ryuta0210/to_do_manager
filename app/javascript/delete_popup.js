window.addEventListener("load", () => {
  const todoDeleteButton = document.getElementById("main_view_delete_button");
  const mainViewPopup = document.getElementById("main_view_popup");
  const closePopupButton = document.querySelector(".close-popup");
  const deleteYes = document.getElementById("delete_yes");
  const deleteNo = document.getElementById("delete_no");

  if (!todoDeleteButton) return;

  todoDeleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    mainViewPopup.style.display = "flex";

    const selectedTodos = [];
    const checkBoxes = document.querySelectorAll('input[type="checkbox"][id^="todo_"]');
    checkBoxes.forEach((checkBox) => {
      if (checkBox.checked) {
        selectedTodos.push(checkBox.id.replace("todo_", ""));
      }
    });

    deleteYes.addEventListener("click", () => {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const formData = new FormData();
      formData.append("selected_todos", JSON.stringify(selectedTodos));

      const XHR = new XMLHttpRequest();
      XHR.open("DELETE", "/todos/destroy_selected", true);
      XHR.setRequestHeader("X-CSRF-Token", csrfToken); // CSRFトークンを設定
      XHR.setRequestHeader("Content-Type", "application/json"); // JSON形式で送信

      XHR.onload = () => {
        if (XHR.status === 200) {
          mainViewPopup.style.display = "none";
          selectedTodos.forEach(id => {
            const row = document.getElementById(`todo_${id}`).closest("tr");
            if (row) row.remove();
          });
        } else {
          console.error("削除に失敗しました");
        }
      };

      XHR.send(JSON.stringify({ selected_todos: selectedTodos })); // JSON形式で送信
    });
  });

  closePopupButton.addEventListener("click", () => {
    mainViewPopup.style.display = "none";
  });

  deleteNo.addEventListener("click", () => {
    mainViewPopup.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === mainViewPopup) {
      mainViewPopup.style.display = "none";
    }
  });
});
