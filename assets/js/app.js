const day = document.querySelector('[data-day]')
const month = document.querySelector('[data-month]')
const year = document.querySelector('[data-year]')

const form = document.querySelector('.form');
const submitBtn = document.querySelector('.form-btn');


const showError = function (input, errorMessage) {
  const formControl = input.parentElement;
  formControl.classList.add('error')

  const small = formControl.querySelector('small');
  small.innerText = errorMessage;
}


const removeError = function (input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error')
}


const checkValidInput = function (input, minValue, maxValue, errorMessage) {
  if (+input.value < minValue || +input.value > maxValue) {
    showError(input, errorMessage);
  } else {
    removeError(input);
  }
}

const checkValidDay = function (input) {
  const daysInMonth = new Date(+year.value, +month.value, 0).getDate();
  checkValidInput(input, 1, daysInMonth, 'Must be a valid day');
}

const checkValidMonth = function (input) {
  checkValidInput(input, 1, 12, 'Must be a valid month');
}

const checkValidYear = function (input) {
  checkValidInput(input, 0, new Date().getFullYear(), 'Must be a valid year');
}


// Check fields Required 
const checkRequired = function (inputArr) {
  inputArr.forEach((input) => {
    if (+input.value === 0) {
      showError(input, 'This field is required');
    } else if (checkValidDay && checkValidMonth && checkValidYear) {
      checkValidDay(day);
      checkValidMonth(month);
      checkValidYear(year);
    } else {
      removeError(input);
    }
  })
}

const processData = function (e) {
  e.preventDefault();

  let isValid = true;

  // check 
  checkRequired([day, month, year])

  const inputs = e.target.elements;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].parentElement.classList.contains('error')) {
      isValid = false;
      break
    }
  }

  if (isValid) calculateAge();

}

const calculateAge = function (e) {

  // Calculate the values
  const birthDate = new Date(year.value, month.value - 1, day.value);
  const ageInMilliseconds = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageInMilliseconds);

  // Get specific age number
  const years = ageDate.getUTCFullYear() - 1970;
  const months = ageDate.getUTCMonth();
  const days = ageDate.getUTCDate() - 1;

  // Print result
  const resultYears = document.querySelector('#result-years')
  const resultMonths = document.querySelector('#result-months')
  const resultDays = document.querySelector('#result-days')

  resultYears.innerHTML = years;
  resultMonths.innerHTML = months;
  resultDays.innerHTML = days;

}

form.addEventListener('submit', processData);


