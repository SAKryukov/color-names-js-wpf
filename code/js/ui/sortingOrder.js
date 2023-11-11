/*
Color Names

Copyright (c) 2023 by Sergey A Kryukov
http://www.SAKryukov.org
http://www.codeproject.com/Members/SAKryukov
*/

"use strict";

const sortingOrder = (() => {

    const permute = originalArray => {
        let result = [];
        const recurse = (data, currentArray = []) => {
            if (data.length != 0)
                for (let index = 0; index < data.length; ++index) {
                    let current = data.slice();
                    let next = current.splice(index, 1);
                    recurse(current.slice(), currentArray.concat(next))
                } //loop
            else
                result.push(currentArray);
        }; //recurse
        recurse(originalArray);
        return result;
    }; //permute

    const addOption = (selectElement, text) => {
        const option = document.createElement("option");
        option.text = text;
        selectElement.options.add(option);
    }; //addOption

    const addPermutation  = (selectElement, map, permutation, delimiter, hslComponents, directionIndicator, reverse) => {
        const components = [];
        for (let component of hslComponents)
            components.push(component);
        const orderedComponents = [];
        for (let index in permutation)
            orderedComponents.push(hslComponents[permutation[index]]);
        let text = orderedComponents.join(delimiter);
        text += directionIndicator;
        addOption(selectElement, text);
        map.set(selectElement.options.length - 1, { sort: permutation, reverse: reverse })
    }; //addPermutation

    const addPermutations  = (selectElement, map, permutations, delimiter, hslComponents, defaultDirection, reverseDirection) => {
        for (let permutation of permutations) {
            addPermutation(selectElement, map, permutation, delimiter, hslComponents, defaultDirection, false);
            addPermutation(selectElement, map, permutation, delimiter, hslComponents, reverseDirection, true);
        } //loop
    }; //addPermutations

    const setup = (selectElement, action) => { // action(sort, reverse)
        const allPermutations = permute([2, 0, 1]); //sic! lightness first
        const map = new Map();
        const hslComponents = [];
        let index;
        for (index = 0; index < 3; ++index)
            hslComponents.push(selectElement[index].text);
        const delimiter = selectElement[index].text;
        const defaultDirection = selectElement[index + 1].text;
        const reverseDirection = selectElement[index + 2].text;
        const alphabetical = selectElement[index + 3].text;
        while (selectElement.options.length > 0)
            selectElement.remove(0);
        addOption(selectElement, alphabetical + defaultDirection);
        addOption(selectElement, alphabetical + reverseDirection);
        map.set(0, { sort: undefined, reverse: false });
        map.set(1, { sort: undefined, reverse: true });
        addPermutations(selectElement, map, allPermutations, delimiter, hslComponents, defaultDirection, reverseDirection);
        selectElement.onchange = event => {
            const value = map.get(event.target.selectedIndex);
            if (value)
                action(value.sort, value.reverse);
        } //elements.sort.onchange
    }; //setup

    return { setup: setup };

})();
