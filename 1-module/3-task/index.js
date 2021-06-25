function ucFirst(str) {
  if (Boolean(str) === false) {
    return '';
  } else {
    return str[0].toUpperCase() + str.substring(1, str.length);
  }
}
