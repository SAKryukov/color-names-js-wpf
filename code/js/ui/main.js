"use strict";

window.onload = () => {

    const elements = getElements();

    const tableHead = elements.table.createTHead();
    const headRow = tableHead.insertRow();
    const headCell = headRow.insertCell(0);
    headCell.textContent = "whatever";
    const tableBody = elements.table.createTBody();
    for (let color of wpfColorNames) {
        const row = document.createElement("tr");
        const cell = row.insertCell(0);
        const cellContent = document.createElement("div");
        const label = document.createElement("span");
        label.textContent = color;
        const cellSample = document.createElement("div");
        //cellSample.style.cssText = "";
        cellSample.style.backgroundColor = color;
        cellContent.appendChild(cellSample);
        cellContent.appendChild(label);
        cell.appendChild(cellContent);
        tableBody.appendChild(row);
        /*
        const paragraph = document.createElement("p");
        paragraph.textContent = color;
        elements.main.appendChild(paragraph);
        */
    } //loop

}; //window.onload
