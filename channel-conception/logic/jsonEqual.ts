export const jsonEqual = <T>(args: { value: T, other: T }) => {
    const {value, other} = args;

    if(typeof value !== 'object') {
        return value === other;
    }

    return JSON.stringify(value) === JSON.stringify(other);
}
