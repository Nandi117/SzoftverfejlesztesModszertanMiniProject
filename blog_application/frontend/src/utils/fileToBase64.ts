


export const convertFileToBase64 = (file:File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload
            = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}



export const extractBase64Data = (base64String:any) => {

    const commaIndex = base64String.indexOf(',');
    if (commaIndex >= 0) {
        return base64String.substring(commaIndex + 1);
    } else {

        return null;
    }
}