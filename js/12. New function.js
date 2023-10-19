//  The new function syntax

// there is one more way to crate a function. it is rarely used, but sometimes there is no alternative

// syntax

// ?the syntax fo r creating function
// let func = new Function([arg1, arg2, ...argN], functionBody);


//  The function is creaed with the arguments arg1...argN and the given functionBody.

// It easier to understand by looking at an example. Here is a function with two arguments
let sum = new Function('a','b','c','d', 'return a+b+c+d');
console.log(sum(1,34,3,5,7));

// // And there is afunction without arguments, with only the function body:

let sayHi = new Function("console.log('hello')");

sayHi();

// let str ="receive"
// let func = new Function(str);

// console.log(func());


//It is used in very specific cases, like when we receive code from a server, or to dynamically compile a function from a template, in complex web-applications


// ---- closure 

// Usually  a function remembers where it was born in the special property [[Enivornment]]. It references the lexical Enivornment from where it is created (we covered that in the chapter Variable scope, closure)

// But when a function is created using new Function, its [[Enivornment]] is set to reference not the current Lexical Enivornment, but the global one

// ? so, such function doesn't have access to outer variables, only to the global ones.

// function getFunc(){

//     let value = "test";

//     let func = new Function (`console.log(value)`);
//     return func;
// }

// getFunc()(); // Refernce Error : Value is not defined


// Compare it with the regular behavior:

function getFunc() {
  let value = "test";

  let func = function() { console.log(value) };

  return func;
}

getFunc()(); 

// This special feature of new FUnction looks strange, but appears very useful in practice

//  Imagine that we must create a function from a string. The code of that function is not known at the time of writing the script , but will be known in the process of execution. we may recieve it from the server or from another source.

//Our new function needs to interact with the main script.

// What if it could access the outer variables?

// ? the problem is that before js is published to production, its compressed using a minifer -a special program that shrinks code by removing extra customElements,space and what's imp renames local variables into shorter

// For instance, if a function has let userName, minifer replaces it with let a (or anoterh letterif this one is occupied )  and does it everywhere. That's actually a safe thing to do because the variable is local nothing outside the function can access it.

// Note: if  new funciton had access to outer variables, it woruld have problems with minifers.

