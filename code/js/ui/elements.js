"use strict";

const getElements = () => {

    const elementSet = {
        main: document.querySelector("main"),
        table: document.querySelector("main table"),
        radio: {
            css: document.querySelector("header input:first-of-type"),
            wpf: document.querySelector("header input:last-of-type"),
        },
        colorResult: document.querySelector("header p:last-of-type input"),
        colorCountIndicator: document.querySelector("header > p:nth-of-type(3) > span"),
        sample: document.querySelector("main > section"),
        metadata: {
            copyright: document.querySelector("footer span:first-of-type"),
            version: document.querySelector("footer span:last-of-type"),
        },
        navigationBehavior: {
            background: document.querySelector("main > p > input:first-of-type"),
            foreground: document.querySelector("main > p > input:last-of-type"),
        },
    } //elementSet

    Object.freeze(elementSet);
    return elementSet;

}; //getElements

