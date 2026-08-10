/**
 * @param {number} n
 * @return {boolean}
 */
var winnerSquareGame = function(n) {
    const dp = new Array(n + 1).fill(false);

    for (let stones = 1; stones <= n; stones++) {
        for (let move = 1; move * move <= stones; move++) {
            if (!dp[stones - move * move]) {
                dp[stones] = true;
                break;
            }
        }
    }

    return dp[n];
};
