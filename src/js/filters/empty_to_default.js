

let injection = ['emptyToDefault', [emptyToDefault]];

/// filter which replaces empty value (if it's empty) with provided default
function emptyToDefault() {
  return function (input, defaultVal) {
    if (!input) {
      return defaultVal;
    } else {
      return input;
    }
  }
}

export default injection;
