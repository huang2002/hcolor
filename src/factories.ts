import { RGB, RGBA } from "./RGB";
import { HSL, HSLA } from "./HSL";

export const rgb = (r = 0, g = 0, b = 0) => new RGB(r, g, b);
export const rgba = (r = 0, g = 0, b = 0, a = 1) => new RGBA(r, g, b, a);
export const hsl = (h = 0, s = 1, l = .5) => new HSL(h, s, l);
export const hsla = (h = 0, s = 1, l = .5, a = 1) => new HSLA(h, s, l, a);

export const RGB2HSL = (rgb: string, round = false) => RGB.fromString(rgb).toHSL(round).toString();
export const RGB2HSLA = (rgb: string, alpha = 1, round = false) => RGB.fromString(rgb).toHSLA(alpha, round).toString();
export const RGB2HEX = (rgb: string, upperCase = true) => RGB.fromString(rgb).toHEX(upperCase);
export const RGBA2HSL = (rgba: string, round = false) => RGBA.fromString(rgba).toHSL(round).toString();
export const RGBA2HSLA = (rgba: string, round = false) => RGBA.fromString(rgba).toHSLA(round).toString();
export const RGBA2HEX = (rgba: string, upperCase = true) => RGBA.fromString(rgba).toHEX(upperCase);

export const HSL2RGB = (hsl: string, round = false) => HSL.fromString(hsl).toRGB(round).toString();
export const HSL2RGBA = (hsl: string, alpha = 1, round = false) => HSL.fromString(hsl).toRGBA(alpha, round).toString();
export const HSL2HEX = (hsl: string, upperCase = true) => HSL.fromString(hsl).toHEX(upperCase);
export const HSLA2RGB = (hsla: string, round = false) => HSLA.fromString(hsla).toRGB(round).toString();
export const HSLA2RGBA = (hsla: string, round = false) => HSLA.fromString(hsla).toRGBA(round).toString();
export const HSLA2HEX = (hsla: string, upperCase = true) => HSLA.fromString(hsla).toHEX(upperCase);

export const HEX2RGB = (hex: string) => RGB.fromHEX(hex).toString();
export const HEX2RGBA = (hex: string, alpha = 1) => RGBA.fromHEX(hex, alpha).toString();
export const HEX2HSL = (hex: string) => HSL.fromHEX(hex).toString();
export const HEX2HSLA = (hex: string, alpha = 1, round = false) => HSLA.fromHEX(hex, alpha, round).toString();
