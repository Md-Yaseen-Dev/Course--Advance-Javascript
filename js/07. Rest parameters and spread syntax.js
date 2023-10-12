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

