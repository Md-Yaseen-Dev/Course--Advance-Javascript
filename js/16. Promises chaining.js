// ---------------------------Promises chaining----------------------------


// Lets return to the problem mentioned in the chapter callbacks. we have a sequence of asynchronous tasks to be performed one after another -- for instance , loading scripts

// Promises provide a couple of recipes to do that.

// -----------Promise chaining ---------------

new Promise(function(resolve, reject){
setTimeout(()=>{resolve(1), 1000}); // (*)
}).then(function(result){
    console.log(result);
    return result*2
}).then(function(result){
    console.log(result);

    return result *2;
}).then(function(result){
    console.log(result);

    return result *2;
}).then(function(result){
    console.log(result);

    return result *2;
})


// The idea is that the result is passed through the chain of .then handlers.

// here the flow is

// 1. The intial promise resolves in 1 second.
// 2. Then the  .then handler is called(**). which in turn creates a new promise resolved with 2 values

// 3. The next then(***) gets the result of the previous one processes it and passes it to the next handler.

//4. ...and so on.

//  As the result is passed along the chain of handlers, we can see a sequence of console.log calls

// ---- -1. new Promise => resolve(1)
// ------2. .then  =>  return 2
// -------3.  .then => return 4
//
// -------4.  .then => return 8

//  The whole thing works, because every call to a .then returns  a new promise, so that we can call the next .then on it.

// when a handler return a value, it becomes the result of that promise , so the next .then is called with it.

//  A classic newbie error:technically we can also add many .then to a single promise. This is not chaining.

let promise1 = new Promise(function(resolve,reject){

    setTimeout(()=>resolve(1), 1000);
});

promise1.then(function(result){
    console.log(result)
 return result * 2 ;})

 promise1.then(function(result){
    console.log(result)
 return result * 2 ;})

 promise1.then(function(result){
    console.log(result)
 return result * 2 ;})

//  what we did here is just adding several handlers to one promise. They dont pass the result to each other. instead they process it independently.

// here  is the picture(comparing it with the chaining above):

// ------new Promise it divdes into .then , .then, .then

// All .then on the same promise get the same result- the result of that promises . SO inte code above all console.log. show the same 1.

//  In practice we rearely need multiple handlers for one promises. Chainging is used much more often.


// ---------------Returning promises


//  A handler used in .then(handler) may create and return a promise.

//  in that case further wait until it settles and thenget its result.

new Promise(function(resolve,reject){

    setTimeout(()=> resolve(13), 1000);
}).then(function(result){

    console.log(result);
    return new Promise((resolve, reject) => { // (*)
        setTimeout(() => resolve(result * 2), 1000);
});
}).then(function(result) { // (**)

    console.log(result); // 2
  
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  
  }).then(function(result) { // (**)

    console.log(result); // 2
  
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  
  }).then(function(result) {
  
    console.log(result); // 4
  
  });

//   Here the first .then shows  1 and returns new Promise(...) in the line (*) . After one second it resolves and the result the argument of resolve. here it is result * 2 is passed on to thehanler of the second .then. that handler is in the line. it shows 2 and does the same thing.

//  so the output is the samw as in the previous example 1->2->4 but now with 1 second delay between alert calls returning promises allow us to build chains of aynchronous actions.