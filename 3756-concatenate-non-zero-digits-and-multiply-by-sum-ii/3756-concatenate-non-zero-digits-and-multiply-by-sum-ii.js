/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var sumAndMultiply = function(s, queries) {
    const MOD = 1000000007n;
    const n = s.length;

    const pow10 = Array(n + 1).fill(0n);
    pow10[0] = 1n;
    for (let i = 1; i <= n; i++) {
        pow10[i] = (pow10[i - 1] * 10n) % MOD;
    }

    const size = 4 * n;
    const segLen = Array(size).fill(0);
    const segSum = Array(size).fill(0n);
    const segVal = Array(size).fill(0n);

    function pull(idx) {
        const l = idx * 2, r = idx * 2 + 1;
        segLen[idx] = segLen[l] + segLen[r];
        segSum[idx] = (segSum[l] + segSum[r]) % MOD;
        segVal[idx] = (segVal[l] * pow10[segLen[r]] + segVal[r]) % MOD;
    }

    function build(idx, left, right) {
        if (left === right) {
            const d = s.charCodeAt(left) - 48;
            if (d !== 0) {
                segLen[idx] = 1;
                segSum[idx] = BigInt(d);
                segVal[idx] = BigInt(d);
            }
            return;
        }
        const mid = (left + right) >> 1;
        build(idx * 2, left, mid);
        build(idx * 2 + 1, mid + 1, right);
        pull(idx);
    }

    function query(idx, left, right, ql, qr) {
        if (ql <= left && right <= qr) {
            return [segLen[idx], segSum[idx], segVal[idx]];
        }

        const mid = (left + right) >> 1;
        if (qr <= mid) return query(idx * 2, left, mid, ql, qr);
        if (ql > mid) return query(idx * 2 + 1, mid + 1, right, ql, qr);

        const a = query(idx * 2, left, mid, ql, qr);
        const b = query(idx * 2 + 1, mid + 1, right, ql, qr);

        const len = a[0] + b[0];
        const sum = (a[1] + b[1]) % MOD;
        const val = (a[2] * pow10[b[0]] + b[2]) % MOD;
        return [len, sum, val];
    }

    build(1, 0, n - 1);

    const ans = [];
    for (const [l, r] of queries) {
        const [len, sum, val] = query(1, 0, n - 1, l, r);
        ans.push(Number((val * sum) % MOD));
    }
    return ans;
};
