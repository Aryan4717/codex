var sumCounts = function(nums) {
    let total = 0;

    for (let start = 0; start < nums.length; start++) {
        const seen = new Set();

        for (let end = start; end < nums.length; end++) {
            seen.add(nums[end]);
            total += seen.size * seen.size;
        }
    }

    return total;
};
