str = '1, -5.8 или 10, хотя 34 + -5.3 и 73'

function getMinMax(str) {
  const array = str
      .split(',')
      .join(' ')
      .split(' ')
      .map(item => +item)
      .filter(item => !isNaN(item) && item !== 0)
      .sort((a, b) => a - b)
  return {min: array[0], max: array[array.length - 1] }
}

console.log(getMinMax(str))
