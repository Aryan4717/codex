/**
 * @param {number} n
 * @param {number[]} nums
 * @param {number} maxDiff
 * @param {number[][]} queries
 * @return {number[]}
 */
var pathExistenceQueries = function(n, nums, maxDiff, queries) {
    // Store [value, originalIndex] and sort by value
    const arr = nums.map((value, index) => [value, index]);
    arr.sort((a, b) => a[0] - b[0]);

    // pos[originalIndex] = position in sorted array
    const pos = new Array(n);
    for (let i = 0; i < n; i++) {
        pos[arr[i][1]] = i;
    }

    // next[i] = farthest sorted index reachable from i in one edge
    const next = new Array(n);
    let r = 0;
    for (let i = 0; i < n; i++) {
        while (r + 1 < n && arr[r + 1][0] - arr[i][0] <= maxDiff) {
            r++;
        }
        next[i] = r;
    }

    // Build connected components in sorted order
    const comp = new Array(n);
    let cid = 0;
    comp[0] = 0;
    for (let i = 1; i < n; i++) {
        if (arr[i][0] - arr[i - 1][0] > maxDiff) cid++;
        comp[i] = cid;
    }

    // Binary lifting table
    const LOG = 20;
    const up = Array.from({ length: LOG }, () => new Array(n));

    for (let i = 0; i < n; i++) {
        up[0][i] = next[i];
    }

    for (let k = 1; k < LOG; k++) {
        for (let i = 0; i < n; i++) {
            up[k][i] = up[k - 1][up[k - 1][i]];
        }
    }

    const answer = [];

    for (const [u, v] of queries) {
        let left = pos[u];
        let right = pos[v];

        if (left > right) [left, right] = [right, left];

        // Different components means no path
        if (comp[left] !== comp[right]) {
            answer.push(-1);
            continue;
        }

        // Same node
        if (left === right) {
            answer.push(0);
            continue;
        }

        // Find minimum jumps using binary lifting
        let curr = left;
        let steps = 0;

        for (let k = LOG - 1; k >= 0; k--) {
            if (up[k][curr] < right) {
                curr = up[k][curr];
                steps += 1 << k;
            }
        }

        // One final jump reaches or passes right
        answer.push(steps + 1);
    }

    return answer;
};
