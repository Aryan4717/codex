/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumSafenessFactor = function(grid) {
    const n = grid.length;
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

    // Step 1: Multi source BFS to find distance of every cell from nearest thief
    const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));
    const queue = [];
    let head = 0;

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 1) {
                dist[r][c] = 0;
                queue.push([r, c]);
            }
        }
    }

    while (head < queue.length) {
        const [r, c] = queue[head++];

        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;

            if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] === Infinity) {
                dist[nr][nc] = dist[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
    }

    // If start or end has a thief, safeness is 0
    if (dist[0][0] === 0 || dist[n - 1][n - 1] === 0) return 0;

    // Max heap implementation
    class MaxHeap {
        constructor() {
            this.heap = [];
        }
        push(item) {
            this.heap.push(item);
            this._bubbleUp(this.heap.length - 1);
        }
        pop() {
            if (this.heap.length === 1) return this.heap.pop();
            const top = this.heap[0];
            this.heap[0] = this.heap.pop();
            this._bubbleDown(0);
            return top;
        }
        isEmpty() {
            return this.heap.length === 0;
        }
        _bubbleUp(i) {
            while (i > 0) {
                const p = Math.floor((i - 1) / 2);
                if (this.heap[p][0] >= this.heap[i][0]) break;
                [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
                i = p;
            }
        }
        _bubbleDown(i) {
            const n = this.heap.length;
            while (true) {
                let largest = i;
                const l = 2 * i + 1;
                const r = 2 * i + 2;

                if (l < n && this.heap[l][0] > this.heap[largest][0]) largest = l;
                if (r < n && this.heap[r][0] > this.heap[largest][0]) largest = r;

                if (largest === i) break;
                [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
                i = largest;
            }
        }
    }

    // Step 2: Dijkstra like traversal maximizing minimum safeness
    const best = Array.from({ length: n }, () => Array(n).fill(-1));
    const heap = new MaxHeap();

    heap.push([dist[0][0], 0, 0]);
    best[0][0] = dist[0][0];

    while (!heap.isEmpty()) {
        const [safe, r, c] = heap.pop();

        if (r === n - 1 && c === n - 1) return safe;
        if (safe < best[r][c]) continue;

        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;

            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                const newSafe = Math.min(safe, dist[nr][nc]);

                if (newSafe > best[nr][nc]) {
                    best[nr][nc] = newSafe;
                    heap.push([newSafe, nr, nc]);
                }
            }
        }
    }

    return 0;
};
