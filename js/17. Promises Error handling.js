// --------------------Error handling with promise


// Promise chains are great at error handling. When a promise rejects, the control jumps to the closest rejection handler. That's very convenient in practice.


// for instance, in the code, the URL to fetch is wrong and .catch handles the error.

// fetch('https://no-such-server.blabla') // rejects
//   .then(response => response.json())
//   .catch(err => console.log(err)) //




//   fetch('/article/promise-chaining/user.json')
//   .then(response => response.json())
//   .then(user => fetch(`https://api.github.com/users/${user.name}`))
//   .then(response => response.json())
//   .then(githubUser => new Promise((resolve, reject) => {
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.append(img);

//     setTimeout(() => {
//       img.remove();
//       resolve(githubUser);
//     }, 3000);
//   }))
//   .catch(error => console.log(error.message));

//   Normally, such .catch doesn't trigger at all. but if any og the promises above rejects , thenit would catch it.

// ----------------------------Implicit try..catch

//  The code of a promise executor and promise handlers has an invisible try...catch around it. if an exception happens, it gets caught and treted as a rejection.

new Promise((resolve, reject) => {
    throw new Error("Whoops!");
  }).catch(console.log()); 


//   The "invisible try..catch" around the executor automatically catches the error and turns it into rejected promise.

// This happens not only in the executor function, but in its handlers as well. If we throw inside a .then handler, that means a rejected promise, so the control jumps to the nearest error handler.



// -------------Rethrowing--------------------

// As we already noticed, .catch at the end of the chain is similar to try..catch. We may have as many .then handlers as we want, and then use a single .catch at the end to handle errors in all of them.

// In a regular try..catch we can analyze the error and maybe rethrow it if it can’t be handled. The same thing is possible for promises.

// If we throw inside .catch, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the next closest successful .then handler.

// In the example below the .catch successfully handles the error:

// the execution: catch -> then
new Promise((resolve, reject) => {

    throw new Error("Whoops!");
  
  }).catch(function(error) {
  
     console.log("The error is handled, continue normally");
  
  }).then(() =>  console.log("Next successful handler runs"));






  //-------------------------unhandled rejections-----------------


//   What happens when an error is not handled? For instance, we forgot to append .catch to the end of the chain, like here:

new Promise(function() {
  noSuchFunction(); // Error here (no such function)
})
  .then(() => {
    // successful promise handlers, one or more
  }); // without .catch at the end!

  