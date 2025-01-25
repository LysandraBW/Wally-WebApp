export const filesToFormData = (fileList: FileList | null | undefined, formData: FormData = new FormData()): FormData => {
    if (!fileList)
        return formData;
    for (let i = 0; i < fileList.length; i++)
        formData.append('Files', fileList[i]);
    return formData;
}