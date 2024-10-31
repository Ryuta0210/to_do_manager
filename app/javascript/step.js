document.addEventListener("DOMContentLoaded", function() {
  let currentStep = 1;

  // Step 1のチェックボックスにイベントリスナーを追加
  addStepCheckboxEventListeners(1);

  // Step 追加ボタンのクリックイベント
  document.getElementById("add_step_button").addEventListener("click", function() {
    const nextStep = currentStep + 1;
    const stepBlock = document.getElementById(`step_${nextStep}`);
    
    if (stepBlock) {
      stepBlock.style.display = 'block';
      currentStep++;
      
      // Step プレビューの追加
      const projectFormPreview = document.getElementById("project_form_preview");
      const newStepImage = document.createElement("div");
      newStepImage.className = "step_image";
      newStepImage.id = `step_image_${nextStep}`;
      newStepImage.style.position = "relative";
      newStepImage.style.zIndex = -nextStep;
      newStepImage.innerHTML = `
        <img src="/assets/step_image" class="step_preview_step_image_after2">
        <div class="step_preview_step_number_after2">Step ${nextStep}</div>
        <div class="step_todo_titles_after2" id="step_${nextStep}_todo_titles"></div>
      `;
      projectFormPreview.appendChild(newStepImage);

      // 新しいStepのチェックボックスにイベントリスナーを追加
      addStepCheckboxEventListeners(nextStep);
    }
  });

  // Stepのチェックボックスが選択されたときにタイトルを追加する関数
  function updateStepTodoTitles(step) {
    const selectedTitles = [];
    const checkboxes = document.querySelectorAll(`input.step_todo_checkbox[data-step="${step}"]:checked`);

    // チェックされたToDoタイトルを収集
    checkboxes.forEach(checkbox => {
      const todoTitle = checkbox.nextElementSibling.textContent;
      selectedTitles.push(todoTitle);
    });

    // Step 1の場合は特別な処理
    if (step === 1) {
      const titlesContainer = document.getElementById("step_1_todo_titles");
      titlesContainer.innerHTML = ''; // 既存の内容をクリア

      selectedTitles.forEach((title, index) => {
        const titleElement = document.createElement('div');
        titleElement.textContent = title;
        titlesContainer.appendChild(titleElement);
      });
    } else {
      // 5行ごとにタイトルを分割して表示（Step 2以降）
      const titlesContainer = document.getElementById(`step_${step}_todo_titles`);
      titlesContainer.innerHTML = ''; // 既存の内容をクリア

      selectedTitles.forEach((title, index) => {
        const titleElement = document.createElement('div');
        titleElement.textContent = title; // タイトルを設定
        titlesContainer.appendChild(titleElement); // タイトルを追加
      });
    }

    // 15個以上のToDoが選択された場合に図形を変更
    const stepImage = document.querySelector(`#step_image_${step} img`);
    if (stepImage) {
      if (selectedTitles.length >= 11) {
        console.log("OK")
        stepImage.src = "/assets/step_image15"; // 図形を変更
        stepImage.classList.add("step_image15"); // クラス名を追加
      } else {
        stepImage.src = "/assets/step_image"; // 元の図形に戻す
        stepImage.classList.remove("step_image15"); // クラス名を削除
      }
    }
  }

  // 各ToDoチェックボックスにイベントリスナーを追加する関数
  function addStepCheckboxEventListeners(step) {
    const checkboxes = document.querySelectorAll(`input.step_todo_checkbox[data-step="${step}"]`);
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", function() {
        updateStepTodoTitles(step);
      });
    });
  }

  // Delete Step ボタンのクリックイベント
  document.getElementById("delete_step_button").addEventListener("click", function() {
    if (currentStep > 1) {
      const stepBlock = document.getElementById(`step_${currentStep}`);
      stepBlock.style.display = 'none';
      
      const stepImage = document.getElementById(`step_image_${currentStep}`);
      stepImage.remove();
      
      currentStep--;
    }
  });
});
