const age = document.querySelector("#age");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const activity = document.querySelector("#activity");
const calculateBtn = document.querySelector(".calculate-btn");
const calories = document.querySelector(".calories");
const tdeeCalories = document.querySelector(".tdee-calories");
const errorMessage = document.querySelector(".error-msg");

const calculateBMR = (w, h, a, gender) => {
  if (gender === "male") {
    return 10 * w + 6.25 * h - 5 * a + 5;
  }
  return 10 * w + 6.25 * h - 5 * a - 161;
};

calculateBtn.addEventListener("click", () => {
  const aVal = parseFloat(age.value);
  const hVal = parseFloat(height.value);
  const wVal = parseFloat(weight.value);

  if (!aVal || aVal <= 0 || !hVal || hVal <= 0 || !wVal || wVal <= 0) {
    if (errorMessage) errorMessage.classList.add("active");
    return;
  }

  if (errorMessage) errorMessage.classList.remove("active");

  const genderValue = document.querySelector("input[name='gender']:checked").value;
  const bmr = calculateBMR(wVal, hVal, aVal, genderValue);
  const activityMultiplier = parseFloat(activity.value) || 1.2;
  const tdee = Math.round(bmr * activityMultiplier);

  if (calories) calories.textContent = Math.round(bmr).toLocaleString("en-US");
  if (tdeeCalories) tdeeCalories.textContent = tdee.toLocaleString("en-US");
});
