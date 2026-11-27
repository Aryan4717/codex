class Solution(object):
    def maximumSaleItems(self, items, budget):
        n = len(items)
        cheapest = min(price for _, price in items)

        # dp[cost] is the best total using first copies at exactly cost.
        dp = [-1] * (budget + 1)
        dp[0] = 0

        for i, (factor, price) in enumerate(items):
            free = sum(
                1 for j, (other_factor, _) in enumerate(items)
                if i != j and other_factor % factor == 0
            )
            value = 1 + free

            # Descending order ensures each first copy is selected at most once.
            for cost in range(budget, price - 1, -1):
                if dp[cost - price] >= 0:
                    dp[cost] = max(dp[cost], dp[cost - price] + value)

        # Fill remaining budget with cheapest copies.
        return max(
            dp[cost] + (budget - cost) // cheapest
            for cost in range(budget + 1)
            if dp[cost] >= 0
        )
