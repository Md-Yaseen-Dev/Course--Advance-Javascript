// --------------------------? Callbacks----------------------------

//  We use browser methods in examples here

/*
Many functions are provided by javascript host enviornments that allow you to schedule asynchronous actions.

In other words, actions that we initiate now, but they finish later.

For instance, one such function is the setTimeout function.

There are other real-world examples of asynchronous actions, e.g loading scripts and modules.

Take a look at the function loadscript that loads a script with the given src

*/
function loadScript(src){

    // creates a <script> tag and append it to the page

    //  This causes the script with given src to start loading and run when complete

    let script = document.createElement('script');

    script.src = src;

    document.head.append(script);
}
loadScript("js/13. Scheduling.js");


//  ------------------------?callback in callback-----------------------------------


// how can we load two scripts sequentially: the first one, and then second one after it?

// The natural solution would be to put second loadscript call inside the callback, like this

loadScript('/my/script.js', function(script) {

    alert(`Cool, the ${script.src} is loaded, let's load one more`);
  
    loadScript('/my/script2.js', function(script) {
      alert(`Cool, the second script is loaded`);
    });
  
  });

//   after the outer loadscript completes, the callback initiates the inner one.

//  what if we want one more script...?



loadScript('/my/script.js', function(script) {

    loadScript('/my/script2.js', function(script) {
  
      loadScript('/my/script3.js', function(script) {
        // ...continue after all scripts are loaded
      });
  
    });
  
  });

//    So, every new action is inside a callback. That is fine for few actions, but not good for many, so we will see other variants soon.


// ------------------------------? Handling errors----------------------------------


//  In the above examples we did not consider errors, what if the script loading fails? our callback should be able to react on that.


// ? here is an improved version of loadscript that tracks loading erros


function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
  
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));
  
    document.head.append(script);
  }

//   It calls callback(null, script for successful load and callback (error) otherwise.)

//The usage:

loadScript('/my/script.js', function(error, script) {
    if (error) {
      // handle error
    } else {
      // script loaded successfully
    }
  });

//   Once again, the recipe that we used for loadScript is actually quite common. It’s called the “error-first callback” style.

// The convention is:

// The first argument of the callback is reserved for an error if it occurs. Then callback(err) is called.
// The second argument (and the next ones if needed) are for the successful result. Then callback(null, result1, result2…) is called.
// So the single callback function is used both for reporting errors and passing back results.


// ------------------------------------- Pyramid of Doom----------------------------

//  At first glance it looks like a viable approach to aynchronous coding. And indeed it is. for one or maybe two nested call it looks fine.

// but for multiple asynchoronous actions that follow one after another, we will have code like this.


loadScript('1.js', function(error, script) {

    if (error) {
      handleError(error);
    } else {
      // ...
      loadScript('2.js', function(error, script) {
        if (error) {
          handleError(error);
        } else {
          // ...
          loadScript('3.js', function(error, script) {
            if (error) {
              handleError(error);
            } else {
              // ...continue after all scripts are loaded (*)
            }
          });
  
        }
      });
    }
  });

//    In the code above:

// 1. we load 1.js, than if there is no error

// 2. we load 2.js then if there is no error

// 3. we load 3.js, then if there is no erroe - do something else(*)


// As calls become more nested, the code becomes deeper and increasingly more difficult to manage, especially if we have real code instead of ... that may include more loops, conditional statements and so on.

// That’s sometimes called “callback hell” or “pyramid of doom.”


// The “pyramid” of nested calls grows to the right with every asynchronous action. Soon it spirals out of control.

// So this way of coding isn’t very good.

// We can try to alleviate the problem by making every action a standalone function, like this:

loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
}