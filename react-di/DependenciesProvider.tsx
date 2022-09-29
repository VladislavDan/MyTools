import {createContext, FC, useRef} from "react";
import {defaultServiceProvider} from "./defaults/defaultServiceProvider";
import {useConstructor} from "../react-hooks/useConstructor";
import {IServicesProvider} from "./types/IServicesProvider";
import {Dependency} from "./Dependency";
import {IDependencyArgs} from "./types/IDependencyArgs";

export const DependenciesContext = createContext<IServicesProvider>(defaultServiceProvider);

export const DependenciesProvider: FC<{ functions: { new(...args: IDependencyArgs<any, any, any, any>): Dependency }[] }> = (
    {functions, children}
) => {

    const ref = useRef(defaultServiceProvider);

    const updateDependenciesClasses = (classInstance: Dependency) => {
        const dependencyKey = classInstance.constructor.name;
        ref.current.dependenciesClasses[dependencyKey] = classInstance;
    }

    useConstructor(() => {
        functions.forEach((func) => {
            ref.current.dependenciesConstructors[func.name] = func;
        })
    });

    return <DependenciesContext.Provider value={{...ref.current, updateDependenciesClasses}}>
        {children}
    </DependenciesContext.Provider>
}