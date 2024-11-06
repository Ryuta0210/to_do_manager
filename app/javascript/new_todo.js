document.addEventListener("DOMContentLoaded", function() {
  const todoPopup = document.getElementById("todo-popup");
  const newTodoButton = document.getElementById("new_todo");
  const closePopupButton = document.querySelector(".close-popup");
  const todoForm = document.getElementById("new-todo-form");

  // ポップアップを表示
  newTodoButton.addEventListener("click", () => {
    todoPopup.style.display = "block";
  });

  // ポップアップを閉じる
  closePopupButton.addEventListener("click", () => {
    todoPopup.style.display = "none";
  });

  // ポップアップ外をクリックした場合も閉じる
  window.addEventListener("click", (e) => {
    if (e.target === todoPopup) {
      todoPopup.style.display = "none";
    }
  });

  // フォーム送信時の非同期処理
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(todoForm);
    const XHR = new XMLHttpRequest();
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    XHR.open("POST", "/todos", true);
    XHR.setRequestHeader("X-CSRF-Token", csrfToken);
    XHR.responseType = "json";

    XHR.onload = () => {
      if (XHR.status === 200) {
        // フォームの内容をリセット
        todoForm.reset();
        // ポップアップを閉じる
        todoPopup.style.display = "none";
      } else {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      }
    };

    XHR.send(formData);
  });
});
