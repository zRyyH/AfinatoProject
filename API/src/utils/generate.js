export function generateNumber(startNumber, endNumber) {
    return Math.floor(Math.random() * (endNumber - startNumber)) + startNumber;
}