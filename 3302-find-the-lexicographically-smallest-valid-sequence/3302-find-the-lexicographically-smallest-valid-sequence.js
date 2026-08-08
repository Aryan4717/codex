var validSequence = function(word1, word2) {
    const n = word1.length, m = word2.length;
    const suf = Array(n + 1).fill(0);

    let j = m - 1;
    for (let i = n - 1; i >= 0; i--) {
        if (j >= 0 && word1[i] === word2[j]) j--;
        suf[i] = m - 1 - j; // matched suffix length from i
    }

    const ans = [];
    let usedMismatch = false;
    let i = 0, k = 0;

    while (i < n && k < m) {
        if (word1[i] === word2[k]) {
            ans.push(i);
            i++;
            k++;
        } else {
            if (!usedMismatch) {
                const remaining = m - (k + 1);
                const matchedLater = (i + 1 <= n) ? suf[i + 1] : 0;
                if (matchedLater >= remaining) {
                    ans.push(i);
                    usedMismatch = true;
                    i++;
                    k++;
                    continue;
                }
            }
            i++;
        }
    }

    return k === m ? ans : [];
};
