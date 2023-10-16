//  Global object

// The global object provides variables and functions that are available anywhere. By default, those that ae built into a language or the enivornment.

// IN a browser it is named window, for Node.js it is global.

// Recently globalThis was added to the language, as a standarlized name for a global Object.


// We will use window here, assumng that our enviornment is a browser. if your script may run in order enivornments, it is better to use globalThis instead.

// All properties of the global object can be accessed directly

console.log("hello");

var gVar =10;

console.log(globalThis.gVar);
console.log(window.gVar);



// If we used let instead, such thing wouldn’t happen:


let gLet = 5;

alert(window.gLet);

// -----USing for polyfills

//  we use the global object to test for support of modernlanguage features.

// >  for instance test if a built in promise object exists.

if(!window.Promise){

    console.log("Your browser is really old!")
}

if (!window.Promise) {
    window.Promise = sss// custom implementation of the modern language feature
  }



  /*The global object holds variables that should be available everywhere.

That includes JavaScript built-ins, such as Array and environment-specific values, such as window.innerHeight – the window height in the browser.

The global object has a universal name globalThis.

…But more often is referred by “old-school” environment-specific names, such as window (browser) and global (Node.js).

We should store values in the global object only if they’re truly global for our project. And keep their number at minimum.

In-browser, unless we’re using modules, global functions and variables declared with var become a property of the global object.

To make our code future-proof and easier to understand, we should access properties of the global object directly, as window.x.

 */