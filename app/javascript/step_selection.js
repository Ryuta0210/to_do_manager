document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('form');
  
  if (form) { // formが存在する場合のみ、処理を実行
    form.addEventListener('submit', function(event) {
  const stepsContainer = document.getElementById('steps_container');
  const stepBlocks = stepsContainer.querySelectorAll('.step_block');
  
  stepBlocks.forEach(step => {
    if (step.style.display === 'none') {
      step.querySelectorAll('input').forEach(input => {
        input.disabled = true;  // 非表示のステップのinputを無効化して送信しないようにする
      });
    }
  });
});
  }
})