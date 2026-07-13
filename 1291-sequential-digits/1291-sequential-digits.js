/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
var sequentialDigits = function(low, high) {
    // Base sequence from which all valid sequential numbers can be formed
    const digits = "123456789";
    
    // Store all valid results
    const result = [];

    // Sequential numbers can have lengths from 2 to 9
    for (let len = 2; len <= 9; len++) {
        // For a given length, generate all substrings of that length
        for (let start = 0; start + len <= digits.length; start++) {
            // Extract substring and convert it into a number
            const num = Number(digits.substring(start, start + len));

            // If the number is within the required range, include it
            if (num >= low && num <= high) {
                result.push(num);
            }
        }
    }

    return result;
};
