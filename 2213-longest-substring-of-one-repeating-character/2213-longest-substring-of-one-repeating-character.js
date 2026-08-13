/**
 * @param {string} s
 * @param {string} queryCharacters
 * @param {number[]} queryIndices
 * @return {number[]}
 */
var longestRepeating = function(s, queryCharacters, queryIndices) {
    const arr = s.split('');
    const n = arr.length;
    const tree = new Array(4 * n);

    function makeNode(ch) {
        return {
            leftChar: ch,
            rightChar: ch,
            prefixLen: 1,
            suffixLen: 1,
            bestLen: 1,
            len: 1
        };
    }

    function merge(left, right) {
        if (!left) return right;
        if (!right) return left;

        const node = {
            leftChar: left.leftChar,
            rightChar: right.rightChar,
            prefixLen: left.prefixLen,
            suffixLen: right.suffixLen,
            bestLen: Math.max(left.bestLen, right.bestLen),
            len: left.len + right.len
        };

        if (left.rightChar === right.leftChar) {
            node.bestLen = Math.max(node.bestLen, left.suffixLen + right.prefixLen);

            if (left.prefixLen === left.len) {
                node.prefixLen = left.len + right.prefixLen;
            }

            if (right.suffixLen === right.len) {
                node.suffixLen = right.len + left.suffixLen;
            }
        }

        return node;
    }

    function build(idx, l, r) {
        if (l === r) {
            tree[idx] = makeNode(arr[l]);
            return;
        }

        const mid = (l + r) >> 1;
        build(idx * 2, l, mid);
        build(idx * 2 + 1, mid + 1, r);
        tree[idx] = merge(tree[idx * 2], tree[idx * 2 + 1]);
    }

    function update(idx, l, r, pos, ch) {
        if (l === r) {
            tree[idx] = makeNode(ch);
            return;
        }

        const mid = (l + r) >> 1;
        if (pos <= mid) {
            update(idx * 2, l, mid, pos, ch);
        } else {
            update(idx * 2 + 1, mid + 1, r, pos, ch);
        }

        tree[idx] = merge(tree[idx * 2], tree[idx * 2 + 1]);
    }

    build(1, 0, n - 1);

    const ans = [];
    for (let i = 0; i < queryIndices.length; i++) {
        const pos = queryIndices[i];
        const ch = queryCharacters[i];
        arr[pos] = ch;
        update(1, 0, n - 1, pos, ch);
        ans.push(tree[1].bestLen);
    }

    return ans;
};
