/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var gcdValues = function(nums, queries) {
    let maxVal = 0;
    for (const x of nums) maxVal = Math.max(maxVal, x);

    const freq = new Array(maxVal + 1).fill(0);
    for (const x of nums) freq[x]++;

    // divCount[g] = how many numbers in nums are divisible by g
    const divCount = new Array(maxVal + 1).fill(0);
    for (let g = 1; g <= maxVal; g++) {
        for (let multiple = g; multiple <= maxVal; multiple += g) {
            divCount[g] += freq[multiple];
        }
    }

    // exact[g] = number of pairs with gcd exactly g
    const exact = new Array(maxVal + 1).fill(0);
    for (let g = maxVal; g >= 1; g--) {
        let c = divCount[g];
        let pairs = c * (c - 1) / 2;

        for (let multiple = g + g; multiple <= maxVal; multiple += g) {
            pairs -= exact[multiple];
        }

        exact[g] = pairs;
    }

    // prefix over gcd values
    const prefix = new Array(maxVal + 1).fill(0);
    for (let g = 1; g <= maxVal; g++) {
        prefix[g] = prefix[g - 1] + exact[g];
    }

    const answer = [];

    for (const q of queries) {
        let left = 1, right = maxVal;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (prefix[mid] > q) right = mid;
            else left = mid + 1;
        }
        answer.push(left);
    }

    return answer;
};
