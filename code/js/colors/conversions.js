"use strict";

(() => {

    const rgbToHsv = (r, g, b) => { //https://gist.github.com/mjackson/5311256
        r /= 255, g /= 255, b /= 255;
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
        return [h, s, v];
    }; //rgbToHsv

    const rgbToHsl = (r, g, b) => { //https://gist.github.com/mjackson/5311256
        r /= 255, g /= 255, b /= 255;     
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
        return [h, s, l];
      }; //rgbToHsl

    const hsToString = value =>
        definitionSet.formatHs(
            value[0].toPrecision(definitionSet.colorSpacePrecision),
            value[1].toPrecision(definitionSet.colorSpacePrecision),
            value[2].toPrecision(definitionSet.colorSpacePrecision));

    conversionSet.rgbToHsv = rgbToHsv;
    conversionSet.rgbToHsl = rgbToHsl;
    conversionSet.hsToString = hsToString;

})();
