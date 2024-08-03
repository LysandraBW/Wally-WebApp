export const fileListToFormData = (fileList: FileList): FormData => {
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++)
        formData.append('Files', fileList[i]);
    return formData;
}