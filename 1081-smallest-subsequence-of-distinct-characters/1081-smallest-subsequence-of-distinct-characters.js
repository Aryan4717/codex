var smallestSubsequence = function(s) {
    const lastIndex = {};
    for (let i = 0; i < s.length; i++) {
        lastIndex[s[i]] = i;
    }

    const stack = [];
    const seen = new Set();

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];

        if (seen.has(ch)) continue;

        while (
            stack.length &&
            ch < stack[stack.length - 1] &&
            lastIndex[stack[stack.length - 1]] > i
        ) {
            seen.delete(stack.pop());
        }

        stack.push(ch);
        seen.add(ch);
    }

    return stack.join("");
};
