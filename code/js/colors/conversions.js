"use strict";

(() => {

  const rgbToHsv = (r, g, b, a) => { //https://gist.github.com/mjackson/5311256
    a /= 255, r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    let d = max - min;
    s = max == 0 ? 0 : d / max;
    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [h, s, v, a];
  }; //rgbToHsv

  const rgbToHsl = (r, g, b, a) => { //https://gist.github.com/mjackson/5311256
    a /= 255, r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [h, s, l, a];
  }; //rgbToHsl

  const normalize = (value, scale) => (value * scale).toFixed(definitionSet.colorSpace.fixedPrecision);

  const hsToString = value =>
    definitionSet.colorSpace.formatHs(
      normalize(value[0], 360),
      normalize(value[1], 100),
      normalize(value[2], 100),
      normalize(value[3], 100));

  const rgbToCss = function(colorName, color) {
    const rgba = this.parseToRgba(color);
    const hsl = hsToString(conversionSet.rgbToHsl(rgba[0], rgba[1], rgba[2], rgba[3]));
    rgba[3] /= 255;
    return definitionSet.colorSpace.formatColor(
      colorName,
      color,
      definitionSet.colorSpace.formatRgba(rgba),
      hsl
    );
  } //rgbToCss

  conversionSet.rgbToHsl = rgbToHsl;
  conversionSet.rgbToCss = rgbToCss;

})();
