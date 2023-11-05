"use strict";

window.onload = () => {

    const elements = getElements();
    const cssColorMap = new Map();
    const wpfColorMap = new Map();
    const cssColorMapMetadata = { source: cssColorNames, map: cssColorMap, isRemapped: false };
    const wpfColorMapMetadata = { source: wpfColorNames, map: wpfColorMap, isRemapped: false };

    const remap = colorMapMetadata => {
        if (colorMapMetadata.isRemapped) return;
        for (const [key, value] of colorMapMetadata.map) {
            const style = window.getComputedStyle(value);
            colorMapMetadata.map.set(key, { element: value, color: style.backgroundColor });
        } //loop
        colorMapMetadata.isRemapped = true;
    }; //remap

    (() => { //radio events:
        const dataSourceHandler = (event, colorMapMetadata) => {
            if (event.target.checked) {
                populate(colorMapMetadata);
                if (colorMapMetadata.isRemapped) return
                const remapPromise = new Promise(resolve => resolve(colorMapMetadata));
                remapPromise.then(metadata => {
                    remap(metadata);
                });
            } //if
        }; //dataSourceHandler
        elements.radio.css.onchange = event => dataSourceHandler(event, cssColorMapMetadata);
        elements.radio.wpf.onchange = event => dataSourceHandler(event, wpfColorMapMetadata);
    })();

    const populate = colorMapMetadata => {
        const source = colorMapMetadata.source;
        const mapIt = colorMapMetadata.map.size < 1;
        while (elements.table.firstChild)
            elements.table.removeChild(elements.table.firstChild);
        const tableHead = elements.table.createTHead();
        const headRow = tableHead.insertRow();
        const headCell = headRow.insertCell();
        headCell.textContent = definitionSet.dataLength(source.length);
        const tableBody = elements.table.createTBody();
        for (let color of source) {
            const row = document.createElement("tr");
            const cell = row.insertCell();
            cell.title = color;
            cell.onpointerdown = event =>
                elements.colorResult.textContent = 
                    definitionSet.formatColor(
                        event.target.title,
                        conversionSet.parseToRgbHex(colorMapMetadata.map.get(event.target.title).color)
                    );
            const cellContent = document.createElement("div");
            const label = document.createElement("span");
            label.textContent = color;
            const cellSample = document.createElement("div");
            if (mapIt)
                colorMapMetadata.map.set(color, cellSample);
            cellSample.style.backgroundColor = color;
            cellContent.appendChild(cellSample);
            cellContent.appendChild(label);
            cell.appendChild(cellContent);
            tableBody.appendChild(row);
        } //loop   
    }; //populate
    populate(cssColorMapMetadata);

    elements.table.tabIndex = 0;
    const focusPromise = new Promise(resolve => resolve(elements.table));
    focusPromise.then(element => {
        remap(cssColorMapMetadata);
        element?.focus();
    });

}; //window.onload
