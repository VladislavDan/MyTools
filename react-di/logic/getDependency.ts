import {Dependency} from "../Dependency";
import {IServicesProvider} from "../types/IServicesProvider";
import {IDependencyArgs} from "../types/IDependencyArgs";

export const getDependency = <T extends Dependency,
    A extends Dependency,
    B extends Dependency,
    C extends Dependency,
    >(
    dependencyKey: { new(...args: IDependencyArgs<A, B, C, any>): T } | string,
    context: IServicesProvider
) => {
    let dependency;
    let initialArgs: Dependency[] = [];

    if (typeof dependencyKey !== 'string') {
        dependencyKey = dependencyKey.name;
    }

    if (
        !context.dependenciesClasses[dependencyKey]
        && context.dependenciesConstructors[dependencyKey]
    ) {
        const constructor = context.dependenciesConstructors[dependencyKey];
        const args = /constructor\(\s*([^)]+?)\s*\)/.exec(constructor.toString())

        initialArgs = args ? args[1].split(/\s*,\s*/).map(
            (arg) => {
                arg = arg.charAt(0).toUpperCase() + arg.slice(1);
                return getDependency(arg, context);
            }
        ) : [];

        const classInstance = new constructor(...initialArgs);
        context.updateDependenciesClasses(classInstance);
        dependency = classInstance;
    } else if (context.dependenciesClasses[dependencyKey]) {
        dependency = context.dependenciesClasses[dependencyKey];
    } else {
        throw Error(`There is no any suited dependency with name: ${dependencyKey}!`);
    }
    return dependency;
}