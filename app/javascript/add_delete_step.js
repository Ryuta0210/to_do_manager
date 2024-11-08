document.addEventListener("DOMContentLoaded", function() {
  let currentStep = 1;
  const todoIds = {};


  addStepCheckboxEventListeners(1);

  const addStepButton = document.getElementById("add_step_button");
  const deleteStepButton = document.getElementById("delete_step_button");
  const projectFormPreview = document.getElementById("project_form_preview");

  if (addStepButton) {
    addStepButton.addEventListener("click", function() {
      const nextStep = currentStep + 1;
      const stepBlock = document.getElementById(`step_${nextStep}`);
      
      if (stepBlock) {
        stepBlock.style.display = 'block';
        currentStep++;
        addStepCheckboxEventListeners(nextStep);
      }

      const stepImage= document.getElementById("step_image_1")
      const stepImageHtml=`
        <div class="step_image" id="step_image_${currentStep}" style="position: relative; z-index: ${-currentStep};">
          <img src="/assets/step_image.png" class="step_preview_step_image_after2" />
          <div class="step_preview_step_number_after2">Step ${currentStep}</div>
          <div class="step_todo_titles_after2" id="step_${currentStep}_todo_titles"></div>
        </div>
      `
      projectFormPreview.insertAdjacentHTML("beforeend", stepImageHtml);
    });
  }
  if (deleteStepButton) {
    deleteStepButton.addEventListener("click", function() {
      if (currentStep > 1) {

        const stepBlock = document.getElementById(`step_${currentStep}`);
        if (stepBlock) {
          stepBlock.style.display = 'none';

          const checkboxes = stepBlock.querySelectorAll("input.step_todo_checkbox");
          checkboxes.forEach(checkbox => {
          checkbox.checked = false;
          });

          const titlesContainer = document.getElementById(`step_${currentStep}_todo_titles`);
          if (titlesContainer) {
          titlesContainer.innerHTML = '';
          }
        }

        const stepImage = document.getElementById(`step_image_${currentStep}`);
        if (stepImage) {
          stepImage.style.display = 'none';
        }

        currentStep--;
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

  function addStepCheckboxEventListeners(step) {
    const checkboxes = document.querySelectorAll(`input.step_todo_checkbox[data-step="${step}"]`);
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        updateStepTodoTitles(step);
      });
    });
  }

  document.querySelectorAll('.update-todo').forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();

      const step = this.dataset.step;
      const checkboxesContainer = document.querySelector(`#step_${step} .checkboxes`);

      const currentSelectedTodos = todoIds[step] || [];

      checkboxesContainer.innerHTML = '';

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
          const isChecked = currentSelectedTodos.includes(todo.id.toString()) ? 'checked' : ''; // 以前の選択状態を適用
          const checkboxHTML = `
            <div class="checkbox">
              <input type="checkbox" name="project_step_form[todo_ids][${step}][]" value="${todo.id}" id="step_${step}_todo_${todo.id}" class="step_todo_checkbox" data-step="${step}" ${isChecked}>
              <label for="step_${step}_todo_${todo.id}">${todo.title}</label>
            </div>
          `;
          checkboxesContainer.insertAdjacentHTML('beforeend', checkboxHTML);
        });

        addStepCheckboxEventListeners(step);
      })
      .catch(error => console.error('Error fetching todos:', error));
    });
  });
});
