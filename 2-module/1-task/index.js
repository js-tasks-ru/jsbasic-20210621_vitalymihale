function sumSalary(salaries) {
  let sumOfSalaries = 0;
  for (const key in salaries) {
    if (typeof salaries[key] === 'number' && !isNaN(salaries[key]) && isFinite(salaries[key])) {
      sumOfSalaries += salaries[key];
    }
  }
  return sumOfSalaries;
}
