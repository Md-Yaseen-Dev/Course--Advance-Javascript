//  In javascript, functions are objects

//  A good way to imagine functions is an callable "action object". We van not only clal them, but also treat them as objects: add/remove properties pass by reference

// ------The "name" property

// function objects contains osme usable properties.

//  for instance, a functions name is accessible as the name property

function sayHi(){
    ("HI")
}
(sayHi.name);

//  what is kind of funny, the name assigning logic is smart. it also assigns the correct name to a function even if its created without one, and then immediately assigned.

let sayhi = function(){
    ("hello");
};
(sayhi.name); // sayHi (there is a name);

// ? it also works if the assignment is one via a default value

function f(sayhis = function(){}){
    (sayhis.name); // sayHi (works!)
  }
  
  f();

//   In the specification, this feature is called a contextual name. if the function does not provide one, then in an assignment it is figured out from the context.

// Object method have names too;

let user= {
    sayaHi(){

    },
    sayBye:function (){
        // ??...
    }
}

console.log(user.sayaHi.name);
console.log(user.sayBye.name);

// There is no magic though. there are cases when there is no way to figure out the right name. in that case, the name property is empty like here,

//  function created inside array

let arr = [function () {}];

(arr[0].name) // empty string
// the engine has no way to se up the right name, so there is none.

//  in practice however,most function do have a name


// ------! The length property

// there is another built in property length that returns the number of function parameters, for instance


function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

(f1.length); // 1
(f2.length); // 2
(many.length); // 2


// Here we can see that rest parameters are not counted.

// The length property is sometimes used for introspection in functions that operate on other functions.

// For instance, in the code below the ask function accepts a question to ask and an arbitrary number of handler functions to call.

// Once a user provides their answer, the function calls the handlers. We can pass two kinds of handlers:

// A zero-argument function, which is only called when the user gives a positive answer.
// A function with arguments, which is called in either case and returns an answer.
// To call handler the right way, we examine the handler.length property.

// The idea is that we have a simple, no-arguments handler syntax for positive cases (most frequent variant), but are able to support universal handlers as well:

function ask(question, ...handlers) {
    let isYes = (question);
  
    for(let handler of handlers) {
      if (handler.length == 0) {
        if (isYes) handler();
      } else {
        handler(isYes);
      }
    }
  
  }
  
  // for positive answer, both handlers are called
  // for negative answer, only the second one
//   console.log(ask("Question?", () => ('You said yes'), result =>(result)));


// Custom properties
// We can also add properties of our own.

// Here we add the counter property to track the total calls count:

function sayHi() {
  console.log("Hi");

  // let's count how many times we run
  sayHi.counter++;
}
sayHi.counter = 4; // initial value

sayHi(); // Hi
sayHi(); // Hi

console.log( `Called ${sayHi.counter} times` ); // Called 2 times


// The count is now stored in the function directly, not in its outer Lexical Environment.

// Is it better or worse than using a closure?

// The main difference is that if the value of count lives in an outer variable, then external code is unable to access it. Only nested functions may modify it. And if it’s bound to a function, then such a thing is possible:

function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

counter.count = 10;
console.log( counter() ); // 10
// So the choice of implementation depends on our aims.

// Named function expression

// Named function expression or NFE is a term for function expression that have a name

// For instance, let's take an ordinary function expression

let sayHIm = function(who){
  console.log(`hello ,${who}`)
}

sayHIm("yaseen");

// Did we achieve anything here? what is the purpose of that additioinal func name

// first lets not e that we still have a function expression. adding the name func after function did not make it a function declaration. because it is still created as a part of an assignmnet expression.

// Adding such a name also did not brak anything

// the function is still available as sayHI();


let sayHil = function func(who) {
  console.log(`Hello, ${who}`);
};

sayHil("John");

//  There are two special things about the name func, that are the reasons for it.

//1. it allows the function to refernce itself internally

// 2. It is not visible outside of the function.

let hello_guest = function func(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    func("Guest"); // use func to re-call itself
  }
};

hello_guest(); // Hello, Guest

// But this won't work:// Error, func is not defined (not visible outside of the function)



// error

// let sayHi_error = function(who) {
//   if (who) {
//     alert(`Hello, ${who}`);
//   } else {
//     sayHi_error("Guest"); // Error: sayHi is not a function
//   }
// };

// let welcome1 = sayHi;
// sayHi = null;

// welcome1();
// ---------

let says = function func(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    func("Guesty"); // Now all fine
  }
};

let welcome = says;
says = null;

welcome(); // Hello, Guest (nested call works)


//  There is nos uch thing gor function declaration

// The internal name feature described here is only available for function expressions , not for function declarations. for function declarations, there is no syntax for adding an internal name.
// Sometimes, when we need a reliable internal name, it is the reason to rewrite a function declaration to named function expression form


function sum(){

  
}