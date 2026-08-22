/**
 * @param {number} n
 * @return {boolean}
 */
var checkDivisibility = function(n) {
    let x = n;
    let sum = 0;
    let product = 1;

    while (x > 0) {
        const digit = x % 10;
        sum += digit;
        product *= digit;
        x = Math.floor(x / 10);
    }

    return n % (sum + product) === 0;
};
