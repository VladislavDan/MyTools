export const jsonEqual = <T>(args: { value: T, other: T }) => {
    const {value, other} = args;

    if(typeof value !== 'object') {
        return value === other;
    }

    if(value instanceof Array && other instanceof Array) {
       if(value.length !== other.length) {
           return false;
       }
    }

    return JSON.stringify(value) === JSON.stringify(other);
}