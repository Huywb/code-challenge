var sum_to_n_a = function(n) {
    var result = 0
    for(let i = 0;i<=n;i++){
        result += i
    }
    return result
};

var sum_to_n_b = function(n) {
    var result = 0 
    while(n>0){
        result +=n
        n--
    }
    return result
};

var sum_to_n_c = function(n) {
    if(n == 0) return 0
    return n + sum_to_n_c(n-1)
};

console.log(sum_to_n_a(5))
console.log(sum_to_n_b(5))
console.log(sum_to_n_c(5))