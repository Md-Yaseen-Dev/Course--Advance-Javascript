
// /*
// Currying
// Currying is an advanced technique of working with functions. It’s used not only in JavaScript, but in other languages as well.

// Currying is a transformation of functions that translates a function from callable as f(a, b, c) into callable as f(a)(b)(c).

// Currying doesn’t call a function. It just transforms it.

// Let’s see an example first, to better understand what we’re talking about, and then practical applications.

// We’ll create a helper function curry(f) that performs currying for a two-argument f. In other words, curry(f) for two-argument f(a, b) translates it into a function that runs as f(a)(b):
// */

// function curry(f){
//     return function (a){
//         return function (b) {
//             return f(a,b);
//         };
//   };
// }

// function sum (a,b){
//     return a+b;
// }
// let curried = curry(sum);

// console.log(curried(1)(3));


// /*More advanced implementions of currying such as _.curry from lodash library.return a wrapper that allows a function to be called both normally partially
// */

// function sum1(a,b){
//     return a + b ;
// }

// let curriedsum = _.curry(sum1);


// console.log(curriedsum(5, 10));


// Advanced curry implementation

/*In case you would like to get in to the details here the advanced curry implementation for multi-argument functions that we could use above */

function curry(func){

    return function curried(...args){
        if(args.length >= func.length){
            return func.apply(this,args);
        }else{
            return function(...args2){
                return curried.apply(thismargs,concat(args2))
            }
        }
    }
}

// The new curry may look complicated but it's actually easy to understand.

                                                                                                                                                                                                                           