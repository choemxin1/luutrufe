class CommonUtils {
    static isNumber1 (number) {
        if (number === 1) return true;
        return false;
    }
    static getBase64(file) {
        return new Promise ((res, rej)=> {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => res(reader.result);
            reader.onerror = error => rej(error);
        });
    }
}

export default CommonUtils;