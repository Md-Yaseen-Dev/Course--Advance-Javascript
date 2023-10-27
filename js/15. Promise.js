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
  
  promise5.then(result => console.log(result))