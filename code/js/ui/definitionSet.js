"use strict";

const definitionSet = {

     metadata: {
        version: "0.1.0 ",
       copyright: "Sergey A Kryukov, 2023",
    },

    columns: 8,
    colorSpacePrecision: 2,
    cssColorRegexp: /([0-9]{0,3}(,|\)))/g,
    hex: 16,
    colorComponentHexSize: 2,
    colorComponentHexPad: "0",
    joinHexArray: data => `#${data.join("")}`,
    formatColor: (name, hex, rgb, hsv, hsl) =>
        `${name}: ${hex.toUpperCase()}, rgb(${rgb}), hsv(${hsv}), hsl(${hsl})`,
    formatHs: (h, s, value) =>
        `${h}deg ${s}% ${value}%`,
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