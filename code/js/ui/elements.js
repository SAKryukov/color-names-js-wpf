"use strict";

const getElements = () => {

    const elementSet = {
        main: document.querySelector("main"),
        table: document.querySelector("main table"),
        radio: {
            css: document.querySelector("header input:first-of-type"),
            wpf: document.querySelector("header input:last-of-type"),
        }
    } //elementSet

    Object.freeze(elementSet);
    return elementSet;

}; //getElements

