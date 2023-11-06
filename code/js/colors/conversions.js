"use strict";

(() => {

    /*
    const rgbToHsv = (r, g, b, a) => { //https://gist.github.com/mjackson/5311256
      let max = Math.max(r, g, b), min = Math.min(r, g, b);
      const componentCase = max == r ? 0 : ( max == g ? 1 : 2);
      a /= 255, r /= 255, g /= 255, b /= 255, min /= 255, max /= 255;
      let h, s, v = max;
      let d = max - min;
      s = max == 0 ? 0 : d / max;
      if (max == min) {
        h = 0; // achromatic
      } else {
        switch (componentCase) {
          case 0: h = (g - b) / d + (g < b ? 6 : 0); break;
          case 1: h = (b - r) / d + 2; break;
          case 2: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return [h, s, v, a];
    }; //rgbToHsv
    */

    const rgbToHsl = (r, g, b, a) => { //https://gist.github.com/mjackson/5311256
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        const componentCase = max == r ? 0 : (max == g ? 1 : 2); // is max r g or b?
        a /= 255, r /= 255, g /= 255, b /= 255, min /= 255, max /= 255;
        let h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (componentCase) {
                case 0: h = (g - b) / d + (g < b ? 6 : 0); break;
                case 1: h = (b - r) / d + 2; break;
                case 2: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h, s, l, a];
    }; //rgbToHsl

    ///////////////////////////////////////////////////////////////////////////

    const rgbaHex = colors => {
        const size = definitionSet.colorSpace.colorComponentHexSize;
        const result = [];
        for (let color of colors) {
            let text = definitionSet.colorSpace.colorComponentHexPad.repeat(size)
                + color.toString(definitionSet.colorSpace.hex);
            text = text.slice(text.length - size);
            result.push(text);
        } //loop
        return definitionSet.colorSpace.joinHexArray(result);
    }; //parseToRgbaHex

    const normalize = (value, scale) => (value * scale).toFixed(definitionSet.colorSpace.fixedPrecision);

    const hsToString = value =>
        definitionSet.colorSpace.formatHs(
            normalize(value[0], 360),
            normalize(value[1], 100),
            normalize(value[2], 100),
            normalize(value[3], 100));

    const rgbToCss = function (colorName, rgba) {
        const hsl = hsToString(conversionSet.rgbToHsl(rgba[0], rgba[1], rgba[2], rgba[3]));
        const hex = rgbaHex(rgba);
        rgba[3] = normalize(rgba[3], 1 / 255); // for formatRgba, to have alpha in [0..1], not %
        return definitionSet.colorSpace.formatColor(
            colorName,
            hex,
            definitionSet.colorSpace.formatRgba(rgba),
            hsl
        );
    } //rgbToCss

    conversionSet.rgbToHsl = rgbToHsl;
    conversionSet.rgbToCss = rgbToCss;

})();
