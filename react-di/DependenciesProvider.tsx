import {createContext, FC, useRef} from 'react';
import {defaultServiceProvider} from './defaults/defaultServiceProvider';
import {IServicesProvider} from './types/IServicesProvider';
import {IDependenciesMap} from './types/IDependenciesMap';

export const DependenciesContext = createContext<IServicesProvider>(defaultServiceProvider);

export const DependenciesProvider: FC<{ dependenciesMap: IDependenciesMap }> = (
    {dependenciesMap, children}
) => {

    const ref = useRef(dependenciesMap);

    const updateDependency = (dependency: Object, key: string | number) => {
        ref.current[key].dependency = dependency;
    }

    return <DependenciesContext.Provider value={{dependenciesMap: ref.current, updateDependency}}>
        {children}
    </DependenciesContext.Provider>
}