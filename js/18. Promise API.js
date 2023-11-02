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

// Promise.all([
//     new Promise(resolve => setTimeout(()=>{resolve(1),3000})),
//     new Promise(resolve => setTimeout(()=>{resolve(2),3000})),
//     new Promise(resolve => setTimeout(()=>{resolve(3),3000}))
// // ]).then(console.log)

new Promise((resolveOuter) => {
  resolveOuter(
    new Promise((resolveInner) => {
      setTimeout(resolveInner, 1000);
    }),
  );
});

// For instance, if we have an array of URLs, we can fetch them all like this:

let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => console.log(`${response.url}: ${response.status}`)
  ));

  let names =  ['iliakan', "Md-Yaseen-Dev", 'jeresig'];

  let request = names.map(names => fetch(`https://api.github.com/users/${names}`));

  Promise.all(request).then(responses=>{

for (let response of responses){
    alert(`${response.url}: ${response.status}`); // shows 200 for every url
}
return responses;
  }).then(responses => Promise.all(responses.map(r => r.json()))).then(users => users.forEach(user=>alert(user.name)))



//   If any of the promises is rejected, the promise returned by Promise.all immediately rejects with that error.

// For instance:

Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
  ]).catch(alert); // Error: Whoops!



//   here the second promise rejects in two seconds. That leads to an immedaite rejection of promise.all, so .catch executes the rejection error becomes the outcome of the entire Promise.all.

// ---------In case of an error other promises are ignored

//  If one promises rejects, promise.all immediately rejects, completely forgetting about the other ones in the list. their result are ignored.

//  For example, if there are mulitple fetch calls, like in the example above and one fails the other will still continue to execute, but promise. all wont watch them anymore. They will probably settle, but their results will be ignored.

// Promise.all does nothing to cancel them, as there is no concept of cancellation in promises.


//  Promise.all(iterable) allows non promise regular values in iterable Normally, promise.all(...) accepts an iterable of promise. But if any of those objecrs is not a promise, it is passed to the resulting array as is.

//  for instance here the result are [1,2,3]


Promise.all([
    new Promise((resolve, reject)=>{
        setTimeout(()=> resolve(1), 1000)
    }),2,3,4
]).then(alert)