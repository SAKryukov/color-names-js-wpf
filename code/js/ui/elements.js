/*
HTML Menu

Copyright (c) 2023 by Sergey A Kryukov
http://www.SAKryukov.org
http://www.codeproject.com/Members/SAKryukov
*/

"use strict";

const getElements = () => {

    const elementSet = {
        table: document.querySelector("main table"),
        nameSet: {
            radio: {
                css: document.querySelector("#css"),
                wpf: document.querySelector("#wpf"),   
            },
            labels: {
                labelCss: document.querySelector("#label-css"),
                labelWpf: document.querySelector("#label-wpf"),    
            },
        },
        complementaryColors: document.querySelector("#complementary-colors"),
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
            background: document.querySelector("#navigation-to-background"),
            foreground: document.querySelector("#navigation-to-foreground"),
            clipboard: document.querySelector("#navigation-to-clipboard"),
        },
    } //elementSet

    Object.freeze(elementSet);
    return elementSet;

}; //getElements

