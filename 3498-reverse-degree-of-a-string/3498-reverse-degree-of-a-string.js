var reverseDegree = function(s) {
    let degree = 0;

    for (let i = 0; i < s.length; i++) {
        const reverseValue = 123 - s.charCodeAt(i);
        degree += reverseValue * (i + 1);
    }

    return degree;
};
