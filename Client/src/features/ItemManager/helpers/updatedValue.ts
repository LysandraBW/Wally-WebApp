export const updatedValue = <T>(prev: T, curr: T) => {
    return prev === curr ? null : curr;
}