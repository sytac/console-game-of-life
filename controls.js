document.addEventListener('DOMContentLoaded', function() {
  const speedInput = document.querySelector('#speed');

  speedInput.value = state.speed;

  speedInput.addEventListener('keyup', function(event) {
    life.setState(state.speed = event.target.value)
  })
});
