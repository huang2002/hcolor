const HColor = require('../dist/hcolor.umd.js'),
    { strictEqual } = require('assert');

const sample = {
    rgb: 'rgb(12,34,56)',
    hsl: 'hsl(125,10%,60%)',
    hex: '#678'
};

strictEqual(
    HColor.RGB.fromString(sample.rgb).toHSL().toRGB().toString(true),
    sample.rgb
);

strictEqual(
    HColor.HSL.fromString(sample.hsl).toRGB().toHSL().toString(true),
    sample.hsl
);

strictEqual(
    HColor.HSLA.fromHEX(sample.hex, .6).toRGBA().toString(true),
    HColor.HEX2RGBA(sample.hex, .6)
);
