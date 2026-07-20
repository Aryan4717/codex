/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const total = m * n;
    
    k = k % total;
    
    const res = Array.from({ length: m }, () => Array(n));
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const oldIndex = i * n + j;
            const newIndex = (oldIndex + k) % total;
            
            const newRow = Math.floor(newIndex / n);
            const newCol = newIndex % n;
            
            res[newRow][newCol] = grid[i][j];
        }
    }
    
    return res;
};
