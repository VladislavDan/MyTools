import {useContext, useMemo} from 'react';
import {IServicesProvider} from '../types/IServicesProvider';
import {DependenciesContext} from '../DependenciesProvider';
import {getDependency} from '../logic/getDependency';

export const useDependencyContext = <T>(dependencyKey: string | number): T => {
    const context = useContext<IServicesProvider>(DependenciesContext);

    const dependency = useMemo(() => {
        return getDependency(dependencyKey, context);
    }, []);

    return dependency as T;
}