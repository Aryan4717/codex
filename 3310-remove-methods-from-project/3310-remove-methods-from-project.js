var remainingMethods = function(n, k, invocations) {
    const graph = Array.from({ length: n }, () => []);
    
    for (const [a, b] of invocations) {
        graph[a].push(b);
    }

    const suspicious = new Array(n).fill(false);
    const stack = [k];
    suspicious[k] = true;

    // Find all methods reachable from k
    while (stack.length) {
        const node = stack.pop();
        for (const nei of graph[node]) {
            if (!suspicious[nei]) {
                suspicious[nei] = true;
                stack.push(nei);
            }
        }
    }

    // If any outside method invokes a suspicious one, removal is impossible
    for (const [a, b] of invocations) {
        if (!suspicious[a] && suspicious[b]) {
            return Array.from({ length: n }, (_, i) => i);
        }
    }

    // Return remaining non-suspicious methods
    const ans = [];
    for (let i = 0; i < n; i++) {
        if (!suspicious[i]) ans.push(i);
    }
    return ans;
};
