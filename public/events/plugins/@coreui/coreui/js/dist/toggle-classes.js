/**
 * --------------------------------------------------------------------------
 * CoreUI (v2.0.0-rc.2): toggle-classes.js
 * Licensed under MIT (https://coreui.io/license)
 * --------------------------------------------------------------------------
 */
var removeClasses = function removeClasses(classNames) {
  return classNames.map(function (className) {
    return document.body.classList.contains(className);
  }).indexOf(true) !== -1;
};

var toggleClasses = function toggleClasses(toggleClass, classNames) {
  var breakpoint = classNames.indexOf(toggleClass);
  var newClassNames = classNames.slice(0, breakpoint + 1);

  if (removeClasses(newClassNames)) {
    newClassNames.map(function (className) {
      return document.body.classList.remove(className);
    });
  } else {
    document.body.classList.add(toggleClass);
  }
};
//# sourceMappingURL=toggle-classes.js.map