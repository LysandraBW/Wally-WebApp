export const updateMessage = (formPart: string, output: boolean) => {
    if (!output)
        return `Unsuccessfully Updated ${formPart} Information`;
    return `Successfully Updated ${formPart} Information`;
}