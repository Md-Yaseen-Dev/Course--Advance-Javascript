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
