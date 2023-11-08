"use strict";

const orderSet = (() => {

    const sort = (colorMapMetadata, sort, reverse) => {
        
        if (!colorMapMetadata.isRemapped) return;

        const hslToFactor = hsl => 
            hsl[sort[0]] * 100000000 + hsl[sort[1]] * 10000 + hsl[sort[2]];

        const compare = (left, right) => {
            left = colorMapMetadata.map.get(left).color;
            right = colorMapMetadata.map.get(right).color;
            const leftHsl = conversionSet.rgbToHsl(left);
            const rightHsl = conversionSet.rgbToHsl(right);
            const sign = reverse ? -1 : 1;
            return sign * (hslToFactor(rightHsl) - hslToFactor(leftHsl));
        }; //compare

        const nameCompare = (left, right) => {
            if (left == right) return 0;
            return right > left ? (reverse ? 1 : -1) : (reverse ? -1 : 1);
        } //nameCompare

        colorMapMetadata.source.sort(sort ? compare : nameCompare);

    }; //sort
    
    return { sort: sort };

})();
