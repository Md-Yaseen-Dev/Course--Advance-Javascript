//                      ----Recursion and stack-----

// let's return to functions and study them more in depth.

// ---- Our first topic will be recurison

// If you are not new to programming, then it is probably familiar and you could skip this chapter.


// Recursion is a programming pattern that is useful in situations when a task can be naturally split into several tasks of the same kind, but simpler. Or when a task can be simplified into an easy action plus a simpler varaint of the same task. Or, as we will see soon, to deal with certain data structure.


// ? Two ways of thinking

//  For something simple to start with- lets write a function pow(x,n) that raises x to a natural power of n. In other words, multiples x by itself n times.

//  pow(2,2) = 4 
//  pow(2,3) = 8 
//  pow(2,4) = 16


// 1.  Iterative thinking the for loop

function pow(x,n){

    let result = 1 ;

    // multiply result by x n times in the loop

    for (let i=0; i< n ; i++){
        result *= x;
    }
    return result
}

console.log(pow(2,3)); // 8


// 2.  recursive thinking simplify the task and call self.


function pow1(x,n){
if(n==1){
return x;
} else{

    return x * pow (x, n-1);

}
}
console.log(pow(2,3))


// The execution context and stack
// Now let’s examine how recursive calls work. For that we’ll look under the hood of functions.

// The information about the process of execution of a running function is stored in its execution context.

// The execution context is an internal data structure that contains details about the execution of a function: where the control flow is now, the current variables, the value of this (we don’t use it here) and few other internal details.

// One function call has exactly one execution context associated with it.

// When a function makes a nested call, the following happens:

// The current function is paused.
// The execution context associated with it is remembered in a special data structure called execution context stack.
// The nested call executes.
// After it ends, the old execution context is retrieved from the stack, and the outer function is resumed from where it stopped.
// Let’s see what happens during the pow(2, 3) call.

// pow(2, 3)
// In the beginning of the call pow(2, 3) the execution context will store variables: x = 2, n = 3, the execution flow is at line 1 of the function.

// We can sketch it as:

// Context: { x: 2, n: 3, at line 1 } pow(2, 3)
// That’s when the function starts to execute. The condition n == 1 is falsy, so the flow continues into the second branch of if:

// function pow(x, n) {
//   if (n == 1) {
//     return x;
//   } else {
//     return x * pow(x, n - 1);
//   }
// }

// alert( pow(2, 3) );
// The variables are same, but the line changes, so the context is now:

// Context: { x: 2, n: 3, at line 5 } pow(2, 3)
// To calculate x * pow(x, n - 1), we need to make a subcall of pow with new arguments pow(2, 2).

// pow(2, 2)
// To do a nested call, JavaScript remembers the current execution context in the execution context stack.

// Here we call the same function pow, but it absolutely doesn’t matter. The process is the same for all functions:

// The current context is “remembered” on top of the stack.
// The new context is created for the subcall.
// When the subcall is finished – the previous context is popped from the stack, and its execution continues.
// Here’s the context stack when we entered the subcall pow(2, 2):

// Context: { x: 2, n: 2, at line 5 } pow(2, 2)
// Context: { x: 2, n: 3, at line 5 } pow(2, 3)

// The new current execution context is on top (and bold), and previous remembered contexts are below.

// When we finish the subcall – it is easy to resume the previous context, because it keeps both variables and the exact place of the code where it stopped.

// Please note:
// Here in the picture we use the word “line”, as in our example there’s only one subcall in line, but generally a single line of code may contain multiple subcalls, like pow(…) + pow(…) + somethingElse(…).

// So it would be more precise to say that the execution resumes “immediately after the subcall”.

// pow(2, 1)

// The process repeats: a new subcall is made at line 5, now with arguments x=2, n=1.

// A new execution context is created, the previous one is pushed on top of the stack:


// Context: { x: 2, n: 1, at line 1 } pow(2, 1)
// Context: { x: 2, n: 2, at line 5 } pow(2, 2)
// Context: { x: 2, n: 3, at line 5 } pow(2, 3)

// There are 2 old contexts now and 1 currently running for pow(2, 1).

// The exit

// During the execution of pow(2, 1), unlike before, the condition n == 1 is truthy, so the first branch of if works:

// function pow(x, n) {
//   if (n == 1) {
//     return x;
//   } else {
//     return x * pow(x, n - 1);
//   }
// }
// There are no more nested calls, so the function finishes, returning 2.

// As the function finishes, its execution context is not needed anymore, so it’s removed from the memory. The previous one is restored off the top of the stack:

// Context: { x: 2, n: 2, at line 5 } pow(2, 2)
// Context: { x: 2, n: 3, at line 5 } pow(2, 3)

// The execution of pow(2, 2) is resumed. It has the result of the subcall pow(2, 1), so it also can finish the evaluation of x * pow(x, n - 1), returning 4.

// Then the previous context is restored:

// Context: { x: 2, n: 3, at line 5 } pow(2, 3)

// When it finishes, we have a result of pow(2, 3) = 8.


// The recursion depth in this case was: 3.

// As we can see from the illustrations above, recursion depth equals the maximal number of context in the stack.

// Note the memory requirements. Contexts take memory. In our case, raising to the power of n actually requires the memory for n contexts, for all lower values of n.

// A loop-based algorithm is more memory-saving:

// function pow(x, n) {
//   let result = 1;

//   for (let i = 0; i < n; i++) {
//     result *= x;
//   }

//   return result;
// }


// The iterative pow uses a single context changing i and result in the process. Its memory requirements are small, fixed and do not depend on n.

// Any recursion can be rewritten as a loop. The loop variant usually can be made more effective.

// …But sometimes the rewrite is non-trivial, especially when a function uses different recursive subcalls depending on conditions and merges their results or when the branching is more intricate. And the optimization may be unneeded and totally not worth the efforts.

// Recursion can give a shorter code, easier to understand and support. Optimizations are not required in every place, mostly we need a good code, that’s why it’s used.



// ?! Recursive traversals

//  Another great application of the recursion is a recursion traversal

//  Imagine, we have a company. The staff structure can be presented as an object.

// In other worda a company has deparments

//  1. A department may have an array of staff. for instance, sales department has 2 employees john and Alice.

//  2. Or a department may split into subdepartments, like development has two branches sites and interals. Each of them has their own staff.

//  It is also possibel that when subdepartment growsm it divdes into subsubdepartements

// For instance, the sites department in the future may be split into teams for siteA and siteB . And they potentially can split even more. That's not  on the picture, just something to have in mind.


let company = { // the same object, compressed for brevity

    sales:[{nane : "john", salary:1000}, {name: "Alice", salary :1600}],

    development : {
        sites : [{name:"peter", salary:2000}, {name: "Alex", salary:100}],
        internals: [{name:"jack", salary:1300}]
    }
};

//  the function to do the job

function sumSalaries(department){

    if(Array.isArray(department)){

        return department.reduce((prev, current) =>  prev + current.salary, 0);
    
    }
    else { // case (2)
        let sum = 0;
        for (let subdep of Object.values(department)) {
          sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
        }
        return sum;
}}

console.log(sumSalaries(company))