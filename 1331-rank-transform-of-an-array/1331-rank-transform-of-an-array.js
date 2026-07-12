var arrayRankTransform = function(arr) {
    // Create sorted unique values
    const sortedUnique = [...new Set(arr)].sort((a, b) => a - b);

    // Map each value to its rank
    const rankMap = new Map();
    for (let i = 0; i < sortedUnique.length; i++) {
        rankMap.set(sortedUnique[i], i + 1);
    }

    // Build result using original array order
    return arr.map(num => rankMap.get(num));
};
