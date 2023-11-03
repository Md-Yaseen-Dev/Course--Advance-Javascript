// ?------------------------- Microtasks------------------------------


// promises handlers .then/.catch/.finally are always asynchronous

// Even when a Promise  is immediately resolved the foe on the lines below .then/.catch/.finally will still execute before these handlers.

let promise = Promise.resolve();
promise.then( () => console.log("Promise done"));

console.log('code finsished');


/*If you run it, you see code finished first, and then promise done!.

That’s strange, because the promise is definitely done from the beginning.

Why did the .then trigger afterwards? What’s going on? */



//----------Microtask queue


/*
If you run it, you see code finished first, and then promise done!.

That’s strange, because the promise is definitely done from the beginning.

Why did the .then trigger afterwards? What’s going on?

 */

Promise.resolve()
  .then(() => console.log("promise done!"))
  .then(() => console.log("code finished"));



//   ------------------------------------?Unhandled rejection-------------------------

//   Remember the unhandledrejection event from the article Error handling with promises?
  
//   Now we can see exactly how JavaScript finds out that there was an unhandled rejection.
  
//   An “unhandled rejection” occurs when a promise error is not handled at the end of the microtask queue.
  
//   Normally, if we expect an error, we add .catch to the promise chain to handle it:

  let promisey = Promise.reject(new Error("Promise Failed!"));
promisey.catch(err => alert('caught'));

// doesn't run: error handled
window.addEventListener('unhandledrejection', event => alert(event.reason));



// Note:-

/* Prmise handling is always asynchronous, as all promise actions pass through the internal “promise jobs” queue, also called “microtask queue” (V8 term).

So .then/catch/finally handlers are always called after the current code is finished.

If we need to guarantee that a piece of code is executed after .then/catch/finally, we can add it into a chained .then call.

In most Javascript engines, including browsers and Node.js, the concept of microtasks is closely tied with the “event loop” and “macrotasks”. As these have no direct relation to promises, they are covered in another part of the tutorial, in the article Event loop: microtasks and macrotasks. */