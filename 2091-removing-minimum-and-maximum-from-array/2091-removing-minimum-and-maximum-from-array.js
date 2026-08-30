/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDeletions = function(nums) {
    let minIdx = 0, maxIdx = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < nums[minIdx]) minIdx = i;
        if (nums[i] > nums[maxIdx]) maxIdx = i;
    }

    let left = Math.min(minIdx, maxIdx);
    let right = Math.max(minIdx, maxIdx);
    let n = nums.length;

    return Math.min(
        right + 1,              // remove both from front
        n - left,               // remove both from back
        (left + 1) + (n - right) // one from front, one from back
    );
};

