/*
HTML Menu

Copyright (c) 2023 by Sergey A Kryukov
http://www.SAKryukov.org
http://www.codeproject.com/Members/SAKryukov
*/

"use strict";

(() => {

    const rgbToHsl = (rgba, complementary) => {
        // prototype: https://gist.github.com/mjackson/5311256
        let [r, g, b, a] = rgba;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        const componentCase = max == r ? 0 : (max == g ? 1 : 2); // is max r g or b?
        r /= 255, g /= 255, b /= 255, min /= 255, max /= 255;
        let h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (componentCase) {
                case 0: h = (g - b) / d + (g < b ? 6 : 0); break;
                case 1: h = (b - r) / d + 2; break;
                case 2: h = (r - g) / d + 4; break;
            } //switch
            h /= 6;
        } //if
        return [complementary ? (h + 0.5) % 1 : h, s, l, a];
    }; //rgbToHsl

    const hslToRgb = (hsl, round) => {
        // prototype: https://gist.github.com/mjackson/5311256
        let [h, s, l, a] = hsl;
        let r, g, b;
        if (s != 0) {
            const channel = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            } //channel
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
            r = channel(p, q, h + 1 / 3);
            g = channel(p, q, h);
            b = channel(p, q, h - 1 / 3);
        } else
            r = g = b = l;        
        return round
            ? [(r * 0xff).toFixed(0), (g * 0xff).toFixed(0), (b * 0xff).toFixed(0), a]
            : [r * 0xff, g * 0xff, b * 0xff, a];
    } //hslToRgb

    const complementRgb = rgba =>
        hslToRgb(rgbToHsl(rgba, true), true);
        /*
        const result = [];
        for (let index = 0; index < 3; ++index)
            result.push((~rgba[index]>>>0) & 0xff);
        result.push(rgba[3]);
        return result;
        */

    ///////////////////////////////////////////////////////////////////////////

    const rgbaToHex = colors => {
        const size = definitionSet.colorSpace.colorComponentHexSize;
        let [r, g, b, a] = colors;
        a *= 0xff;
        const normalizeColors = [r, g, b, a];
        const result = [];
        for (let color of normalizeColors) {
            let text = definitionSet.colorSpace.colorComponentHexPad.repeat(size)
                + color.toString(definitionSet.colorSpace.hex);
            text = text.slice(text.length - size);
            result.push(text);
        } //loop
        return definitionSet.colorSpace.joinHexArray(result).toUpperCase();
    }; //rgbaToHex

    const normalize = (value, scale) => (value * scale).toFixed(0);

    const hslToCss = value =>
        definitionSet.colorSpace.formatHsl(
            normalize(value[0], 360),
            normalize(value[1], 100),
            normalize(value[2], 100),
            normalize(value[3], 100));
    const rgbToCss = rgba => {
        rgba[3] = normalize(rgba[3], 1)
        return definitionSet.colorSpace.formatRgba(rgba);
    } //rgbToCss

    const outputCss = function(colorName, rgba, isComplementary) {
        return definitionSet.colorSpace.formatCssOutput(
            isComplementary
                ? definitionSet.colorSpace.colorName(colorName)
                : colorName,
            rgbaToHex(rgba),
            rgbToCss(rgba),
            hslToCss(this.rgbToHsl(rgba))    
        );
    }; //outputCss

    conversionSet.rgbToHsl = rgbToHsl;
    conversionSet.complementRgb = complementRgb;
    conversionSet.rgbToCss = rgbToCss;
    conversionSet.outputCss = outputCss;

})();
