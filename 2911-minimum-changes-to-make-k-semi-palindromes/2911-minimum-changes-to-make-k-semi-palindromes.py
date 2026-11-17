class Solution(object):
    def minimumChanges(self, s, k):
        n = len(s)
        inf = n + 1
        cost = [[inf] * (n + 1) for _ in range(n)]

        # Process each proper divisor as the stride between group members.
        for d in range(1, n // 2 + 1):
            # inner[i][j] stores palindrome mismatch costs for stride d.
            inner = [[0] * n for _ in range(n)]
            for i in range(n - 1, -1, -1):
                for j in range(i + d, n, d):
                    inner[i][j] = (
                        (s[i] != s[j]) +
                        (inner[i + d][j - d] if i + d < j else 0)
                    )

            # Combine the d interleaved palindrome groups.
            for length in range(2 * d, n + 1, d):
                for start in range(n - length + 1):
                    end = start + length
                    changes = 0
                    for offset in range(d):
                        changes += inner[start + offset][end - d + offset]
                    cost[start][end] = min(cost[start][end], changes)

        # Partition prefixes into exactly the requested number of parts.
        dp = [inf] * (n + 1)
        dp[0] = 0
        for parts in range(1, k + 1):
            next_dp = [inf] * (n + 1)
            for end in range(2 * parts, n + 1):
                for start in range(2 * (parts - 1), end - 1):
                    next_dp[end] = min(
                        next_dp[end], dp[start] + cost[start][end]
                    )
            dp = next_dp

        return dp[n]
