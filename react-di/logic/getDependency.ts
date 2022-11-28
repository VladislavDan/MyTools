import {IServicesProvider} from '../types/IServicesProvider';
import {IDependency} from '../types/IDependency';

export const getDependency = (
    dependencyKey: string,
    context: IServicesProvider
): IDependency | null => {
    let dependency: IDependency | null = {} || null;

    if (
        context.dependenciesMapper[dependencyKey] && !context.dependenciesMapper[dependencyKey].dependency
    ) {
        const dependencyFunction = context.dependenciesMapper[dependencyKey].dependencyFunction;
        const childDependenciesKeys = context.dependenciesMapper[dependencyKey].childDependenciesKeys;
        const initialArgs = childDependenciesKeys.map((childDependenciesKey) => {
            let childDependency = context.dependenciesMapper[childDependenciesKey].dependency;
            if (!childDependency) {
                childDependency = getDependency(childDependenciesKey, context);
                return childDependency || {}
            } else {
                return childDependency;
            }
        })

        const dependency = dependencyFunction(...initialArgs);
        context.updateDependencies(dependencyKey, dependency);
    } else if (context.dependenciesMapper[dependencyKey] && context.dependenciesMapper[dependencyKey].dependency) {
        dependency = context.dependenciesMapper[dependencyKey].dependency;
    } else {
        throw Error(`There is no any suited dependency with name: ${dependencyKey}!`);
    }
    return dependency;
}