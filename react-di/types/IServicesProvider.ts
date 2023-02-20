import {IDependenciesMap} from './IDependenciesMap';

export interface IServicesProvider {
    dependenciesMap: IDependenciesMap;
    updateDependency: (dependency: Object, key: string | number) => void;
}