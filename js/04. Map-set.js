// ------------------ Maps and  Set--------------------------

/*
Till now, we have learned about the following complex data structures

- Objects are used for storing keued collections.
- Arrays are used for storing ordered collections.

But that's not enough for real life. That's why map and set exists.

*/


//-------------------------  Map ------------------------

/* 
Map is a collection of keyed data items,just like an object. but the main difference is that Map allows keys of any type.


Methods and properties are:

- new Map() - creates the map.
- map.set(key,value) - stores the value by the key.
- map.get(key)- returns the value by the key, undefined if key doesn't exist in map.
- map.has(key) - returns true if the key exists false otherwise.
- map.delete(key) - removes the element (the key/value pair by the key.)
- map.claear() - removes everything from the map
- map.size - returns the current element count.
*/


let map =  new Map();

map.set("1" , "str1");  // a string key
map.set(1, "num1"); // a numeric key
map.set(true, "bool1") // a boolean key



console.log(map.get(1))
console.log(map.get("1"))


/* map[key] isn’t the right way to use a Map
Although map[key] also works, e.g. we can set map[key] = 2, this is treating map as a plain JavaScript object, so it implies all corresponding limitations (only string/symbol keys and so on).

So we should use map methods: set, get and so on. */


// -------------------- Iteration over Map   -----------



// For looping over a map, there are 3 methods:

// map.keys() – returns an iterable for keys,
// map.values() – returns an iterable for values,
// map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of.

let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion',    50]
  ]);
  
  // iterate over keys (vegetables)
  for (let vegetable of recipeMap.keys()) {
    console.log(vegetable); // cucumber, tomatoes, onion
  }
  
  // iterate over values (amounts)
  for (let amount of recipeMap.values()) {
    console.log(amount); // 500, 350, 50
  }
  
  // iterate over [key, value] entries
  for (let entry of recipeMap) { // the same as of recipeMap.entries()
    console.log(entry); // cucumber,500 (and so on)
  }


  let obj = {
    name: "John",
    age: 30
  };
  
  let map2 = new Map(Object.entries(obj));
  
  console.log( map2.get('name') ); // John




//   We can use Object.fromEntries to get a plain object from Map.

// E.g. we store the data in a Map, but we need to pass it to a 3rd-party code that expects a plain object.

// Here we go:

let diet = new Map();
diet.set('banana', 1);
diet.set('orange', 2);
diet.set('meat', 4);

let obj1 = Object.fromEntries(diet.entries()); // make a plain object (*)

// done!
// obj = { banana: 1, orange: 2, meat: 4 }

console.log(obj1.meat); // 2
// A call to map.entries() returns an iterable of key/value pairs, exactly in the right format for Object.fromEntries.

// We could also make line (*) shorter:

// let obj = Object.fromEntries(map); // omit .entries()
// That’s the same, because Object.fromEntries expects an iterable object as the argument. Not necessarily an array. And the standard iteration for map returns same key/value pairs as map.entries(). So we get a plain object with same key/values as the map.


// -----------------------set------------------


/*

A Set is a special type collection – “set of values” (without keys), where each value may occur only once.

Its main methods are:

- new Set([iterable]) – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
- set.add(value) – adds a value, returns the set itself.
- set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
set.has(value) – returns true if the value exists in the set, otherwise false.
set.clear() – removes everything from the set.
set.size – is the elements count.*/


let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };
let yaseen = { name: "sadfda" };



// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(yaseen);

// set keeps only unique values
console.log( set.size ); // 3

for (let user of set) {
  console.log(user.name); // John (then Pete and Mary)
}

// --------Iteration over Set -----------------


//  we can loop over a set either for...of or using foreach

let set1 = new Set(["oranges", "apples", "bananas"]);

console.log(set1.values())
for(let value of set1){
    console.log(value)
}

set1.forEach((value, valueAgain, set1)=>{
    console.log(value)
})


// Note the funny thing. The callback function passed in forEach has 3 arguments: a value, then the same value valueAgain, and then the target object. Indeed, the same value appears in the arguments twice.

// That’s for compatibility with Map where the callback passed forEach has three arguments. Looks a bit strange, for sure. But this may help to replace Map with Set in certain cases with ease, and vice versa.

// The same methods Map has for iterators are also supported:

// set.keys() – returns an iterable object for values,
// set.values() – same as set.keys(), for compatibility with Map,
// set.entries() – returns an iterable object for entries [value, value], exists for compatibility with Map.


function aclean(arr){

    let map = new Map();

    for(let word of arr){

        let sorted = word.toLowerCase().split("").sort().join("");

        map.set(sorted, word)
    }
    return Array.from(map.entries())
}
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log( aclean(arr) )