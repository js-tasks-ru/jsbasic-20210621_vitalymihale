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
