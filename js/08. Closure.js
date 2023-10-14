// Javascript is a very function-oriented language. it gives us a lot of freedom. A function can be created at any moment, passed as an argument to another function, and then called from a totally different place of code later.


// COde blocks

//  if a variable is declared inside a code block(...) it is only visible inside that block.

{
//  do some job with local variables that should not be seen outside
    let message  = "hello" ; // only visible in this block

    console.log(message);  // hello
}

// console.log(message); // Error : messages is not defined.


// 1. variables


//  in javascript every running functiion code block {...} and the script as a whole have an internal(hidden) associated object known as lexical enivornment.

//  The lexical enivornment object consists of two parts:

// 1. Enivornment Record : an object that stores all local variables as its properties(and somw other information like the value of this.)

// 2. A refernce to the outer lexical enivornment, the one associated with the outer code.

//  A variable is just a property of the special internal object. Enviorment Record. To get or change a variable means to get or change a property of that object.

// In this simple code 


/*Execution start

    //phrase :unintalized
 let phrase; // undefined
 pharase = hello; // phrase:"hello"

 phrase = bye; // phrase :"Bye"



*/

/**Lexical Environment is a specification object
“Lexical Environment” is a specification object: it only exists “theoretically” in the language specification to describe how things work. We can’t get this object in our code and manipulate it directly.

JavaScript engines also may optimize it, discard variables that are unused to save memory and perform other internal tricks, as long as the visible behavior remains as described. */


// -----Function declarations

//  The difference is that a function declaration is instantly fulled intalized.

// When a lexical enivornment is created,  a function declaration immediately becomes  aready to use function let. that is unusable till the declaration.


/**  
 Execution start

 pharase: <unintalized>

 let phrase = "hello";

 function say(name){
    console.log()
 }
 */




//  ----Returning a function

function makeCounter() {
    let count = 0;
  
    return function() {
      return count++;
    };
  }
  
  let counter = makeCounter();

  console.log(counter())
  console.log(counter())
  console.log(counter())
  console.log(counter())
  console.log(counter())


//   here is a general programming term “closure”, that developers generally should know.


// ? --Closure
// A closure is a funct

function f() {
    let value = Math.random();
  
    return function() { console.log(value); };
  }
  
  // 3 functions in array, every one of them links to Lexical Environment
  // from the corresponding f() run
  let arr = [f(), f(), f()];