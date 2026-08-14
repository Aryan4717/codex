var maximumLengthSubstring = function(s) {
    const freq = new Map();
    let left = 0;
    let ans = 0;

    for (let right = 0; right < s.length; right++) {
        freq.set(s[right], (freq.get(s[right]) || 0) + 1);

        while (freq.get(s[right]) > 2) {
            freq.set(s[left], freq.get(s[left]) - 1);
            left++;
        }

        ans = Math.max(ans, right - left + 1);
    }

    return ans;
};
