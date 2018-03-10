

let injection = ['trust', ['$sce', trust]];

/// filter which replaces empty value (if it's empty) with provided default
function trust($sce) {
  return function (value, type) {
    // Defaults to treating trusted text as `html`
    return $sce.trustAs($sce[type] || $sce.HTML, value);
  }
}

export default injection;
