export function throttle(func, ms) {
  let isBlocked = false;
  let savedArgs;
  let savedThis;

  function throttled(...args) {
    if (isBlocked) {
      savedArgs = args;
      savedThis = this;
      return;
    }

    func.apply(this, args);

    isBlocked = true;

    setTimeout(() => {
      isBlocked = false;

      if (savedArgs) {
        throttled.apply(savedThis, savedArgs);

        savedArgs = null;
        savedThis = null;
      }
    }, ms);
  }

  return throttled;
}
