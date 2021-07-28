const calculateTip = (total, tipPercent) => {
  const tip = total * tipPercent;

  return total + tip;
};

const fahrenheitToCelsius = (temp) => (temp - 32) / 1.8;

const celsiusToFahrenheit = (temp) => temp * 1.8 + 32;

const add = (a, b) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject(new Error('Numbers must be non-negative'));
      }

      return resolve(a + b);
    }, 2000);
  });

module.exports = {
  add,
  calculateTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
};
