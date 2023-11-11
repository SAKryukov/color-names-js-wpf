/*
HTML Menu

Copyright (c) 2023 by Sergey A Kryukov
http://www.SAKryukov.org
http://www.codeproject.com/Members/SAKryukov
*/

"use strict";

const definitionSet = {

    metadata: {
        version: "1.2.0",
        copyright: "Sergey A Kryukov, 2023",
    },

    colorSpace: {
        cssColorRegexp: /([0-9]{0,3}(,|\)))/g,
        colorComponentHexSize: 2,
        colorComponentHexPad: "0",
        hex: 16,
        joinHexArray: data => `#${data.join("")}`,
        colorName: name => `complement to ${name}`,
        formatRgba: color =>
            `rgb(${color.join(", ")})`,
        formatHsl: (h, s, value, a) =>
            `hsl(${h}, ${s}%, ${value}%, ${a}%)`,
        formatCssOutput: (name, hex, rgba, hsl) =>
            `${name}: ${hex}, ${rgba}, ${hsl}`,
    },

    uiOpacity: { disabled: 0.6, normal: 1 },

    columns: 8,   
    selectionIndicator: "selected",

    keyboard: {
        left: "ArrowLeft",
        right: "ArrowRight",
        up: "ArrowUp",
        down: "ArrowDown",
        home: "Home",
        end: "End",
        escape: "Escape",
        enter: "Enter",
        edit: "F2",
        findNext: "F3",
    },

}; //definitionSet
