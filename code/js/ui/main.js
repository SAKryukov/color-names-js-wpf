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

    let currentCell, tableBody, currentColorMapMetadata;
    const select = (cell, doSelect) => {
        if (!cell) return;
        if (doSelect) {
            cell.classList.add(definitionSet.selectionIndicator);
            if (currentColorMapMetadata.isRemapped) {
                const color = currentColorMapMetadata.map.get(cell.title).color;
                //const rgba = conversionSet.parseToRgba(color);
                //const hsl = conversionSet.hsToString(conversionSet.rgbToHsl(rgba[0], rgba[1], rgba[2], rgba[3]));
                //rgba[3] /= 255;
                elements.colorResult.value = conversionSet.rgbToCss(cell.title, color);
                //definitionSet.colorSpace.formatColor();
                //        cell.title,
                //        conversionSet.parseToRgbaHex(currentColorMapMetadata.map.get(cell.title).color),
                //        definitionSet.colorSpace.formatRgba(rgba),
                //        hsl
                //    );
                if (elements.navigationBehavior.background.checked)
                    elements.sample.style.backgroundColor = color;
                if (elements.navigationBehavior.foreground.checked)
                    elements.sample.style.color = color;
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
                const color = currentColorMapMetadata.map.get(currentCell.title).color;
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

    elements.table.tabIndex = 0;
    const focusPromise = new Promise(resolve => resolve(elements.table));
    focusPromise.then(element => {
        remap(cssColorMapMetadata);
        select(currentCell, true);
        element?.focus();
    });

}; //window.onload
