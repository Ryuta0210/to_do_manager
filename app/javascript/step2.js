document.querySelector('form').addEventListener('submit', function(event) {
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