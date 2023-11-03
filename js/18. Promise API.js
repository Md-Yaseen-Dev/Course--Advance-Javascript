// // Promises API

// // There are 6 static methods in the Promise class. we will quickly cover their use cases here.

// // 1. Promise.all
// // 2. Promise.allSettled
// // 3. Promise.race
// // 4. Promise.any
// // 5. Promise.resolve
// // 6. Promise.reject



// // ?-------- -----------Promise.all --------------------------------------
// // let's say we want promises to execute in parellel and wait until all of them are ready.

// // For instance, download several URl_s in parellel and process the content once they are all done.

// // That's what Promise.all(iterable);

// // Promise.all takes an terable(usually an array of promises)and return a new promise.

// //  The new promise resolves when all listed promises are resolved, and the array of their results becomes ts result.

// // for instance, the promise.all below settles after 3 seconds and then its result is an array [1,2,3]

// // Promise.all([
// //     new Promise(resolve => setTimeout(()=>{resolve(1),3000})),
// //     new Promise(resolve => setTimeout(()=>{resolve(2),3000})),
// //     new Promise(resolve => setTimeout(()=>{resolve(3),3000}))
// // // ]).then(console.log)

// new Promise((resolveOuter) => {
//   resolveOuter(
//     new Promise((resolveInner) => {
//       setTimeout(resolveInner, 1000);
//     }),
//   );
// });

// // For instance, if we have an array of URl_s, we can fetch them all like this:

// let url_s = [
//   'https://api.github.com/users/iliakan',
//   'https://api.github.com/users/remy',
//   'https://api.github.com/users/jeresig'
// ];

// // map every url to the promise of the fetch
// let requests = url_s.map(url => fetch(url));

// // Promise.all waits until all jobs are resolved
// Promise.all(requests)
//   .then(responses => responses.forEach(
//     response => console.log(`${response.url}: ${response.status}`)
//   ));

//   let names =  ['iliakan', "Md-Yaseen-Dev", 'jeresig'];

//   let request = names.map(names => fetch(`https://api.github.com/users/${names}`));

//   Promise.all(request).then(responses=>{

// for (let response of responses){
//     alert(`${response.url}: ${response.status}`); // shows 200 for every url
// }
// return responses;
//   }).then(responses => Promise.all(responses.map(r => r.json()))).then(users => users.forEach(user=>alert(user.name)))



// //   If any of the promises is rejected, the promise returned by Promise.all immediately rejects with that error.

// // For instance:

// Promise.all([
//     new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//     new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
//   ]).catch(alert); // Error: Whoops!



// //   here the second promise rejects in two seconds. That leads to an immedaite rejection of promise.all, so .catch executes the rejection error becomes the outcome of the entire Promise.all.

// // ---------In case of an error other promises are ignored

// //  If one promises rejects, promise.all immediately rejects, completely forgetting about the other ones in the list. their result are ignored.

// //  For example, if there are mulitple fetch calls, like in the example above and one fails the other will still continue to execute, but promise. all wont watch them anymore. They will probably settle, but their results will be ignored.

// // Promise.all does nothing to cancel them, as there is no concept of cancellation in promises.


// //  Promise.all(iterable) allows non promise regular values in iterable Normally, promise.all(...) accepts an iterable of promise. But if any of those objecrs is not a promise, it is passed to the resulting array as is.

// //  for instance here the result are [1,2,3]


// Promise.all([
//     new Promise((resolve, reject)=>{
//         setTimeout(()=> resolve(1), 1000)
//     }),2,3,4
// ]).then(alert);


// -------------------------------------Promise.allSettled-------------------------

// Promise.all rejects as a whole if any promise rejects. that is good for all or nothing cases, when we need all results successful to proceed


// Promise.allSettled just wait for all promises to settle, regardless of the result. The resulting array has

//  status:"fulfilled", value:result} for successful responses.

// status:"rejected, reason:error" for errors

// let url_s = [
//   'https://api.github.com/users/iliakan',
//   'https://api.github.com/users/remy',
//   'https://no-such-url'
// ];

// Promise.allSettled(url_s.map(url => fetch(url)))
//   .then(results => { // (*)
//     results.forEach((result, num) => {
//       if (result.status == "fulfilled") {
//         alert(`${url_s[num]}: ${result.value.status}`);
//       }
//       if (result.status == "rejected") {
//         alert(`${url_s[num]}: ${result.reason}`);
//       }
//     });
//   });

// // --------------------------------------------------------Promise.race-----------------------------------------------------

// // similar to promise.all. but waits only gor the first settled promise and gets its result.


// let promise = Promise.race(iterable);

// // for instance here the result will be 1;

// Promise.race([
//   new Promise((resolve, reject) => setTimeout(()=>resolve(1),1000)),
//   new Promise((resolve, reject) => setTimeout(()=>reject(new Error("whoops")))),
//   new Promise((resolve, reject) => setTimeout(()=>resolve(3),3000)),
// ])

//--------------------------------------Promise.any----------------------------------------------------

// SImilar to Promise.race, but waits only for the first fulfilled promise and gets ites result, if all of the given promises are rejected, then the returned promise is rejected with aggreagateError  a special error object that stores all promise erros in its errors property.

// let Promise1 = Promise.any(iterable);

// Promise.any([
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))

// ]).then(alert); //1

//  The first promise here was fastest, but it was rejected, so the second promise becaome the result. after the first fulfilled promise win the race. all further results are ignored

Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});


// Promise.resolve

// Methods Promise.resolve and Promise.reject are rearly needed in modern code. because async /await syntax makes them somewhat obsolete.

let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
//  Promise.reject


let promise = new Promise((resolve, reject) => reject(error));


//notes:-



/*There are 6 static methods of Promise class:

Promise.all(promises) – waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of Promise.all, and all other results are ignored.

Promise.allSettled(promises) (recently added method) – waits for all promises to settle and returns their results as an array of objects with:
status: "fulfilled" or "rejected"
value (if fulfilled) or reason (if rejected).

Promise.race(promises) – waits for the first promise to settle, and its result/error becomes the outcome.

Promise.any(promises) (recently added method) – waits for the first promise to fulfill, and its result becomes the outcome. If all of the given promises are rejected, AggregateError becomes the error of Promise.any.
Promise.resolve(value) – makes a resolved promise with the given value.

Promise.reject(error) – makes a rejected promise with the given error.

Of all these, Promise.all is probably the most common in practice. */