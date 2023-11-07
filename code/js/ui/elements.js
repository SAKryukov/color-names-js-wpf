"use strict";

const getElements = () => {

    const elementSet = {
        table: document.querySelector("main table"),
        radio: {
            css: document.querySelector("#css"),
            wpf: document.querySelector("#wpf"),
        },
        complementaryColors: {
            label: document.querySelector("header p label:nth-of-type(3)"),
            checkbox: document.querySelector("header p input[type=checkbox"),
        },
        install: document.querySelector("footer button"),
        colorCountIndicator: document.querySelector("header span"),
        colorResult: document.querySelector("header p:last-of-type input"),
        sample: document.querySelector("main > section"),
        sort: document.querySelector("header select"),
        metadata: {
            copyright: document.querySelector("footer span"),
            version: document.querySelector("footer b"),
        },
        navigationBehavior: {
            background: document.querySelector("main > p > input:first-of-type"),
            foreground: document.querySelector("main > p > input:last-of-type"),
        },
    } //elementSet

    Object.freeze(elementSet);
    return elementSet;

}; //getElements

