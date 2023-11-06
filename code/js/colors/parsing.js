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

    return { parseToRgba: parseToRgba };

})();
