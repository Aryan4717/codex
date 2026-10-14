var maxSumOfSquares = function(num, sum) {
    if (sum > 9 * num) return "";

    const nines = Math.floor(sum / 9);
    const remainder = sum % 9;

    return "9".repeat(nines)
        + (remainder ? String(remainder) : "")
        + "0".repeat(num - nines - (remainder ? 1 : 0));
};
