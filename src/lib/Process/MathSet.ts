
export class MathSet extends Set {
    intersection(B: MathSet) {
        const common = new MathSet();
        this.forEach(e => {
            if (B.has(e))
                common.add(e);
        });
        return common;
    }

    difference(B: MathSet) {
        const uncommon = new MathSet();
        this.forEach(e => {
            if (!B.has(e))
                uncommon.add(e);
        });
        return uncommon;
    }
}
