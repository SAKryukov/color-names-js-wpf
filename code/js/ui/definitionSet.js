"use strict";

const definitionSet = {
    
    columns: 8,
    cssColorRegexp: /([0-9]{0,3}(,|\)))/g,
    hex: 16,
    colorComponentHexSize: 2,
    colorComponentHexPad: "0",
    joinHexArray: data => `#${data.join("")}`,
    formatColor: (name, hex) => `${name}: ${hex.toUpperCase()}`,
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