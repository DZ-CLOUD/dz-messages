// Beispielwert für public_flags
const publicFlags: number = 1 + 64 + 512 + 16384;

// Definiere die Bitflag-Werte
const flags = {
    EMPLOYEE: 1,
    PARTNERED_SERVER_OWNER: 2,
    HYPE_SQUAD_EVENTS: 4,
    BUG_HUNTER_LEVEL_1: 8,
    HOUSE_BRAVERY: 64,
    HOUSE_BRILLIANCE: 128,
    HOUSE_BALANCE: 256,
    EARLY_SUPPORTER: 512,
    BUG_HUNTER_LEVEL_2: 16384
};

// Funktion zum Überprüfen, ob ein bestimmtes Flag gesetzt ist
function checkFlag(flag: number) {
    return (publicFlags & flag) === flag;
}

// Überprüfe spezifische Flags
console.log("House Bravery:", checkFlag(flags.HOUSE_BRAVERY)); // true
console.log("House Brilliance:", checkFlag(flags.HOUSE_BRILLIANCE)); // true
console.log("House Balance:", checkFlag(flags.HOUSE_BALANCE)); // true
console.log("Bug Hunter Level 2:", checkFlag(flags.BUG_HUNTER_LEVEL_2)); // true

// Überprüfe andere Flags
console.log("Employee:", checkFlag(flags.EMPLOYEE)); // false
console.log("Early Supporter:", checkFlag(flags.EARLY_SUPPORTER)); // false
