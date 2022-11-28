import {IDependencyFunction} from 'src/MyTools/react-di/types/IDependencyFunction';
import {IDependency} from 'src/MyTools/react-di/types/IDependency';

export interface IDependencyDescription {
    dependencyFunction: IDependencyFunction<IDependency>;
    childDependenciesKeys: string[];
    dependency?: IDependency | null;
}