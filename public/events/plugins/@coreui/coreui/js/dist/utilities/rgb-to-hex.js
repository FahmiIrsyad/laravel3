/**
 * --------------------------------------------------------------------------
 * CoreUI (v2.0.0-rc.2): rgb-to-hex.js
 * Licensed under MIT (https://coreui.io/license)
 * --------------------------------------------------------------------------
 */

/* eslint-disable no-magic-numbers */
var rgbToHex = function rgbToHex(color) {
  if (typeof color === 'undefined') {
    throw new Error('Hex color is not defined');
  }

  var rgb = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

  if (!rgb) {
    throw new Error(color + " is not a valid rgb color");
  }

  var r = "0" + parseInt(rgb[1], 10).toString(16);
  var g = "0" + parseInt(rgb[2], 10).toString(16);
  var b = "0" + parseInt(rgb[3], 10).toString(16);
  return "#" + r.slice(-2) + g.slice(-2) + b.slice(-2);
};
//# sourceMappingURL=rgb-to-hex.js.map