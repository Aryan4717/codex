class Solution(object):
    def smallestUniqueSubarray(self, nums):
        transitions = [{}]
        link = [-1]
        length = [0]
        count = [0]
        last = 0

        for value in nums:
            cur = len(length)
            transitions.append({})
            length.append(length[last] + 1)
            link.append(0)
            count.append(1)

            p = last
            while p != -1 and value not in transitions[p]:
                transitions[p][value] = cur
                p = link[p]

            if p != -1:
                q = transitions[p][value]
                if length[p] + 1 == length[q]:
                    link[cur] = q
                else:
                    clone = len(length)
                    transitions.append(transitions[q].copy())
                    length.append(length[p] + 1)
                    link.append(link[q])
                    count.append(0)

                    while p != -1 and transitions[p].get(value) == q:
                        transitions[p][value] = clone
                        p = link[p]

                    link[q] = clone
                    link[cur] = clone

            last = cur

        # Counting-sort states by length.
        buckets = [0] * (len(nums) + 1)
        for size in length:
            buckets[size] += 1
        for i in range(1, len(buckets)):
            buckets[i] += buckets[i - 1]

        order = [0] * len(length)
        for state in range(len(length) - 1, -1, -1):
            size = length[state]
            buckets[size] -= 1
            order[buckets[size]] = state

        # Propagate occurrence counts through suffix links.
        for state in reversed(order[1:]):
            count[link[state]] += count[state]

        return min(
            length[link[state]] + 1
            for state in range(1, len(length))
            if count[state] == 1
        )
