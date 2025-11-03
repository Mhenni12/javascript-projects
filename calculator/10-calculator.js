let calculation = localStorage.getItem('calculation') || '';
displayCalculation();

function updateCalculation(value) {
  calculation += value;
  displayCalculation();
  saveCalculation();
}

// Optional: you can also create a function in order
// to reuse this code.
function saveCalculation() {
  localStorage.setItem('calculation', calculation);
}

function displayCalculation() {
  document.querySelector('.js-display').innerHTML = calculation;
}