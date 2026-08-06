/**
 * @param {number} n
 * @param {number} t
 * @return {number}
 */
var smallestNumber = function(n, t) {
    const productOfDigits = (num) => {
        let prod = 1;
        while (num > 0) {
            prod *= num % 10;
            num = Math.floor(num / 10);
        }
        return prod;
    };

    while (true) {
        if (productOfDigits(n) % t === 0) return n;
        n++;
    }
};
