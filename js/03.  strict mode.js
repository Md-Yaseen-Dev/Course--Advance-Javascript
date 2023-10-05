// -----------------       Modern mode, "use strict"       -------------------


/*
The directive looks like a string "use strict or use strict" when it is lcoated a the top of a script, the whole script works the modern way.

"use strict";

.. this code works the modern way
*/


//  Quite soon we are going to learn functions a way to group commands, so lets note in advance that use strict can be put at the beginning of a function . Doing that enables strict mode in that function only. but usually people use it for the whole steps.



// ----------------------------------------------------------------------------------------------------------------

// -------Should we “use strict”?

// The question may sound obvious, but it’s not so.

// One could recommend to start scripts with "use strict"… But you know what’s cool?

// Modern JavaScript supports “classes” and “modules” – advanced language structures (we’ll surely get to them), that enable use strict automatically. So we don’t need to add the "use strict" directive, if we use them.

// So, for now "use strict"; is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.

// As of now, we’ve got to know about use strict in general.

// In the next chapters, as we learn language features, we’ll see the differences between the strict and old modes. Luckily, there aren’t many and they actually make our lives better.