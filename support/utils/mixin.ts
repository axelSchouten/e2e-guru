type Constructor<T ={}> = new ( ...args: any[] ) => T;

export default function Mixin<TBase extends Constructor, TMixin extends Constructor>(
    Base: TBase,
    MixinClass: TMixin
) {
    return class extends Base {
        constructor(...args:any[]) {
            super(...args);
            Object.assign(this, new MixinClass());
        }
    }
}

