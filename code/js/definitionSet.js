"use strict";

const definitionSet = {

    metadata: {
        version: "1.1.0",
        copyright: "Sergey A Kryukov, 2023",
    },

    colorSpace: {
        fixedPrecision: 0,
        cssColorRegexp: /([0-9]{0,3}(,|\)))/g,
        colorComponentHexSize: 2,
        colorComponentHexPad: "0",
        hex: 16,
        joinHexArray: data => `#${data.join("")}`,
        formatRgba: color =>
            `rgb(${color.join(", ")})`,
        formatColor: (name, hex, rgb, hsl) =>
            `${name}: ${hex.toUpperCase()}, ${rgb}, ${hsl}`,
        formatHsl: (h, s, value, a) =>
            `hsl(${h}, ${s}%, ${value}%, ${a}%)`,
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
