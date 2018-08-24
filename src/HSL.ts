import { Vector } from "./Vector";
import { RGB } from "./RGB";

export class HSL extends Vector {

    constructor(h = 0, s = 0, l = 0) {
        super([h, s, l, 1]);
    }

    static fromHEX(hex: string, round = false) {
        return RGB.fromHEX(hex).toHSL(round);
    }

    static pattern = /^hsl\(\s*((?:\d*\.)?\d+)\s*,\s*((?:\d*\.)?\d+)%\s*,\s*((?:\d*\.)?\d+)%\s*\)$/i;

    static fromString(hsl: string) {
        if (!hsl.match(HSL.pattern)) {
            throw "Invalid HSL string!";
        } else {
            return new HSL(+RegExp.$1, +RegExp.$2 / 100, +RegExp.$3 / 100);
        }
    }

    set h(value: number) {
        this.components[0] = value;
    }
    get h() {
        return this.components[0];
    }

    set s(value: number) {
        this.components[1] = value;
    }
    get s() {
        return this.components[1];
    }

    set l(value: number) {
        this.components[2] = value;
    }
    get l() {
        return this.components[2];
    }

    toString(round = false) {
        let c = this.components.slice(0, 3);
        c[1] *= 100;
        c[2] *= 100;
        if (round) {
            c = c.map(Math.round);
        }
        return `hsl(${c[0]},${c[1]}%,${c[2]}%)`;
    }

    toHSL(round = false) {
        let c = this.components.slice(0, 3);
        if (round) {
            c = c.map(Math.round);
        }
        return new HSL(c[0], c[1], c[2]);
    }

    toHSLA(alpha = 1) {
        const { components: c } = this;
        return new HSLA(c[0], c[1], c[2], alpha);
    }

    toHEX(upperCase = true) {
        return this.toRGB(true).toHEX(upperCase);
    }

    toRGB(round = false) {
        const { h, s, l } = this;
        if (s === 0) {
            return new RGB(l, l, l);
        } else {
            const q = l < .5 ? l * (1 + s) : (l + s - l * s),
                p = 2 * l - q,
                k = h / 360,
                qp6 = (q - p) * 6,
                _1_6 = 1 / 6,
                _2_3 = 2 / 3;
            let rgb = [k + 1 / 3, k, k - 1 / 3].map(
                t => t < 0 ? t + 1 : (t > 1 ? t - 1 : t)
            ).map(
                t => t < _1_6 ? p + qp6 * t : (
                    t < .5 ? q : (
                        t < _2_3 ? p + qp6 * (_2_3 - t) :
                            p
                    )
                )
            ).map(
                n => n * 255
            );
            if (round) {
                rgb = rgb.map(Math.round);
            }
            return new RGB(rgb[0], rgb[1], rgb[2]);
        }
    }

    toRGBA(alpha = 1, round = false) {
        return this.toRGB(round).toRGBA(alpha);
    }

}

// @ts-ignore
export class HSLA extends HSL {

    constructor(h = 0, s = 1, l = .5, a = 1) {
        super(h, s, l);
        this.components[3] = a;
    }

    static fromHEX(hex: string, alpha = 1, round = false) {
        return RGB.fromHEX(hex).toHSLA(alpha, round);
    }

    static pattern = /^hsla\(\s*((?:\d*\.)?\d+)\s*,\s*((?:\d*\.)?\d+)%\s*,\s*((?:\d*\.)?\d+)%\s*,\s*((?:\d*\.)?\d+)\s*\)$/i;

    static fromString(hsla: string) {
        if (!hsla.match(HSLA.pattern)) {
            throw "Invalid HSLA string!";
        } else {
            return new HSLA(+RegExp.$1, +RegExp.$2 / 100, +RegExp.$3 / 100, +RegExp.$4);
        }
    }

    set a(value: number) {
        this.components[3] = value;
    }
    get a() {
        return this.components[3];
    }

    toString(round = false) {
        let c = this.components.slice(0);
        c[1] *= 100;
        c[2] *= 100;
        if (round) {
            c = c.slice(0, 3).map(Math.round).concat(c[3]);
        }
        return `hsla(${c[0]},${c[1]}%,${c[2]}%,${c[3]})`;
    }

    // @ts-ignore
    toRGBA(round = false) {
        return this.toRGB(round).toRGBA(this.components[3]);
    }

}
