//  Garbage collection

// -- reachable values are those who accessible and gurantedd to be stored in memory


// There is a background process in the javascript engine that is called garbage collector. It monitors all objects and removes those that have become unreachable


//  ---! A simple example

let user = {

    name:"john"
}
console.log(user)

/*
global
user = object
*/

// object  name:john


user = null;
console.log(user)

/*
global user:null

*/

// object name:john


// --- Now john becomes unreachable. There is no way to access it. no reference to it. Garbage collector will junk the date and free the memory.


// ?!  Two refernce . i.e user has a reference to the object.

let user1 = {

    name :"john"
}

let admin = user1;

user1 = null;

console.log("user1:" + user1);

console.log(admin)


// here admin and user1 are same but there are stored in different memory locations. so user1 will go to garbage collector .

function marry(man, woman) {
    woman.husband = man;
    man.wife = woman;
  
    return {
      father: man,
      mother: woman
    }
  }
  
  let family = marry({ name: "John" }, { name: "Ann"});

  console.log(family.mother)


//   unreachable island  

family =  null;

console.log(family);



// Note: - The basic garbage collection algorithm is called "mark and sweep"


/*
-- some of the optimization

1) Generalized collection - Objects are split into two sets   i) new ones ii) odd ones . In typical code many objects have a short life span they appear do their job and die fast, so it makes sense to track new objects and clear the memory from them if that the case. Those that survive for long enough become old and are examined less often.


2) Incremental collection - If there are many objects. and we try to walk and mark the whole object set at once.it may take some time and introduce visible delays in the execution. So the engine splits the whole set of existing objects into multiple parts . And then clear these parts one after another. There are many small garbage collections instead of a total one. That requries some extra bookkeeping between them to track changes. but we get may tiny delays instead of a big one.

idle-time collection :-  the garbage collector tries to run only while the CPU is idle, to reduce the possibl effect on the execution.


*/