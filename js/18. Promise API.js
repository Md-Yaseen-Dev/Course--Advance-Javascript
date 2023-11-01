// Promises API

// There are 6 static methods in the Promise class. we will quickly cover their use cases here.

// 1. Promise.all
// 2. Promise.allSettled
// 3. Promise.race
// 4. Promise.any
// 5. Promise.resolve
// 6. Promise.reject



// ?-------- -----------Promise.all --------------------------------------
// let's say we want promises to execute in parellel and wait until all of them are ready.

// For instance, download several URLs in parellel and process the content once they are all done.

// That's what Promise.all(iterable);

// Promise.all takes an terable(usually an array of promises)and return a new promise.

//  The new promise resolves when all listed promises are resolved, and the array of their results becomes ts result.

// for instance, the promise.all below settles after 3 seconds and then its result is an array [1,2,3]

Promise.all([
    new Promise(resolve => setTimeout(()=>{resolve(1),3000})),
    new Promise(resolve => setTimeout(()=>{resolve(2),3000})),
    new Promise(resolve => setTimeout(()=>{resolve(3),3000}))
]).then(alert)