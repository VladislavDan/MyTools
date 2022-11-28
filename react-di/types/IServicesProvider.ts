import {IDependency} from './IDependency';
import {IDependenciesMapper} from 'src/MyTools/react-di/types/IDependenciesMapper';

export interface IServicesProvider {
    dependenciesMapper: IDependenciesMapper;
    updateDependencies: (dependencyKey: string, dependencyConstructor: IDependency) => void
}