//  ------ The old var


//  This article is for old scripts


//  In the very first chapter about variables, we mentioned three ways of varaible declaration

//1. let
//2. const
//3. var


//  THe var decalration is similar to let. Most of the time we can replace let by var or vice versa and expect things to work.

 var message = "HI";

console.log(message);


//  but internally var is a very different beast, that orginates from very old times. Its generally not used in modern scripts but still lurks in the old ones.

//  If you dont plan on meeting such scripts you may even skip this chapter or postpone it.

// > on the other hand, it is imp to understand differnces when migarating old scripts from car to let, to avoid odd erros


// ?! var has no block scope

//  variables declared with var, are either function scoped or global-scoped. They are visible through blocks.


if(true){

    var test = true;
}

console.log(test);


//  As var ignores code blocks, we have got  a global varible test.

// if we used let test instead of var test. then the variable would only be visible inside if:


if(true){
    let tes = true;
}

// console.log(tes);  // ReferenceError: tes is not defined.


// ? the same thing for loops var cannot be blcok or loop local.

for (var i=0; i < 10; i++){

    var one = 1; 

    // ...
}

console.log(i);  // 10, i is visible after loop, it is a global variable.
console.log(one) // 1, "one" is visible after loop, it is a global variables.


//  "Var"  tolerates redecalrations

//  if we decalre the same variable with let twice in the same scop[e, that is an error ]

let user;
// let user;  syntax eror: user has already been declared.


//  with var we can redecalre a variable any number of times. if we use  var with an already decalred variabel. it is just ignored.

var user2 ="peete";

var user2 = "john";  // This var does nothing(already declared ) // .... it doesn't trigger an error.

console.log(user2);



// "var"  variable can be declared below thir use

//  var declartions are processed when the function starts

//  in other words var variables are defined from the beginning of the function, no matter where the defintionis that the defintionis not in the nested function.


// --- people also call such behavior hoisting , because all var are hoisted to the top of the function.

function sayHi() {
    phrase = "Hello"; // (*)
  
    if (false) {
      var phrase;
    }
  
    console.log(phrase);
  }
  sayHi();
//  So in the  example above, if false branch never executed but that doesnot  matter . The var inside it is processed in the beginning of  the functioin, so at themoment of (*) the varaible exists.


// ?!  Declartions are hosited, but assignments are not

// ? that's best demonstrated with an example

function sayHey(){

    console.log(phram);

    var phram = "hello bro";

}

sayHey(); /// undefined.


//  IIFE


(function(){

    var msg = "hey folks";

    console.log(msg);
})();


// NOte  :  var is function scope
//  let and const are block scoped.