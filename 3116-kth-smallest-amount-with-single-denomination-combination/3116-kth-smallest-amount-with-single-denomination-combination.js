/**
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
var findKthSmallest = function(coins, k) {
    // Remove duplicates and sort
    coins = [...new Set(coins)].sort((a, b) => a - b);

    // If a coin is divisible by a smaller coin, it's useless
    const filtered = [];
    for (const c of coins) {
        let redundant = false;
        for (const f of filtered) {
            if (c % f === 0) {
                redundant = true;
                break;
            }
        }
        if (!redundant) filtered.push(c);
    }
    coins = filtered;

    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const lcm = (a, b) => a / gcd(a, b) * b;

    // Count how many numbers <= x are divisible by at least one coin
    const countMultiples = (x) => {
        let total = 0;
        const n = coins.length;

        const dfs = (idx, currLcm, bits) => {
            for (let i = idx; i < n; i++) {
                const nextLcm = lcm(currLcm, coins[i]);
                if (nextLcm > x) continue;

                const cnt = Math.floor(x / nextLcm);
                total += (bits % 2 === 0) ? cnt : -cnt;

                dfs(i + 1, nextLcm, bits + 1);
            }
        };

        dfs(0, 1, 0);
        return total;
    };

    let left = 1, right = Math.min(...coins) * k;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (countMultiples(mid) >= k) right = mid;
        else left = mid + 1;
    }

    return left;
};
