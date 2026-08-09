var stoneGameII = function(piles) {
    const n = piles.length;
    const suffix = Array(n + 1).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        suffix[i] = suffix[i + 1] + piles[i];
    }

    const memo = Array.from({ length: n }, () => Array(n + 1).fill(-1));

    function dp(i, m) {
        if (i >= n) return 0;

        if (i + 2 * m >= n) {
            return suffix[i];
        }

        if (memo[i][m] !== -1) {
            return memo[i][m];
        }

        let best = 0;

        for (let x = 1; x <= 2 * m; x++) {
            const opponent = dp(i + x, Math.max(m, x));
            const current = suffix[i] - opponent;
            best = Math.max(best, current);
        }

        memo[i][m] = best;
        return best;
    }

    return dp(0, 1);
};
