const sum = require('../src/utils/sum');

describe('sum test', () => {
  test('should return 5 when a = 2, b = 3', () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
    expect(result).toMatchSnapshot();
  });
});
