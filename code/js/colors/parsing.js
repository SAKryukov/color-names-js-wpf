"use strict";

const conversionSet = (() => {

    const parseToRgba = cssColor => {
        const expression = definitionSet.colorSpace.cssColorRegexp;
        const result = [];
        let match;
        do {
            match = expression.exec(cssColor);
            if (match)
                result.push(parseInt(match[0]));
        } while (match);
        if (result.length < 4)
            result.push(0xff);
        return result;
    }; //parseToRgba

    const parseToRgbaHex = cssColor => {
        const size = definitionSet.colorSpace.colorComponentHexSize;
        const colors = parseToRgba(cssColor);
        const result = [];
        for (let color of colors) {
            let text = definitionSet.colorSpace.colorComponentHexPad.repeat(size)
                + color.toString(definitionSet.colorSpace.hex);
            text = text.slice(text.length - size);
            result.push(text);
        } //loop
        return definitionSet.colorSpace.joinHexArray(result);
    }; //parseToRgbaHex
    
    return { parseToRgba: parseToRgba, parseToRgbaHex: parseToRgbaHex, };

})();
