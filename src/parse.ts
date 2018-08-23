import { RGB, RGBA } from "./RGB";
import { HSL, HSLA } from "./HSL";

export function parse(str: string, preferRGB = true) {
    if (RGB.StringPattern.test(str)) {
        return RGB.fromString(str);
    } else if (RGBA.StringPattern.test(str)) {
        return RGBA.fromString(str);
    } else if (HSL.StringPattern.test(str)) {
        return HSL.fromString(str);
    } else if (HSLA.StringPattern.test(str)) {
        return HSLA.fromString(str);
    } else {
        return (preferRGB ? RGB : HSL).fromHEX(str);
    }
}
