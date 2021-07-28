const {
  add,
  calculateTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} = require('../src/math');

describe('math test', () => {
  test('should calculate total with tip', () => {
    const total = calculateTip(10, 0.3);
    expect(total).toBe(13);
    expect(total).toMatchSnapshot();
  });

  test('should convert 0 C to 32 F', () => {
    const temp = celsiusToFahrenheit(0);
    expect(temp).toBe(32);
    expect(temp).toMatchSnapshot();
  });

  test('should convert 32 F to 0 C', () => {
    const temp = fahrenheitToCelsius(32);
    expect(temp).toBe(0);
    expect(temp).toMatchSnapshot();
  });
});

describe('Async test demo', () => {
  test('first async test', (done) => {
    setTimeout(() => {
      expect(1).toBe(1);
      expect(1).toMatchSnapshot();
      done();
    }, 2000);
  });

  test('should add two numbers', (done) => {
    add(1, 2).then((sum) => {
      expect(sum).toBe(3);
      expect(sum).toMatchSnapshot();
      done();
    });
  });

  test('should add two numbers with async await', async () => {
    const sum = await add(2, 3);
    expect(sum).toBe(5);
  });

  test('should throw error when a < 0', async () => {
    try {
      await add(-1, 1);
    } catch (error) {
      expect(error).toEqual(new Error('Numbers must be non-negative'));
    }
  });
});
