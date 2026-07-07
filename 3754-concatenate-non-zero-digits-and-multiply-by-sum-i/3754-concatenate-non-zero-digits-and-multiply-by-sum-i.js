var sumAndMultiply = function(n) {
    let s = String(n), x = "", sum = 0;
    for (let ch of s) {
        if (ch !== '0') x += ch, sum += +ch;
    }
    return x ? +x * sum : 0;
};
