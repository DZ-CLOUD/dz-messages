function randomHexCode() {
    const hexCodeChars = '0123456789ABCDEF';
    let hexCode = '';
    for (let i = 0; i < 6; i++) {
        hexCode += hexCodeChars.charAt(Math.floor(Math.random() * hexCodeChars.length));
    }
    return hexCode;
}

module.exports = { randomHexCode }