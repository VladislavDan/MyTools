import {IServicesProvider} from '../types/IServicesProvider';

let dependenciesInjectionPath: Array<number | string> = [];
export const getDependency = <T>(
    dependencyKey: string | number,
    context: IServicesProvider,
    clearDependenciesPath = true
): T => {
    let dependency;
    let initialArgs: Object[] = [];

    if (clearDependenciesPath) {
        dependenciesInjectionPath = [];
    }

    dependenciesInjectionPath.push(dependencyKey);
    let countOfInjectionKey = 0;
    dependenciesInjectionPath.forEach((key: string | number) => {
        if (key === dependencyKey) {
            countOfInjectionKey++;
        }
    });
    if (countOfInjectionKey > 2) {
        throw Error(`There seems to be circular dependency: ${dependenciesInjectionPath.join(' -> ')}!`);
    }

    if (
        context.dependenciesMap[dependencyKey]
        && !context.dependenciesMap[dependencyKey].dependency
        && context.dependenciesMap[dependencyKey].dependencyConstructor
    ) {
        const constructor = context.dependenciesMap[dependencyKey].dependencyConstructor;
        const args = context.dependenciesMap[dependencyKey].arguments;

        initialArgs = args ? args.map(
            (argument) => {
                return getDependency(argument, context, false);
            }
        ) : [];

        const classInstance = new constructor(...initialArgs);
        context.updateDependency(classInstance, dependencyKey);
        dependency = classInstance;
    } else if (
        context.dependenciesMap[dependencyKey]
        && context.dependenciesMap[dependencyKey].dependency
    ) {
        dependency = context.dependenciesMap[dependencyKey].dependency;
    } else {
        throw Error(`There is no any suited dependency with name: ${dependencyKey}!`);
    }
    return dependency as T;
}