document.addEventListener("DOMContentLoaded", function() {
  let currentStep = 1;
  let todoIds = {}; // 送信用のtodo_idsオブジェクト

  addStepCheckboxEventListeners(1);

  const addStepButton = document.getElementById("add_step_button");
  if (addStepButton) {
    addStepButton.addEventListener("click", function() {
      const nextStep = currentStep + 1;
      const stepBlock = document.getElementById(`step_${nextStep}`);
      
      if (stepBlock) {
        stepBlock.style.display = 'block';
        currentStep++;
        addStepCheckboxEventListeners(nextStep);
      }
    });
  }

  function updateStepTodoTitles(step) {
    const selectedTitles = [];
    const checkboxes = document.querySelectorAll(`input.step_todo_checkbox[data-step="${step}"]:checked`);
    todoIds[step] = [];

    checkboxes.forEach(checkbox => {
      selectedTitles.push(checkbox.nextElementSibling.textContent);
      todoIds[step].push(checkbox.value);
    });

    const titlesContainer = document.getElementById(`step_${step}_todo_titles`);
    titlesContainer.innerHTML = '';
    selectedTitles.forEach(title => {
      const titleElement = document.createElement('div');
      titleElement.textContent = title;
      titlesContainer.appendChild(titleElement);
    });
  }

  const projectForm = document.querySelector(".project_form form");  // クラス名を使用してフォーム要素を取得
  if (projectForm) {
    projectForm.addEventListener("submit", function(event) {
      console.log("送信前のtodo_ids:", todoIds);

      const todoIdsInput = document.createElement("input");
      todoIdsInput.type = "hidden";
      todoIdsInput.name = "project_step_form[todo_ids]";
      todoIdsInput.value = JSON.stringify(todoIds);
      projectForm.appendChild(todoIdsInput);

      console.log("todo_idsフィールドが追加されました:", todoIdsInput);
    });
  }

  function addStepCheckboxEventListeners(step) {
    const checkboxes = document.querySelectorAll(`input.step_todo_checkbox[data-step="${step}"]`);
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        updateStepTodoTitles(step);
      });
    });
  }

  // update-todoボタンをクリックした際に最新のTodoリストを取得・表示する処理
  document.querySelectorAll('.update-todo').forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();

      const step = this.dataset.step;
      const checkboxesContainer = document.querySelector(`#step_${step} .checkbox`);

      checkboxesContainer.innerHTML = ''; // 既存のチェックボックスをクリア

      fetch('/todos', {
        method: 'GET'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        data.todos.forEach(todo => {
          const checkboxHTML = `
            <div class="checkbox">
              <input type="checkbox" name="project_step_form[todo_ids][${step}][]" value="${todo.id}" id="step_${step}_todo_${todo.id}" class="step_todo_checkbox" data-step="${step}">
              <label for="step_${step}_todo_${todo.id}">${todo.title}</label>
            </div>
          `;
          checkboxesContainer.insertAdjacentHTML('beforeend', checkboxHTML);
        });

        // チェックボックスイベントリスナーを再設定
        addStepCheckboxEventListeners(step);
      })
      .catch(error => console.error('Error fetching todos:', error));
    });
  });
});
