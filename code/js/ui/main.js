"use strict";

window.onload = () => {

    const elements = getElements();
    elements.metadata.copyright.textContent = definitionSet.metadata.copyright;
    elements.metadata.version.textContent = definitionSet.metadata.version;
    const cssColorMapMetadata = { source: cssColorNames, map: new Map(), isRemapped: false };
    const wpfColorMapMetadata = { source: wpfColorNames, map: new Map(), isRemapped: false };

    const remap = colorMapMetadata => {
        if (colorMapMetadata.isRemapped) return;
        for (const [key, value] of colorMapMetadata.map) {
            const style = window.getComputedStyle(value);
            const color = conversionSet.parseToRgba(style.backgroundColor);
            colorMapMetadata.map.set(key, { element: value, cssColor: style.backgroundColor, color: color });
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

    let currentCell, tableBody, currentColorMapMetadata;
    const select = (cell, doSelect) => {
        if (!cell) return;
        if (doSelect) {
            cell.classList.add(definitionSet.selectionIndicator);
            if (currentColorMapMetadata.isRemapped) {
                const mapValue = currentColorMapMetadata.map.get(cell.title);
                elements.colorResult.value = conversionSet.rgbToCss(cell.title, mapValue.color);
                if (elements.navigationBehavior.background.checked)
                    elements.sample.style.backgroundColor = mapValue.cssColor;
                if (elements.navigationBehavior.foreground.checked)
                    elements.sample.style.color = mapValue.cssColor;
            } //if
        } else
            cell.classList.remove(definitionSet.selectionIndicator);
    }; //select

    elements.table.onkeydown = event => {
        const moveUp = () => {
            const xIndex = currentCell.cellIndex;
            const currentRow = currentCell.parentElement;
            const yIndex = currentRow.rowIndex;
            if (yIndex < 1) return;
            const newRow = tableBody.rows[yIndex - 1];
            select(currentCell, false);
            currentCell = newRow.cells[xIndex];
            select(currentCell, true);
        }; //moveUp
        const moveDown = () => {
            const xIndex = currentCell.cellIndex;
            const currentRow = currentCell.parentElement;
            const yIndex = currentRow.rowIndex;
            if (yIndex >= tableBody.rows.length - 1) return;
            const newRow = tableBody.rows[yIndex + 1];
            if (xIndex >= newRow.cells.length) return;
            select(currentCell, false);
            currentCell = newRow.cells[xIndex];
            select(currentCell, true);
        }; //moveDown
        const moveLeft = () => {
            const xIndex = currentCell.cellIndex;
            const currentRow = currentCell.parentElement;
            if (xIndex < 1) return;
            select(currentCell, false);
            currentCell = currentRow.cells[xIndex - 1];
            select(currentCell, true);
        }; //moveLeft
        const moveRight = () => {
            const xIndex = currentCell.cellIndex;
            const currentRow = currentCell.parentElement;
            if (xIndex >= currentRow.childNodes.length - 1) return;
            select(currentCell, false);
            currentCell = currentRow.cells[xIndex + 1];
            select(currentCell, true);
        }; //moveRight
        switch (event.key) {
            case definitionSet.keyboard.left:
                moveLeft();
                break;
            case definitionSet.keyboard.right:
                moveRight();
                break;
            case definitionSet.keyboard.up:
                moveUp();
                break;
            case definitionSet.keyboard.down:
                moveDown();
                break;
            default: return;
        } //switch
    } //elements.table.onkeydown

    const populate = colorMapMetadata => {
        select(currentCell, true);
        currentColorMapMetadata = colorMapMetadata;
        const source = colorMapMetadata.source;
        const mapIt = colorMapMetadata.map.size < 1;
        while (elements.table.firstChild)
            elements.table.removeChild(elements.table.firstChild);
        elements.colorCountIndicator.textContent = source.length;
        tableBody = elements.table.createTBody();
        let row = document.createElement("tr");
        for (let color of source) {
            if (row.childNodes.length >= definitionSet.columns)
                row = document.createElement("tr");
            const cell = row.insertCell();
            cell.title = color;
            cell.onpointerdown = event => {
                select(currentCell, false);
                select(event.target, true);
                currentCell = event.target;
            }; //cell.onpointerdown
            cell.onpointerup = event => {
                if (!event.ctrlKey) return;
                const color = currentColorMapMetadata.map.get(currentCell.title).cssColor;
                if (event.shiftKey)
                    elements.sample.style.color = color;
                else
                    elements.sample.style.backgroundColor = color;        
            }; //cell.onpointerup
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
            if (row.rowIndex == 0 && cell.cellIndex == 0)
                currentCell = cell;
        } //loop   
        select(currentCell, true);
    }; //populate
    populate(cssColorMapMetadata);
;
    elements.sort.onchange = event => {
        let sort; let inverted;
        switch (event.target.selectedIndex) {
            case 0: sort = undefined; inverted = false; break;
            case 1: sort = undefined; inverted = true; break;
            case 2: sort = [2, 1, 0]; inverted = false; break;
            case 3: sort = [2, 1, 0]; inverted = true; break;
            case 4: sort = [0, 1, 2]; inverted = false; break;
            case 5: sort = [0, 1, 2]; inverted = true; break;
        }
        orderSet.sort(currentColorMapMetadata, sort, inverted);
        populate(currentColorMapMetadata);
    }; //elements.sort.onchange

    elements.table.tabIndex = 0;
    const focusPromise = new Promise(resolve => resolve(elements.table));
    focusPromise.then(element => {
        remap(cssColorMapMetadata);
        select(currentCell, true);
        element?.focus();
    });

}; //window.onload
