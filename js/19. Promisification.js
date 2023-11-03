//  ----------------------Promisfication--------------------


// Promosification is along word for a single transformation. It is the conversion of a function that accepts a callback into a function that returns a promise.

// such transformations are often required in real life. as many functions and libraries are calback bases . but promises are more convenient, so it makes sense to promisify them.

function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
  
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));
  
    document.head.append(script);
  }
  
  //The function loads a script with the given src, and then calls callback(err) in case of an error, or callback(null, script) in case of successful loading. That’s a widespread agreement for using callbacks, we saw it before.

  //Let’s promisify it.

// We’ll make a new function loadScriptPromise(src), that does the same (loads the script), but returns a promise instead of using callbacks.


// In other words, we pass it only src (no callback) and get a promise in return, that resolves with script when the load is successful, and rejects with the error otherwise.

let loadScriptPromise1 = function(src) {
    return new Promise((resolve, reject) => {
      loadScript(src, (err, script) => {
        if (err) reject(err);
        else resolve(script);
      });
    });
  };

//   As we can see, the new function is a wrapper around the original loadScript function. It calls it providing its own callback that translates to promise resolve/reject.

// Now loadScriptPromise fits well in promise-based code. If we like promises more than callbacks (and soon we’ll see more reasons for that), then we will use it instead.
function promisify(f) {
    return function (...args) { // return a wrapper-function (*)
      return new Promise((resolve, reject) => {
        function callback(err, result) { // our custom callback for f (**)
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
  
        args.push(callback); // append our custom callback to the end of f arguments
  
        f.call(this, ...args); // call the original function
      });
    };
  }
  
  // usage:
//   let loadScriptPromise = promisify(loadScript);
//   loadScriptPromise1(...).then(...);

// The code may look a bit complex, but it’s essentially the same that we wrote above, while promisifying loadScript function.

// A call to promisify(f) returns a wrapper around f (*). That wrapper returns a promise and forwards the call to the original f, tracking the result in the custom callback (**).

// Here, promisify assumes that the original function expects a callback with exactly two arguments (err, result). That’s what we encounter most often. Then our custom callback is in exactly the right format, and promisify works great for such a case.