var hasValidPath = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const length = m + n - 1;

    if (length % 2 !== 0 || grid[0][0] !== '(' ||
        grid[m - 1][n - 1] !== ')') {
        return false;
    }

    const seen = new Set();

    function dfs(r, c, balance) {
        balance += grid[r][c] === '(' ? 1 : -1;

        const remaining = (m - 1 - r) + (n - 1 - c);
        if (balance < 0 || balance > remaining) return false;
        if (r === m - 1 && c === n - 1) return balance === 0;

        const key = `${r},${c},${balance}`;
        if (seen.has(key)) return false;
        seen.add(key);

        return (r + 1 < m && dfs(r + 1, c, balance)) ||
               (c + 1 < n && dfs(r, c + 1, balance));
    }

    return dfs(0, 0, 0);
};
