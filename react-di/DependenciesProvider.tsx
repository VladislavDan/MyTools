import {createContext, FC, useRef} from 'react';
import {defaultServiceProvider} from './defaults/defaultServiceProvider';
import {useConstructor} from '../react-hooks/useConstructor';
import {IServicesProvider} from './types/IServicesProvider';
import {IDependency} from './types/IDependency';
import {IDependenciesMapper} from 'src/MyTools/react-di/types/IDependenciesMapper';

export const DependenciesContext = createContext<IServicesProvider>(defaultServiceProvider);

export const DependenciesProvider: FC<{ dependenciesMapper: IDependenciesMapper }> = (
    {dependenciesMapper, children}
) => {

    const ref = useRef(defaultServiceProvider);

    const updateDependencies = (dependencyKey: string, dependency: IDependency) => {
        ref.current.dependenciesMapper[dependencyKey].dependency = dependency;
    }

    useConstructor(() => {
        ref.current.dependenciesMapper = dependenciesMapper;
    });

    return <DependenciesContext.Provider value={{...ref.current, updateDependencies}}>
        {children}
    </DependenciesContext.Provider>
}