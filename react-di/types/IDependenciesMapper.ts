import {IDependencyDescription} from 'src/MyTools/react-di/types/IDependencyDescription';

export interface IDependenciesMapper {
    [key: string]: IDependencyDescription;
}