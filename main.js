const age = document.querySelector(".bmr-calculator .controls form .age-section #age");
const height = document.querySelector(".bmr-calculator .controls form .height-section #height");
const weight = document.querySelector(".bmr-calculator .controls form .weight-section #weight");
const activity = document.querySelector("#activity");
const calculateBtn = document.querySelector(".bmr-calculator .result .calculate-btn");
const calories = document.querySelector(".bmr-calculator .result .result-msg .calories");
const tdeeCalories = document.querySelector(".bmr-calculator .result .result-msg .tdee-calories");
const errorMessage = document.querySelector(".bmr-calculator .result .error-msg");

// Mifflin-St Jeor equation to calculate BMR (Basal Metabolic Rate)
const calculateBMR = (weight, height, age, gender) => {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
};

calculateBtn.addEventListener("click", () => {
  // Validate inputs
  if (
    !age.value || age.classList.contains("invalid") ||
    !height.value || height.classList.contains("invalid") ||
    !weight.value || weight.classList.contains("invalid")
  ) {
    errorMessage.classList.add("active");
    return;
  }

  errorMessage.classList.remove("active");

  const genderValue = document.querySelector(".bmr-calculator form input[name='gender']:checked").value;
  const bmr = calculateBMR(parseFloat(weight.value), parseFloat(height.value), parseFloat(age.value), genderValue);
  
  // Calculate total daily calories using selected activity multiplier
  const activityMultiplier = parseFloat(activity.value) || 1.2;
  const tdee = Math.round(bmr * activityMultiplier);

  // Display rounded values
  calories.innerHTML = Math.round(bmr).toLocaleString("en-US");
  if (tdeeCalories) {
    tdeeCalories.innerHTML = tdee.toLocaleString("en-US");
  }
});

// Input Validation
const validateInput = (input) => {
  input.addEventListener("input", (e) => {
    let val = e.target.value;
    if (!val || isNaN(val) || val <= 0) {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
  });
};

validateInput(age);
validateInput(height);
validateInput(weight);
