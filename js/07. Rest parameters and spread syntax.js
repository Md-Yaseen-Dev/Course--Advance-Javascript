//  Rest parameters and spread syntax

// Many javascript built in functions support an arbitary number of arguments.


// for instance

// - Math.max(arg1, arg2, ..., argN) - returns the greatest of the arguments.

// - Object.assign(dest, src1, ..., srcN) - copies properties from src1.N into dest.

// ...and so on


// ------Rest parameters ...

//  A function can be called with any number of argument s no matter how it is defined.


function sum(a,b){

    return a+b;
}

console.log(sum(1,2,3,4,5));

//  There will be no error because of "excessive" arguments.
//  so the result in the code above is 3.

// The rest of the parameters can be included in the function definiton by using three dots... followed by the name of the array that will contain them. 

//Note:- ` The dots literally mean gather the reamining parameters into an array.`

function sumall(...args){

    let sum = 0;
    for(let arg of args){
       sum+= arg ;
    }
    return sum
}

console.log(sumall(1,2,3,4));


//  here the first arguments go into variables and the rest go to titles

function showName(fName, lName, ...titles){

    console.log(fName + " " + lName);

    console.log(titles[0]);
    console.log(titles[1]);

    console.log(titles.length)

}

showName("yaseen", "Roshan", "Roy", "waheed", "Fazil");


// ? IMp   The rest parameters gather all remaining arguments, so the following deos not makes sense and causes an error.

// function f(args1, ...rest, arg2){   // arg2 after   ...rest

// }



//   ---- The "arguments" variable ----



// There is also a special array-like object named arguments that contains all arguments by their index.


function showName(){

    console.log(arguments.length);
    console.log(arguments[0]);
    console.log(arguments[1]);

}
showName("yaseen", "roshan");



//  In old times. rest parameters did not exist in the language, and using arguments was the only way to get all arguments of  the function. And it still works. we can find it in the old code.

// But the downside is that although arguments is bothe array-like and iterable its not an array. It does not support array methods, so we can't call arguments.map(...) for example.



// ? IMP  arrow function do not have arguments

//  if we access the arguments object from an arrow function, it takes them from the outer "normal function."

 function f(){

    let showArg = () => console.log(arguments[0], arguments[1]);

    showArg();
 }

 f("something");

//   As we remember arrow functions dont have their own this. Now we know they dont have the special arguments object either.


//  ----- Spread syntax

//  we have just seen how to get an array from the list of parameters

//  But sometimes we need to do exactly the reverse.

//  for instance there is a built in functioin Math.max that returns the greatest number form a list.


console.log(Math.max(3,5,1)); 


// Now let’s say we have an array [3, 5, 1]. How do we call Math.max with it?

// Passing it “as is” won’t work, because Math.max expects a list of numeric arguments, not a single array:


let arr = [3,5,1];

console.log(Math.max(arr)); // NaN
console.log(Math.max(arr[0], arr[1], arr[2])) // it so ugly

//  And surely we cannot manually list items in the code Math.max(arr[0], arr[1], arr[2]) because we may be unsure how many there are. As our scripts executes, therer could be a lot , or there could  be none. And that wourld get ugly.


//  spread syntax to the rescur! it looks similar to rest parameters , also using ..., but does quite the opposite.

// when ...arr is used in the function call, it expands an iterable object arr into the list of arguments.

// for Math.max:

let arr1 = [2,3,4,5,6,3];

console.log(Math.max(...arr1)); // 5 (spread turns array into a list of arguments)


// We also can pass multiple iterables this way:

let arr1a = [1, -2, 3, 4];
let arr2a = [8, 3, -8, 1];

console.log( Math.max(...arr1a, ...arr2a) ); // 8
// We can even combine the spread syntax with normal values:

let arr1b = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

console.log( Math.max(1, ...arr1b, 2, ...arr2, 25) ); // 25

//  also, the spread syntax can be used to merge arrays.

let a = [2,3,4,5];

let b =[ 1,7,8,9,0];

console.log(...a,...b); //merged



// n the examples above we used an array to demonstrate the spread syntax, but any iterable will do.

// For instance, here we use the spread syntax to turn the string into array of characters:

let str = "Hello";

console.log( [...str]); // H,e,l,l,o


//-------- Copy an array/object


let Arr = [1,2,3];

let arrcopy = [...Arr];


console.log(JSON.stringify(Arr) === JSON.stringify(arrcopy)) ; //true 

// are the arrays equals

console.log(Arr === arrcopy); // false (not same reference)

Arr.push(9)
console.log(Arr);
console.log(arrcopy);


// ---Note that it is possible to do the same thing to make a copy of an object:

let obj = { a: 1, b: 2, c: 3 };

let objCopy = { ...obj }; // spread the object into a list of parameters
 // then return the result in a new object

// do the objects have the same contents?
console.log(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// are the objects equal?
console.log(obj === objCopy); // false (not same reference)

// modifying our initial object does not modify the copy:
obj.d = 4;
console.log(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
console.log(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
// This way of copying an object is much shorter than let objCopy = Object.assign({}, obj) or for an array let arrCopy = Object.assign([], arr) so we prefer to use it whenever we can.