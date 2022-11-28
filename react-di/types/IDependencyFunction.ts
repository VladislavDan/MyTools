import {IDependency} from './IDependency';

export type IDependencyFunction<D extends IDependency> = (...args: any[]) => D;