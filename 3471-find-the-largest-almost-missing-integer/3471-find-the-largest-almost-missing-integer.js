/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestInteger = function(nums, k) {
    const n = nums.length;
    const maxStart = n - k;

    const pos = new Map();
    for (let i = 0; i < n; i++) {
        if (!pos.has(nums[i])) pos.set(nums[i], []);
        pos.get(nums[i]).push(i);
    }

    let ans = -1;

    for (const [val, arr] of pos) {
        let covered = 0;
        let l = -1, r = -1;

        for (const i of arr) {
            const start = Math.max(0, i - k + 1);
            const end = Math.min(i, maxStart);

            if (start > end) continue;

            if (l === -1) {
                l = start;
                r = end;
            } else if (start > r + 1) {
                covered += r - l + 1;
                l = start;
                r = end;
            } else {
                r = Math.max(r, end);
            }
        }

        if (l !== -1) covered += r - l + 1;

        if (covered === 1) ans = Math.max(ans, val);
    }

    return ans;
};
