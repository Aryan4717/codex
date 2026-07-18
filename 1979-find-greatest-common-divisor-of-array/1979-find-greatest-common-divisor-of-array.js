var findGCD = function(nums) {
    let a = Math.min(...nums), b = Math.max(...nums);
    while (b) [a, b] = [b, a % b];
    return a;
};
