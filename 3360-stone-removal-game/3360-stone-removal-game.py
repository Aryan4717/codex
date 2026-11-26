class Solution(object):
    def canAliceWin(self, n):
        required = 10
        alice_turn = True

        while required > 0 and n >= required:
            n -= required
            required -= 1
            alice_turn = not alice_turn

        # The player whose turn is next cannot move.
        return not alice_turn

