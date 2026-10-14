/**
 * @param {number} num
 * @param {number} sum
 * @return {string}
 */
var maxSumOfSquares = function(num, sum) {

    if(sum > 9 * num ) return "";
    let remaining = sum ;
    const digits = [];

    for(let i = 0 ; i< num  ; i++){
        const digit = Math.min(9 , remaining);
        digits.push(String(digit));
        remaining -= digit;
    }

    return digits.join("");
    
};


// a and b  with a >=b>o . moving one unit from b to a changes score by 

// (a+1)^2 +(b-1)^2 - a^2 - b^2 = 2(a-b)+ 2 > 0 .










