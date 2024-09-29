


export const base64ToBlob = (base64String:string) => {
    const binaryString = atob(base64String);
    const arrayBuffer = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        arrayBuffer[i] = binaryString.charCodeAt(i);
    }

    const blob =  new Blob([arrayBuffer], {type: "image/png"});
    const objectUrl = URL.createObjectURL(blob);
    return objectUrl;
}
