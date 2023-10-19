// Scheduling: setTimeout and setInterval

// There are two methods for it.

// 1. SetTimeout allows us to run a function once after the interval of time
//2. setInterval allows us to run function repeatedly, strating after the interval of time, then repeating continously at that interval.


// ? setTimeout

// let timerId = setTImeout(func|code, [delay], [arg1], [arg2], ...)

// --->func|code   function or a string of code to execute. Usually that's a function. for historical reasons, a string of code can be passed, but that's not recommeded

// ---> delay  :-  The delay before run, in milliseconds(1000ms = 1second) by default 0 .

//  ---->arg1,arg2 ... :- Arguments for the function


function sayHI(){

    console.log("hello");
}
setTimeout(sayHI,1000)

// Pass a function , but don't run it.

// Novice developers sometimes make a mistake by adding brackets() after the functions:

// ?1 wrong1
// setTimeotu(sayHi(),1000);

// That doesn't work because setTImeout expects a refernce to a function and her sayHI() runs the function and the result of its execution is passed to setTimeout. In our case the result of sayHi() is undefined (the function returns nothing), so nothing is scheduled.


// Canceling with clearTImeout

//  A call to setTimeout returns a timer identifier timerId tht we can use to cancel the execution.

let timerId = setTimeout(() => console.log("never happens"), 1000);
console.log(timerId); // timer identifier

clearTimeout(timerId);
console.log(timerId); // same identifer doesn't become null after cancelling


// ? setInerval

// The setInterval method has the same syntax as setTimeout:

// let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)

// repeat with the interval of 2 seconds
let timerId1 = setInterval(() => console.log('tick'), 1000);

// after 5 seconds stop
setTimeout(() => { clearInterval(timerId1); console.log('stop'); }, 5000);


// ?Nested setTimeout

// There are two ways of running something regularly.

// One is setInterval. The other one is a nested setTimeout, like this

let timerId2 = setTimeout(function tick() {
    console.log('tick.....some');
    timerId2 = setTimeout(tick, 2000); // (*)
  }, 2000);

//   Nested setTimeout allows to set the delay between the executions more precisely than setInterval.


// Garbage collection and setInterval/setTimeout callback
// When a function is passed in setInterval/setTimeout, an internal reference is created to it and saved in the scheduler. It prevents the function from being garbage collected, even if there are no other references to it.

// // the function stays in memory until the scheduler calls it
// setTimeout(function() {...}, 100);
// For setInterval the function stays in memory until clearInterval is called.

// There’s a side effect. A function references the outer lexical environment, so, while it lives, outer variables live too. They may take much more memory than the function itself. So when we don’t need the scheduled function anymore, it’s better to cancel it, even if it’s very small.

// Zero delay setTimeout

// There is a special use case setTImeout(func,0) or just setTImeout(func)

// This schedules the execution of func as soon as possible . But  the scheduler will invoke it only after the currently executing script is complete.


// ?zero delay setTImeout

// (func, 0), or just setTimeout(func).

// // This schedules the execution of func as soon as possible. But the scheduler will invoke it only after the currently executing script is complete.

// // So the function is scheduled to run “right after” the current script.

// For instance, this outputs “Hello”, then immediately “World”:

setTimeout(() => console.log("World"));

console.log("Hello");
// The first line “puts the call into calendar after 0ms”. But the scheduler will only “check the calendar” after the current script is complete, so "Hello" is first, and "World" – after it.

// There are also advanced browser-related use cases of zero-delay timeout, that we’ll discuss in the chapter Event loop: microtasks and macrotasks.

// NOTe:-   setTimeout(func, delay, ...args) and setInterval(func, delay, ...args) allow us to run the func once/regularly after delay milliseconds.
// To cancel the execution, we should call clearTimeout/clearInterval with the value returned by setTimeout/setInterval.
// Nested setTimeout calls are a more flexible alternative to setInterval, allowing us to set the time between executions more precisely.
// Zero delay scheduling with setTimeout(func, 0) (the same as setTimeout(func)) is used to schedule the call “as soon as possible, but after the current script is complete”.
// The browser limits the minimal delay for five or more nested calls of setTimeout or for setInterval (after 5th call) to 4ms. That’s for historical reasons.
// Please note that all scheduling methods do not