var nodesBetweenCriticalPoints = function(head) {
    let prev = head, curr = head.next, next = curr ? curr.next : null;
    let index = 1;

    let first = -1, last = -1;
    let minDist = Infinity;

    while (next) {
        const isCritical =
            (curr.val > prev.val && curr.val > next.val) ||
            (curr.val < prev.val && curr.val < next.val);

        if (isCritical) {
            if (first === -1) {
                first = index;
            } else {
                minDist = Math.min(minDist, index - last);
            }
            last = index;
        }

        prev = curr;
        curr = next;
        next = next.next;
        index++;
    }

    if (first === -1 || first === last) return [-1, -1];
    return [minDist, last - first];
};
