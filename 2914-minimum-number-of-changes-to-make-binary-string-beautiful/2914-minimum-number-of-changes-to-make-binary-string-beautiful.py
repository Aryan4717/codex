class Solution(object):
    def minChanges(self, s):
        changes = 0

        # Each mismatched pair requires exactly one change.
        for i in range(0, len(s), 2):
            if s[i] != s[i + 1]:
                changes += 1

        return changes
