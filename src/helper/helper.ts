export const generateRandomNum =async (length: number) => {

    var digits = '0123456789';
    let NUM = '';
    for (let i = 0; i < length; i++ ) {
        NUM += digits[Math.floor(Math.random() * 10)];
    }
    return NUM;
}

export const generateRandomStr =async (length: number) => {

    var digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let STR = '';
    for (let i = 0; i < length; i++ ) {
        STR += digits[Math.floor(Math.random() * 10)];
    }
    return STR;
}

export const generateRandomAlphanumeric =async (length: number) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const allChars = letters + numbers;

    let result = '';

    // Ensure at least one letter
    result += letters.charAt(Math.floor(Math.random() * letters.length));

    // Ensure at least one number
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));

    // Fill the rest
    for (let i = 2; i < length; i++) {
        result += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    // Shuffle result to randomize positions
    return result.split('').sort(() => 0.5 - Math.random()).join('');
}
