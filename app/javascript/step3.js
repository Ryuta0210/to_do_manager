document.addEventListener("DOMContentLoaded", function() {
  // すべての検索ボックスを取得
  const searchInputs = document.querySelectorAll(".todo-search-input");

  searchInputs.forEach(input => {
    // Enterキーによる画面遷移を防ぐ
    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault(); // 送信をキャンセル
      }
    });

    input.addEventListener("input", function() {
      console.log("OK");
      const step = this.dataset.step; // data-stepの値を取得
      const query = this.value.toLowerCase(); // 検索クエリを小文字で取得
      const todos = document.querySelectorAll(`#step_${step} .step_todo_checkbox`);

      todos.forEach(todo => {
        const label = todo.nextElementSibling; // チェックボックスのラベルを取得
        const title = label.textContent.toLowerCase();

        if (title.includes(query)) {
          todo.parentElement.style.display = ""; // 検索条件に一致した場合は表示
        } else {
          todo.parentElement.style.display = "none"; // 一致しない場合は非表示
        }
      });
    });
  });
});
