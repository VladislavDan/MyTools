import {useContext, useMemo} from "react";
import {IServicesProvider} from "../types/IServicesProvider";
import {DependenciesContext} from "../DependenciesProvider";
import {Dependency} from "../Dependency";
import {getDependency} from "../logic/getDependency";
import {IDependencyArgs} from "../types/IDependencyArgs";

export const useDependency = <T extends Dependency,
    A extends Dependency,
    B extends Dependency,
    C extends Dependency>(
    dependencyConstructor: { new(...args: IDependencyArgs<A, B, C, any>): T }
): T => {
    const context = useContext<IServicesProvider>(DependenciesContext);

    const dependency = useMemo(() => {
        return getDependency(dependencyConstructor, context);
    }, []);

    return dependency as T;
}