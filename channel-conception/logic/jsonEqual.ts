export const jsonEqual = <T>(args: { value: T, other: T }) => {
    const {value, other} = args;
    return JSON.stringify(value) === JSON.stringify(other);
}