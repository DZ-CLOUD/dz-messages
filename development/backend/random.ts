function randomHexCode():string {
    const hexCodeChars:string = '0123456789ABCDEF';
    let hexCode:string = '';
    for (let i:number = 0; i < 6; i++) {
        hexCode += hexCodeChars.charAt(Math.floor(Math.random() * hexCodeChars.length));
    }
    return hexCode;
}

console.log(randomHexCode())