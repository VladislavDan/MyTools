import {Dependency} from "../Dependency";

export interface IServicesProvider {
    dependenciesConstructors: {
        [key: string]: { new(...args: Dependency[]): Dependency };
    };
    dependenciesClasses: {
        [key: string]: Dependency;
    };
    updateDependenciesClasses: (dependencyConstructor: Dependency, scope?: string) => void
}