export interface IDependencyDescription {
    dependencyConstructor: { new(...args: any[]): any };
    arguments: number[] | string[];
    dependency?: Object;
}