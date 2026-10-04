var checkValidString = function(s) {
    let low = 0;
    let high = 0;

    for (const char of s) {
        if (char === '(') {
            low++;
            high++;
        } else if (char === ')') {
            low--;
            high--;
        } else {
            low--;   
            high++;  
        }

        if (high < 0) return false;
        low = Math.max(low, 0);
    }

    return low === 0;
};
