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

    const addPermutation  = (selectElement, map, permutation, delimiter, hslComponents, reverse) => {
        const components = [];
        for (let component of hslComponents)
            components.push(component);
        const orderedComponents = [];
        for (let index in permutation)
            orderedComponents.push(hslComponents[permutation[index]]);
        let text = orderedComponents.join(delimiter);
        if (reverse)
            text += reverse;
        addOption(selectElement, text);
        map.set(selectElement.options.length - 1, { sort: permutation, reverse: reverse != null })
    }; //addPermutation

    const addPermutations  = (selectElement, map, permutations, delimiter, hslComponents, reverse) => {
        for (let permutation of permutations) {
            addPermutation(selectElement, map, permutation, delimiter, hslComponents, null);
            addPermutation(selectElement, map, permutation, delimiter, hslComponents, reverse);
        } //loop
    }; //addPermutations


    const setup = (selectElement, action) => { // action(sort, reverse)
        const allPermutations = permute([2, 1, 0]); //sic! lightness first
        const map = new Map();
        const hslComponents = [];
        let index;
        for (index = 0; index < 3; ++index)
            hslComponents.push(selectElement[index].text);
        const delimiter = selectElement[index].text;
        const reverse = selectElement[index + 1].text;
        const alphanumeric = selectElement[index + 2].text;
        while (selectElement.options.length > 0)
            selectElement.remove(0);
        addOption(selectElement, alphanumeric);
        addOption(selectElement, alphanumeric + reverse);
        map.set(0, { sort: undefined, reverse: false });
        map.set(1, { sort: undefined, reverse: true });
        addPermutations(selectElement, map, allPermutations, delimiter, hslComponents, reverse);
        selectElement.onchange = event => {
            const value = map.get(event.target.selectedIndex);
            if (value)
                action(value.sort, value.reverse);
        } //elements.sort.onchange
    }; //setup

    return { setup: setup };

})();
