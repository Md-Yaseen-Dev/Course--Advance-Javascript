//  In javascript, functions are objects

//  A good way to imagine functions is an callable "action object". We van not only clal them, but also treat them as objects: add/remove properties pass by reference

// ------The "name" property

// function objects contains osme usable properties.

//  for instance, a functions name is accessible as the name property

function sayHi(){
    console.log("HI")
}
console.log(sayHi.name);

//  what is kind of funny, the name assigning logic is smart. it also assigns the correct name to a function even if its created without one, and then immediately assigned.

let sayhi = function(){
    console.log("hello");
};
console.log(sayhi.name); // sayHi (there is a name);

// ? it also works if the assignment is one via a default value

function f(sayhis = function(){}){
    console.log(sayhis.name); // sayHi (works!)
  }
  
  f();

//   In the specification, this feature is called a contextual name. if the function does not provide one, then in an assignment it is figured out from the context.

// Object method have names too;

let user= {
    sayHi(){

    },
    sayBye:function (){
        // ??...
    }
}

console.log(user.sayHi.name);
console.log(user.sayBye.name);

// There is no magic though. there are cases when there is no way to figure out the right name. in that case, the name property is empty like here,

//  function created inside array

let arr = [function () {}];

console.log(arr[0].name) // empty string
// the engine has no way to se up the right name, so there is none.

//  in practice however,most function do have a name


// ------! The length property

// there is another built in property length that returns the number of function parameters, for instance