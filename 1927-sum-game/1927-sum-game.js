/**
 * @param {string} num
 * @return {boolean}
 */
var sumGame = function(num) {
    const n = num.length;
    const half = n / 2;

    let sumLeft = 0, sumRight = 0;
    let qLeft = 0, qRight = 0;

    for (let i = 0; i < half; i++) {
        if (num[i] === '?') qLeft++;
        else sumLeft += num.charCodeAt(i) - 48;
    }

    for (let i = half; i < n; i++) {
        if (num[i] === '?') qRight++;
        else sumRight += num.charCodeAt(i) - 48;
    }

    const diff = sumLeft - sumRight;

    return 2 * diff !== 9 * (qRight - qLeft);
};
