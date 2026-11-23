class ProductOfNumbers(object):
    def __init__(self):
        self.prefix = [1]

    def add(self, num):
        if num == 0:
            self.prefix = [1]  # Reset after zero.
        else:
            self.prefix.append(self.prefix[-1] * num)

    def getProduct(self, k):
        if k >= len(self.prefix):
            return 0  # The range includes a zero.
        return self.prefix[-1] // self.prefix[-k - 1]
