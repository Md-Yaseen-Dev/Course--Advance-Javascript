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
function count() {

  // do a heavy job
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  console.log("Done in " + (Date.now() - start) + 'ms');
}

count();

//  THe browser may even show a "the script takes too long" warning.

//  lets split the job using nested setTimeout calls.


let j=0;

let start1 = Date.now();

function count1(){


  //  do a piece of the heavy job

  do{
    j++;

  }
  while(j % 1e6 !=0);

  if(j == 1e9){
    console.log("Done in " + (Date.now() - start1) + "ms" )
  } else{
    setTimeout(count1)
  }
}

count1();

// Now the browser interface is fully functional during the “counting” process.

// A single run of count does a part of the job (*), and then re-schedules itself (**) if needed:

// First run counts: i=1...1000000.
// Second run counts: i=1000001..2000000.
// …and so on.
// Now, if a new side task (e.g. onclick event) appears while the engine is busy executing part 1, it gets queued and then executes when part 1 finished, before the next part. Periodic returns to the event loop between count executions provide just enough “air” for the JavaScript engine to do something else, to react to other user actions.

// The notable thing is that both variants – with and without splitting the job by setTimeout – are comparable in speed. There’s not much difference in the overall counting time.

// To make them closer, let’s make an improvement.

// We’ll move the scheduling to the beginning of the count():

let k = 0 ;

let start2 = Date.now();

function count3(){

  // move the scheduling to the beginning

  if(k < 1e9 -1e6){

    setTimeout(count3);
  }

  do {
    k++;
  }while( k % 1e6 !=0);

  if(k == 1e9){
    console.log("Done in " + (Date.now()-start2)+ "ms");
  }
}
count3();

// Now when we start to count() and see that we’ll need to count() more, we schedule that immediately, before doing the job.

// If you run it, it’s easy to notice that it takes significantly less time.

// Why?

// That’s simple: as you remember, there’s the in-browser minimal delay of 4ms for many nested setTimeout calls. Even if we set 0, it’s 4ms (or a bit more). So the earlier we schedule it – the faster it runs.

// Finally, we’ve split a CPU-hungry task into parts – now it doesn’t block the user interface. And its overall execution time isn’t much longer.


// ----Use Case:2 progress indication

/*
Another benefit of splitting heavy tasks for browser scripts is that we can show progress indication.

As mentioined earliermchanges to DOm are pained only after the currently running task ios completed, irrespective of how long it takes.

On one hand that's great because our function may create many elments. add them one-by-one to the document and change their styles-the visitor won't see any intermediate unfinshed state . An important thing,right?

Here's the demo, the changes to i won't show up until the function finshes, so we'll see only the last value.
*/


// ---- Use case 3: doing something after the event

/*In an event handler we may decide to postpone some actions until the event bubbled up and was handled on all levels. We can do that by wrapping the code in zero delay setTimeout

In the chapter Dispatching curstom event s we saw an example custoem event menu-open is dispatched in setTimeout. so that it happedns after the click event is fully handled.
// */

// menu.onclick = function() {
//   // ...

//   // create a custom event with the clicked menu item data
//   let customEvent = new CustomEvent("menu-open", {
//     bubbles: true
//   });

//   // dispatch the custom event asynchronously
//   setTimeout(() => menu.dispatchEvent(customEvent));
// };

// --------    Macrotasks and Microtasks----------


/*
Along with macrotasks, described in this chapterm there are microtasks, mentioned in the chapter Microtasks

MIcrotasks come solely from our code. They are usually created by promises an execution of .then/catch/finally handler becomes a microtask. Microtasks are used under the cover of await as well as it,s another form of primise handiling.

there is also a specail function queueMicrotask(func ) that queues func for execution in the microtask queue.

// Immediately after every macrotask, the engine executed all tasks from microtask queue, prior to runnign any other macrotasks or rendering or anything else.

For instance, take a look

*/

setTimeout(() => console.log("timeout")); // 3. callback-queue. or macrotask queue.

Promise.resolve()
  .then(() => console.log("promise")); // 2. it is in microtask queue first pereference than callback-queue

console.log("code"); // 1. it is in global memory



// 1.code shows first, because it is a regular synchronous call.

// 2. promise show second , because .then passes through the microtask queue, and runs after the current code.

// 3. timeout shows lasts, because it is a macrotask.

