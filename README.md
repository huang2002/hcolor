# hcolor

Simple color conversions.

# Support

- RGB
- RGBA
- HSL
- HSLA
- HEX

# Example

```js
const rgba = new HColor.RGBA(65, 43, 21, .5);
rgba.toHSLA().toString(true); // hsla(30,51%,17%,0.5)

HColor.HEX2HSLA('#135', .5, true); // hsla(210,67%,20%,0.5)

const hsl = HColor.rgb(12, 34, 56).toHSL(true);
hsl.toString(); // hsl(210,65%,13%)

HColor.parse('#F00').toString(); // rgb(255,0,0)
```

# APIs

Please read the declaration files in `typings` or the source files in `src` to learn the APIs.

# Changelog

See [CHANGELOG.md](CHANGELOG.md)
