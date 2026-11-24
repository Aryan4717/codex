class Solution(object):
    def maxLength(self, nums):
        last_seen = {}
        left = 0
        best = min(2, len(nums))  # Every two-element subarray qualifies.

        for right, value in enumerate(nums):
            factors = []
            x = value
            prime = 2

            # Extract distinct prime factors.
            while prime * prime <= x:
                if x % prime == 0:
                    factors.append(prime)
                    while x % prime == 0:
                        x //= prime
                prime += 1

            if x > 1:
                factors.append(x)

            # Exclude any prior element sharing a prime factor.
            for prime in factors:
                left = max(left, last_seen.get(prime, -1) + 1)
                last_seen[prime] = right

            best = max(best, right - left + 1)

        return best
