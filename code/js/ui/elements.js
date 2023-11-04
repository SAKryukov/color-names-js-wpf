"use strict";

const getElements = () => {

    const elementSet = {
        main: document.querySelector("main"),
        table: document.querySelector("main table"),
    } //elementSet

    Object.freeze(elementSet);
    return elementSet;

}; //getElements

