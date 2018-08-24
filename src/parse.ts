import { RGB, RGBA } from "./RGB";
import { HSL, HSLA } from "./HSL";

export function parse(str: string, preferRGB = true) {
    if (RGB.pattern.test(str)) {
        return RGB.fromString(str);
    } else if (RGBA.pattern.test(str)) {
        return RGBA.fromString(str);
    } else if (HSL.pattern.test(str)) {
        return HSL.fromString(str);
    } else if (HSLA.pattern.test(str)) {
        return HSLA.fromString(str);
    } else {
        return (preferRGB ? RGB : HSL).fromHEX(str);
    }
}
