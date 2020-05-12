export class StickyManager {
    constructor() {
        this.stickys = new Map();
        this.stickys.set('last', { sticky: null, y: 99999, h: 0 });
    }

    measureLayoutAll(pkey) {
        const stickys = [...this.stickys];
        stickys.sort((a, b) => a[1].y - b[1].y);
        for (let i = 0; i < stickys.length - 1; i++) {
            const [_, { sticky }] = stickys[i];
            sticky && sticky.measureLayout(pkey);
        }
    }

    add(sticky, y, h) {
        this.stickys.set(sticky.key, { sticky, y, h });
        this.onChanged();
    }

    remove(sticky) {
        this.stickys.delete(sticky.key);
    }


    onChanged() {
        this.timer && window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
            const stickys = [...this.stickys];
            stickys.sort((a, b) => a[1].y - b[1].y);
            for (let i = 0; i < stickys.length - 1; i++) {
                const [key, { sticky, y, h }] = stickys[i];
                sticky && sticky.update(y, h, stickys[i + 1][1].y);
            }
        }, 300);
    }
}
