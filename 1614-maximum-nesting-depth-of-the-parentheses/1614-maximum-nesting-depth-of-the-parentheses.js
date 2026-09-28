var maxDepth = function(s) {
    let depth = 0;
    let maximum = 0;

    for (const char of s) {
        if (char === '(') {
            depth++;
            maximum = Math.max(maximum, depth);
        } else if (char === ')') {
            depth--;
        }
    }

    return maximum;
};
