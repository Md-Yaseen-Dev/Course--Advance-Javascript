//            -----WeakMap and WeakSet---


let john = {name:"JOhn"};

//  the object can be accessed, john  is the reference to it


let array = [john];

// overwrite the reference
john = null;

console.log(john);
//  the object will be removed from memory.

//  the object previously reference by john is stored inside the array .

//  therefore it wont be garbage collected.

//  we can get it as array[0];

// ----similar 

let john1 = {name: "johnny"};

let map = new Map();

map.set(john1,"...");
john1 = null;

console.log(map.keys())

// ----!WeakMap

/*The first differnce between Map and WeakMap is that keys must be objects not primitive values. */

let weakmap = new WeakMap();

let obj = {};

weakmap.set(obj,"ok");

// weakmap.set("test","Whoops")   -- Error , because test is not an object.

// ---Now if we use an object as the key in it. and there are no other references to that object- it will be removed from memory and from the map automatically.

let smith = {name:"SNit"};

let weakmap1 = new WeakMap();

weakmap1.set(smith,"...");

smith = null;


//Note:-mpare it with the regular Map example above. Now if john only exists as the key of WeakMap – it will be automatically deleted from the map (and memory).

// WeakMap does not support iteration and methods keys(), values(), entries(), so there’s no way to get all keys or values from it.

// WeakMap has only the following methods:

// weakMap.set(key, value)
// weakMap.get(key)
// weakMap.delete(key)
// weakMap.has(key)


// ?---! Use case: additonal data

/*The main aread of application for WeakMap is an additonal data storage. 

If we are working with an object that belongs to another code. maybe even a third party library and would like to store some data associated with it. that should only exist while the object is alive-then WeakMap is exactly what's needed.

We put the data to a WeakMap,using the object as the key, and when the object is garbage collected, that data will automatically , diappear as well.
*/

// weakmap1.set(smith, "secrect documents"); error 

//If smith dies, secret document will be destroyed automatically.


// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// increase the visits count
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}



// ------------Use case:caching

// ---Another common example is caching . We can store "cahe" result from a funciton, so that future calls on the samw object can reuse it.



// 📁 cache.js

let cache = new Map();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculations of the result for */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// Now we use process() in another file:

// 📁 main.js
let obj1 = {/* let's say we have an object */};

// let obj2 = {} -- if use two object cache size also be 2.
let result1 = process(obj1); // calculated

// ...later, from another place of the code...
let result2 = process(obj1); // remembered result taken from cache

// ...later, when the object is not needed any more:
// obj1 = null;

console.log(cache.size); // 1 (Ouch! The object is still in cache, taking memory!)


// ~~! // Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well


// ?!@   


let visitedSet = new WeakSet();

let joh = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(joh); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(joh); // John again

// visitedSet has 2 users now

// check if John visited?
console.log(visitedSet.has(joh)); // true

// check if Mary visited?
console.log(visitedSet.has(mary)); // false

joh = null;

// visitedSet will be cleaned automatically


// WeakMap and WeakSet are used as “secondary” data structures in addition to the “primary” object storage. Once the object is removed from the primary storage, if it is only found as the key of WeakMap or in a WeakSet, it will be cleaned up automatically.