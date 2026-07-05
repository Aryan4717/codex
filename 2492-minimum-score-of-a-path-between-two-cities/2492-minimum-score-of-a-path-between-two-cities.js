var minScore = function(n, roads) {
    const graph = Array.from({ length: n + 1 }, () => []);
    
    for (const [a, b, d] of roads) {
        graph[a].push([b, d]);
        graph[b].push([a, d]);
    }
    
    const visited = new Array(n + 1).fill(false);
    let ans = Infinity;
    const queue = [1];
    let head = 0;
    visited[1] = true;
    
    while (head < queue.length) {
        const node = queue[head++];
        
        for (const [nei, dist] of graph[node]) {
            ans = Math.min(ans, dist);
            if (!visited[nei]) {
                visited[nei] = true;
                queue.push(nei);
            }
        }
    }
    
    return ans;
};
