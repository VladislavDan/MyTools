import {Dependency} from "../Dependency";

export type IDependencyArgs<T extends Dependency,
    B extends Dependency,
    C extends Dependency,
    E extends any> = [
    arg1: T,
    arg2: B,
    arg3: C,
    ...arg5: E[]
];