export const updateMessage = (output: boolean) => {
    if (!output)
        return `Unsuccessfully Updated Information`;
    return `Successfully Updated Information`;
}