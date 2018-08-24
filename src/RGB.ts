import { Vector } from "./Vector";
import { HSL } from "./HSL";

export class RGB extends Vector {

    constructor(r = 0, g = 0, b = 0) {
        super([r, g, b, 1]);
    }

    static fromHEX(hex: string) {
        const { length } = hex;
        if (hex[0] !== '#' || length !== 4 && length !== 7) {
            throw "Invalid HEX value!";
        }
        if (length === 4) {
            return new RGB(
                parseInt(hex[1], 16) * 17,
                parseInt(hex[2], 16) * 17,
                parseInt(hex[3], 16) * 17
            );
        } else {
            return new RGB(
                parseInt(hex.slice(1, 3), 16),
                parseInt(hex.slice(3, 5), 16),
                parseInt(hex.slice(5), 16)
            );
        }
    }

    static StringPattern = /^rgb\(\s*((?:\d*\.)?\d+)\s*,\s*((?:\d*\.)?\d+)\s*,\s*((?:\d*\.)?\d+)\s*\)$/i;

    static fromString(rgb: string) {
        if (!rgb.match(RGB.StringPattern)) {
            throw "Invalid RGB string!";
        } else {
            return new RGB(+RegExp.$1, +RegExp.$2, +RegExp.$3);
        }
    }

    set r(value: number) {
        this.components[0] = value;
    }
    get r() {
        return this.components[0];
    }

    set g(value: number) {
        this.components[1] = value;
    }
    get g() {
        return this.components[1];
    }

    set b(value: number) {
        this.components[2] = value;
    }
    get b() {
        return this.components[2];
    }

    toString(round = false) {
        let c = this.components.slice(0, 3);
        if (round) {
            c = c.map(Math.round);
        }
        return `rgb(${c.join(',')})`;
    }

    toRGB(round = false) {
        let c = this.components.slice(0, 3);
        if (round) {
            c = c.map(Math.round);
        }
        return new RGB(c[0], c[1], c[2]);
    }

    toRGBA(alpha = 1) {
        return new RGBA(...this.components.slice(0, 3), alpha);
    }

    toHEX(upperCase = true): string {
        return upperCase ? this.toHEX(false).toUpperCase() :
            ('#' + this.components.slice(0, 3)
                .map(n => Math.round(n).toString(16))
                .map(s => s.length === 1 ? '0' + s : s)
                .join(''));
    }

    toHSL(round = false) {
        const [r, g, b] = this.components.slice(0, 3).map(n => n / 255),
            max = Math.max(r, g, b), min = Math.min(r, g, b),
            sum = max + min, delta = max - min,
            h = max === min ? 0 :
                max === r ? (60 * (g - b) / delta + (g < b ? 360 : 0)) :
                    max === g ? 60 * (b - r) / delta + 120 :
                        60 * (r - g) / delta + 240,
            l = sum / 2,
            s = l === 0 || max === min ? 0 :
                delta / (l > .5 ? 2 - sum : sum);
        return round ?
            new HSL(Math.round(h), Math.round(s * 100) / 100, Math.round(l * 100) / 100) :
            new HSL(h, s, l);
    }

    toHSLA(alpha = 1, round = false) {
        return this.toHSL(round).toHSLA(alpha);
    }

}

// @ts-ignore
export class RGBA extends RGB {

    constructor(r = 0, g = 0, b = 0, a = 1) {
        super(r, g, b);
        this.components[3] = a;
    }

    static fromHEX(hex: string, alpha = 1) {
        return RGB.fromHEX(hex).toRGBA(alpha);
    }

    static StringPattern = /^rgba\(\s*((?:\d*\.)?\d+)\s*,\s*((?:\d*\.)?\d+)\s*,\s*((?:\d*\.)?\d+)\s*,\s*((?:\d*\.)?\d+)\s*\)$/i;

    static fromString(rgba: string) {
        if (!rgba.match(RGBA.StringPattern)) {
            throw "Invalid RGBA string!";
        } else {
            return new RGBA(+RegExp.$1, +RegExp.$2, +RegExp.$3, +RegExp.$4);
        }
    }

    set a(value: number) {
        this.components[3] = value;
    }
    get a() {
        return this.components[3];
    }

    toString(round = false) {
        let { components: c } = this;
        if (round) {
            c = c.map((n, i) => i < 3 ? Math.round(n) : n) as typeof c;
        }
        return `rgba(${c.join(',')})`;
    }

    // @ts-ignore
    toHSLA(round = false) {
        return this.toHSL(round).toHSLA(this.components[3]);
    }

}

