//Helper function for iteration that returns a list of length n
//    where each element is the value of the iterator at that position in the list
//    @param: n int representing length of list
//    @param: start int representing start value of iterator
//    @param: step representing value to increment iterator by for adjacent elements
//    @return: list of length n with elements being value of chosen iterator at that index in the list

function range(n, start, step) {
    start = start || 0;
    step = step || 1;
    var ret = [];
    for (var i = start; i < start + step * n; i += step) {
        ret.push(i);
    }
    return ret;
}

//Helper function for iteration
//    Recursively iterates from from value to to value with a step of step and applies a function f to that value
//    @param: from int representing start value of iteration
//    @param: to int representing end value of iteration (non-inclusive)
//    @param: step int representing increment of iteration value
//    @f: function that is called on each value of iterator

function from_to(from, to, step, f) {
    if (from >= to) return;
    f(from); from_to(from + step, to, step, f);
}