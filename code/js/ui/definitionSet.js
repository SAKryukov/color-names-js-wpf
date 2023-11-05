"use strict";

const definitionSet = {
    
    cssColorRegexp: /([0-9]{0,3}(,|\)))/g,
    hex: 16,
    colorComponentHexSize: 2,
    colorComponentHexPad: "0",
    joinHexArray: data => `#${data.join("")}`,
    dataLength: length => `Number of names: ${length}`,
    formatColor: (name, hex) => `${name}: ${hex.toUpperCase()}`,

}; //definitionSet