import {useContext, useMemo} from 'react';
import {IServicesProvider} from '../types/IServicesProvider';
import {DependenciesContext} from '../DependenciesProvider';
import {getDependency} from '../logic/getDependency';
import {IDependency} from 'src/MyTools/react-di/types/IDependency';

export const useDependency = <D extends IDependency>(
    dependencyKey: string
) => {
    const context = useContext<IServicesProvider>(DependenciesContext);

    const dependency = useMemo(() => {
        return getDependency(dependencyKey as string, context);
    }, []);

    return dependency as D;
}