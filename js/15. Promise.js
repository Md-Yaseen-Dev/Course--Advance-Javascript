// -------------------------------------Promise-----------------------------



/*
This is a real life analogy for things we often have in programming

1. "A producing code" that does something and takes time. for instance, some code that loads the data over a network. Thats a "singer"

2. A "consuming code" that wants the result of the "producing code" once it is ready. Many functions may need that result. These are the "fans"

3. A promise is a special javascript object that links the producing code and the consuming code together. In terms of our analogy. this is the subscription list. The "producing code " takes whatever time it needs to produce the promised result, and the "promise" make the result available to all of the subscribed code when it is ready.


*/

let promsie = new Promise(function(resolve,reject){

    //Executor (the producing code , "singer");
});


//  The function passed to new Promise is called "the executor".  When new Promise is created, the executor runs automatically. it contains the producing code which should eventually produce the result. In terms of the analogy above: the executor is the singer.

// Its arguments resolve and reject are callbacks provided by javascript itself. Our code is only inside the executor.


// When the executor obtains the result, be it soon or late doesn't matter, it should call one of the se callbacks;

// resolve(value) --- if the jobs is finished successfully, with result value.

// ? reject(error)  --- if an error has occured error is the error object.

//  so to summarize the executor runs automatically and attempts to perform a job. when it is finished with the attempt, it calls resolve if it was successful or reject if there was an error.

// The promise object returned by the new Promise constructor has these internal properties:

// 1. state -- initially "pending", then changes to either "fulfilled" when resolve is called  or  "rejected" when reject is called

// result --- initially `undefined`, then changes to `value` when resolve(value) is called or `error` when reject(error) is called

let promise = new Promise(function(resolve, reject){

    setTimeout(()=> resolve(console.log("done")), 1000);
})


// let promise1= new Promise(function(resolve, reject) {
//     // after 1 second signal that the job is finished with an error
//     setTimeout(() => reject(new Error("Whoops!")), 1000);
//   });

//   'A promise that is either resolved or rejected is called “settled”, as opposed to an initially “pending” promise'.


// ?----------------------The state and result are internal
// The properties state and result of the Promise object are internal. We can’t directly access them. We can use the methods .then/.catch/.finally for that. They are described below.----

// ---------------------------------Consumers: then,catch--------------------------------------------


/* A Promise object servers as a link between the executor and the consuming functions which will recieve the rsult or error. Consuming functions can be registered using the methods .then and .catch */




// -----------------then---------------------------

//  the most important, fundamental one is .then 


promise.then(
function (result){ /*handle a successful result */}
,function(error){/*handle an error */}
);


let promise2 = new Promise(function(resolve, reject) {
    setTimeout(() => resolve("done!"), 1000);
  });
  
  // resolve runs the first function in .then
  promise2.then(
    result => console.log(result), // shows "done!" after 1 second
    error => console.log(error) // doesn't run
  );


//  The first function was executed

//  And in the case of a rejection, the second one:
  let promise4 = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
  });
  
  // reject runs the second function in .then
  promise4.then(
    result => console.log(result), // doesn't run
    error => console.log(error) // shows "Error: Whoops!" after 1 second
  );

  let promise5 = new Promise(resolve => {
    setTimeout(() => resolve("doney!"), 1000);
  });
  
  promise5.then(result => console.log(result));


//    ------------------------------------------CLeanup:finally--------------------------------------

// just liek there is a finally clause in  a regular try{...}  catch{...} there is finally in promises

//  The call .finally(f) is similar to .then(f,f) in the sense that f runs always, when the promise is settled be it resolve or reject.

//  The idea of finally is to set up a handler to performing cleanup/ finalizing after the previous operations are complete

// ex: stopping loading indicators, closing no loner needed connections, etc.

//  Think of it a a party finsher. No matter was a party good or bad. how many frineds were in it. we still need or at least should do a cleanup after it.


// There are important differences:

// A finally handler has no arguments. In finally we don’t know whether the promise is successful or not. That’s all right, as our task is usually to perform “general” finalizing procedures.

// Please take a look at the example above: as you can see, the finally handler has no arguments, and the promise outcome is handled by the next handler.

// A finally handler “passes through” the result or error to the next suitable handler.

// For instance, here the result is passed through finally to then:

new Promise((resolve, reject) => {
  setTimeout(() => resolve("value"), 2000);
})
  .finally(() => console.log("Promise ready")) // triggers first
  .then(result => console.log(result)); 



//   As you can see, the value returned by the first promise is passed through finally to the next then.

// That’s very convenient, because finally is not meant to process a promise result. As said, it’s a place to do generic cleanup, no matter what the outcome was.

// And here’s an example of an error, for us to see how it’s passed through finally to catch:


new Promise((resolve, reject) => {
    throw new Error("error");
  })
    .finally(() => console.log("Promise is  ready")) // triggers first
    .catch(err => console.log(err));  // <-- .catch shows the error
  
//     To summarize:

// A finally handler doesn’t get the outcome of the previous handler (it has no arguments). This outcome is passed through instead, to the next suitable handler.
// If a finally handler returns something, it’s ignored.
// When finally throws an error, then the execution goes to the nearest error handle



//  1 Promises

/* i )  Promises allow us to do things in the natural order. first , we run loadscript(script) and .then we write what to do with the reuslt


  ii)  we can call .then on a Promise as many times as we want. Each time, we are adding a new fan, a new subscribing function to the subscription list. more about this in the nest*/



//   2. callbacks

/*We must have a callback function at our disposal when calling loadscript(scirpt, callback) . In other words, we must know what to do with the result before loadscript is called

There can be only one callback.*/