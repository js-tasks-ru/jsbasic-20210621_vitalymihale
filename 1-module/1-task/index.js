function factorial(n) {
  let factorialResult = 1;
    for (let i = 0; i < n; i++) {
      factorialResult *= (n - i)
    }
  return factorialResult;
}

