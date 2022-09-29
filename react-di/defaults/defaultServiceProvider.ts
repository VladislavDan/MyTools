import {IServicesProvider} from "../types/IServicesProvider";
import {Dependency} from "../Dependency";

export const defaultServiceProvider: IServicesProvider = {
    dependenciesConstructors: {},
    dependenciesClasses: {},
    updateDependenciesClasses: (dependencyConstructor: Dependency) => {
    }
};