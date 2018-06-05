# events-waiter.js

The constructor **"EventsWaiter"** creates an object that can call the callback function when all registered events are completed.

## How to use

Include the file **"events-waiter.js"** into your project.

    <script type="text/javascript" src="lib/include-mocha.js"></script>
    
Create an instance of the class **"EventsWaiter"**.

    var waiter = new EventsWaiter();
    
Register events on the method **"#addEvent"**.

    waiter.addEvent("event_1");
    waiter.addEvent("event_2");
    waiter.addEvent("event_3");
    
Call the method **"#wait(callback)"** for the start events waiting. Pass the callback function in this method as option. The callback will be called when all events are completed.

    waiter.wait(function(){});

Marks events as completed.

    waiter.completeEvent("event_1");
    waiter.completeEvent("event_2");
    waiter.completeEvent("event_2");
    
After that the callback function will be called.

If you marks all events as completed earlier than you call the method **"#wait()"**, the callback function will be called when the method **"#wait()"** is called.

If you want remove a registered event, use the method **"#removeEvent()"**.

    waiter.removeEvent("event_1");

If you want rallback an instance to the inital state, use the method **"#reset()"**.

    waiter.reset();
    
***

Look additional information in the  [documentation](https://spomni.github.io/events-waiter.js).