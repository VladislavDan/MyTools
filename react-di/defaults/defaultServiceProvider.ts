import {IServicesProvider} from '../types/IServicesProvider';
import {IDependency} from 'src/MyTools/react-di/types/IDependency';

export const defaultServiceProvider: IServicesProvider = {
    dependenciesMapper: {},
    updateDependencies: (key: string, dependency: IDependency) => {
    }
};