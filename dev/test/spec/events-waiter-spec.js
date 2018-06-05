describe("EventsWaiter", function(){

	describe("Check input params", function(){
	
		describe("#addEvent(event)", function(){
		    it("Should return an Error if the option *event* is not a string.");
		    it("The error's field massage should be equal to the string *The option 'event' should be a string.*.");
		});

		describe("#removeEvent(event)", function(){
		    it("Should return an Error if the option *event* is not a string.");
		    it("The error's field massage should be equal to the string *The option 'event' should be a string.*.");
	    });
	    
		describe("#completeEvent(event)", function(){
			it("Should return an Error if the option *event* is not a string.");
			it("The error's field massage should be equal to the string *The option 'event' should be a string.*.");
		});
		
		describe("#wait(callback)", function(){
		    it("Should return an Error if the option *callback* is not a function.");
		    it("The error's field massage should be equal to the string *The option 'callback' should be a function.*.");
	    });
    });
    
	describe('If the method *#wait()* has called before all events are called:', function(){
	    it("Should not call the callback if all events is not complete.");
	    it("Should call the callback when last event is completed.");
	    it("Should not call the callback if the method *#completeEvent()* is called again.");
    });
    
    describe("If the method *#wait()* has called after all events are called:", function(){
        it("Should not call the callback if all events is not complete.");
        it("Should not call the callback when last event is completed.");
        it("Should call the callback if the method *#wait()* is called.");
        it("Should not call the callback if the method *#completeEvent()* is called again.");
    });
    
    describe("If the methods *#wait()* and *#dontWait()* are called before all evenrs are called", function(){
        it("Should not call the callback if all events is not complete.");
        it("Should not call the callback when last event is completed.");
        it("Should not call the callback if the method *#completeEvent()* is called again.");
    });
    
    describe("#reset()", function(){
        it("The member *#_events* should be an empty array.");
        it("The member *#_callback* should be null.");
        it("The member *#_waitingStarted* should be equal to *true*.");
    });

});