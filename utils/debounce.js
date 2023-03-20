function debounce(func, ms) {
  let timeout = null;

  return function debounced(...args) {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, ms);
  };
}
