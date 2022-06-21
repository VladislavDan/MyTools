export interface IService {

}

export const ServiceInjector = <T extends IService[]>(services: T) =>{
    return (
        target: Object,
        propertyName: string,
        descriptor: PropertyDescriptor
    ) => {
        let originalMethod = descriptor.value;
        descriptor.value = function(...args: number[]){
            let returnValue = originalMethod.apply(this, [...args, services]);
            return returnValue;
        }
        return descriptor;
    }
}