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
