//  Event loop


/*The event loop concept is very simple. There is an endless loop, where the javascript engine waits for tasks, executes them and then sleeps, waiting for more tasks.


The general algorithm of the engine

1. while there are tasks
   Execute them, starting with the oldest task.
   
2. Sleep until a task appears, then go to 1.

that's a formalization for what we see when browsing a page. The javascript engine does nothing most of the time, it only runs if a script/handles/event activates.*/


// Use-case 1: splitting CPU-hungry tasks



let i = 0;

let start = Date.now();

console.log(start)
function count() {

  // do a heavy job
  console.log(1e9);
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  console.log("Done in " + (Date.now() - start) + 'ms');
}

count();