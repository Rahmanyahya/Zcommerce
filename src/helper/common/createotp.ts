export function generateRandomNumbers(): string {
    let numbers = [];
    for (let i = 0; i < 6; i++) {
        numbers.push(Math.floor(Math.random() * 10)); // Angka 0-9
    }
    return numbers.join('');
}