"use strict";

const getElements = () => {

    const elementSet = {
        main: document.querySelector("main"),
        table: document.querySelector("main table"),
        radio: {
            css: document.querySelector("header input:first-of-type"),
            wpf: document.querySelector("header input:last-of-type"),
        },
        colorResult: document.querySelector("footer input"),
        colorCountIndicator: document.querySelector("header > p:last-of-type > span"),
    } //elementSet

    Object.freeze(elementSet);
    return elementSet;

}; //getElements

