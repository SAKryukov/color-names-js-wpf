"use strict";

const getElements = () => {

    const elementSet = {
        table: document.querySelector("main table"),
        radio: {
            css: document.querySelector("header input[type=radio]:first-of-type"),
            wpf: document.querySelector("header input[type=radio]:last-of-type"),
        },
        colorCountIndicator: document.querySelector("header span"),
        colorResult: document.querySelector("header p:last-of-type input"),
        sample: document.querySelector("main > section"),
        sort: document.querySelector("header select"),
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

