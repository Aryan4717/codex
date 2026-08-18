var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    const subset = [];

    const backtrack = (start) => {
        res.push([...subset]);

        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue;

            subset.push(nums[i]);
            backtrack(i + 1);
            subset.pop();
        }
    };

    backtrack(0);
    return res;
};
