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

weakmap.set(smith, "secrect documents");

//If smith dies, secret document will be destroyed automatically.

