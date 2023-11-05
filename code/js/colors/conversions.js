"use strict";

const conversionSet = (() => {

    const parseToRgb = cssColor => {
        const expression = definitionSet.cssColorRegexp;
        const result = [];
        let match;
        do {
            match = expression.exec(cssColor);
            if (match)
                result.push(parseInt(match[0]));
        } while (match);
        return result;
    }; //parseToRgb

    const parseToRgbHex = cssColor => {
        const size = definitionSet.colorComponentHexSize;
        const colors = parseToRgb(cssColor);
        const result = [];
        for (let color of colors) {
            let text = definitionSet.colorComponentHexPad.repeat(size) + color.toString(definitionSet.hex);
            text = text.slice(text.length - size);
            result.push(text);
        } //loop
        return definitionSet.joinHexArray(result);
    }; //parseToRgbHex
    
    return { parseToRgb: parseToRgb, parseToRgbHex: parseToRgbHex, };

})();
