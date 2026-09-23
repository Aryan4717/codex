var minOperations = function(nums, x) {
    const total = nums.reduce((sum, num) => sum + num, 0);
    const target = total - x;

    if (target < 0) return -1;
    if (target === 0) return nums.length;

    let left = 0;
    let sum = 0;
    let maxLen = -1;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        while (sum > target) {
            sum -= nums[left];
            left++;
        }

        if (sum === target) {
            maxLen = Math.max(maxLen, right - left + 1);
        }
    }

    return maxLen === -1 ? -1 : nums.length - maxLen;
};
