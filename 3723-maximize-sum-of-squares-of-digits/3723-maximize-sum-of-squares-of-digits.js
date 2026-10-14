var maxSumOfSquares = function(num, sum) {
    if (sum > 9 * num) return "";

    let remaining = sum;
    const digits = [];

    for (let i = 0; i < num; i++) {
        const digit = Math.min(9, remaining);
        digits.push(String(digit));
        remaining -= digit;
    }

    return digits.join("");
};
