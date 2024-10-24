const crypto = require('crypto');

// Function to generate a weekly passcode
function generatePasscode() {
    const specialCharacters = '!@#$%^&*';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';

    return [
        letters.charAt(crypto.randomInt(letters.length)),
        letters.charAt(crypto.randomInt(letters.length)).toLowerCase(),
        letters.charAt(crypto.randomInt(letters.length)).toUpperCase(),
        digits.charAt(crypto.randomInt(digits.length)),
        specialCharacters.charAt(crypto.randomInt(specialCharacters.length))
    ].join('');
}

module.exports = generatePasscode;
