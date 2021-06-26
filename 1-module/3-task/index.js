function ucFirst(str) {
  if (!str) {
    return '';
  }
  return str[0].toUpperCase() + str.substring(1, str.length);
}
