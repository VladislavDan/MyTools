export const jsonEqual = <T>(args: { value: T, other: T }) => {
    const {value, other} = args;

    console.log(value, other)

    if(typeof value !== 'object') {
        return value === other;
    }

    if(value instanceof Array && other instanceof Array) {
       if(value.length !== other.length) {
           return false;
       }
    }
    console.log('checked')

    return JSON.stringify(value) === JSON.stringify(other);
}