describe("EventsWaiter", function(){

	describe("Check input params", function(){
	
		describe("#addEvent(event)", function(){
		
		    it("Should throw an Error if the option *event* is not a string.", function(){
		        var errorIsThrowed = false;
		        
		        try {
		            var waiter = new EventsWaiter();
		            waiter.addEvent();
		        } catch (e){
		            errorIsThrowed = true;
		        } finally {
		            if (!errorIsThrowed) throw new Error("Exception is not throwed.");
		        };
		    });
		    
		    it("The error's field massage should be equal to the string *The option 'event' should be a string.*.", function(){
		        try {
		            var waiter = new EventsWaiter();
		            waiter.addEvent();
		        } catch (e){
		            assert.equal(e.message, "The option 'event' should be a string.")
		        };
		    });
		});

		describe("#removeEvent(event)", function(){
		
		    it("Should throw an Error if the option *event* is not a string.", function(){
		        var errorIsThrowed = false;
		        
		        try {
		            var waiter = new EventsWaiter();
		            waiter.removeEvent(5);
		        } catch (e){
		            errorIsThrowed = true;
		        } finally {
		            if (!errorIsThrowed) throw new Error("Exception is not throwed.");
		        }
		    });
		    
		    it("The error's field massage should be equal to the string *The option 'event' should be a string.*.", function(){
		        try {
		            var waiter = new EventsWaiter();
		            waiter.removeEvent(5);
		        } catch (e){
		            assert.equal(e.message, "The option 'event' should be a string.")
		        };
		    });
	    });
	    
		describe("#completeEvent(event)", function(){
		
			it("Should throw an Error if the option *event* is not a string.", function(){
				var errorIsThrowed = false;
				
				try {
				    var waiter = new EventsWaiter();
				    waiter.completeEvent({});
				} catch (e){
				    errorIsThrowed = true;
				} finally {
				    if (!errorIsThrowed) throw new Error("Exception is not throwed.");
				}
			});
			
			it("The error's field massage should be equal to the string *The option 'event' should be a string.*.", function(){
				try {
				    var waiter = new EventsWaiter();
				    waiter.completeEvent({});
				} catch (e){
				    assert.equal(e.message, "The option 'event' should be a string.")
				};
			});
		});
		
		describe("#wait(callback)", function(){
		
		    it("Should throw an Error if the option *callback* is not a function.", function(){
				var errorIsThrowed = false;
				
				try {
				    var waiter = new EventsWaiter();
				    waiter.wait("");
				} catch (e){
				    errorIsThrowed = true;
				} finally {
				    if (!errorIsThrowed) throw new Error("Exception is not throwed.");
				}
		    });
		    
		    it("The error's field massage should be equal to the string *The option 'callback' should be a function.*.", function(){
				try {
				    var waiter = new EventsWaiter();
				    waiter.wait("");
				} catch (e){
				    assert.equal(e.message, "The option 'callback' should be a function.")
				};
		    });
	    });
    });
    
	describe('If the method *#wait()* has called before all events are called:', function(){
	
	    it("Should not call the callback if all events is not complete.", function(){
	        var callbackIsCalled = false;
	        
	        var callback = function(){
	            callbackIsCalled = true;
	        };
	        
	        var waiter = new EventsWaiter();
	        
	        waiter.addEvent("event0");
	        waiter.addEvent("event1");
	        waiter.completeEvent("event1");
	        
	        waiter.wait(callback);
	        
	        waiter.addEvent("event2");
	        waiter.completeEvent("event0");

	        assert.isFalse(callbackIsCalled);
	    });
	    
	    it("Should call the callback when last event is completed.", function(){
	        var callbackIsCalled = false;
	        
	        var callback = function(){
	            callbackIsCalled = true;
	        };
	        
	        var waiter = new EventsWaiter();
	        
	        waiter.addEvent("event0");
	        waiter.addEvent("event1");
	        
	        waiter.wait(callback);
	        
	        waiter.completeEvent("event1");
	        waiter.addEvent("event2");
	        waiter.completeEvent("event0");
	        waiter.completeEvent("event2");
	        
	        assert.isTrue(callbackIsCalled);
	    });
	    
	    it("Should not call the callback if the method *#completeEvent()* is called again.", function(){
	        var callbackIsCalled = false;
	        
	        var callback = function(){
	            callbackIsCalled = true;
	        };
	        
	        var waiter = new EventsWaiter();
	        
	        waiter.addEvent("event0");
	        
	        waiter.wait(callback);
	        
	        waiter.addEvent("event1");
	        waiter.completeEvent("event1");
	        waiter.addEvent("event2");
	        waiter.completeEvent("event0");
	        waiter.completeEvent("event2");
	        
	        assert.isTrue(callbackIsCalled);
	        
	        callbackIsCalled = false;
	        waiter.completeEvent("event0");
	        
	        assert.isFalse(callbackIsCalled);
	    });
    });
    
    describe("If the method *#wait()* has called after all events are called:", function(){
    
        it("Should not call the callback if all events is not complete.", function(){
            var callbackIsCalled = false;
            
            var callback = function(){
                callbackIsCalled = true;
            };
            
            var waiter = new EventsWaiter();
            
            waiter.addEvent("event0");
            waiter.addEvent("event1");
            waiter.completeEvent("event1");
            waiter.addEvent("event2");
            waiter.completeEvent("event0");
            
            assert.isFalse(callbackIsCalled);
        });
        
        it("Should not call the callback when last event is completed.", function(){
            var callbackIsCalled = false;
            
            var callback = function(){
                callbackIsCalled = true;
            };
            
            var waiter = new EventsWaiter();
            
            waiter.addEvent("event0");
            waiter.addEvent("event1");
            waiter.completeEvent("event1");
            waiter.addEvent("event2");
            waiter.completeEvent("event0");
            waiter.completeEvent("event2");
            
            assert.isFalse(callbackIsCalled);
        });
        
        it("Should call the callback if the method *#wait()* is called.", function(){
			var callbackIsCalled = false;
			
			var callback = function(){
			    callbackIsCalled = true;
			};
			
			var waiter = new EventsWaiter();
			
			waiter.addEvent("event0");
			waiter.addEvent("event1");
			waiter.completeEvent("event1");
			waiter.addEvent("event2");
			waiter.completeEvent("event0");
			waiter.completeEvent("event2");
			
			waiter.wait(callback);
			
			assert.isTrue(callbackIsCalled);
        });
        
        it("Should not call the callback if the method *#completeEvent()* is called again.", function(){
            var callbackIsCalled = false;
            
            var callback = function(){
	            callbackIsCalled = true;
            };
            
            var waiter = new EventsWaiter();
            
            waiter.addEvent("event0");
            waiter.addEvent("event1");
            waiter.completeEvent("event1");
            waiter.addEvent("event2");
            waiter.completeEvent("event0");
            waiter.completeEvent("event2");
            
            waiter.wait(callback);
            
            assert.isTrue(callbackIsCalled);
            
            callbackIsCalled = false;
            waiter.completeEvent("event0");
            
            assert.isFalse(callbackIsCalled);
        });
    });
    
    describe("If the methods *#wait()* and *#dontWait()* are called before all evenrs are called", function(){
    
        it("Should not call the callback if all events is not complete.", function(){
            var callbackIsCalled = false;
            
            var callback = function(){
	            callbackIsCalled = true;
            };
            
            var waiter = new EventsWaiter();
            
            waiter.addEvent("event0");
            
            waiter.wait(callback);
            
            waiter.addEvent("event1");
            waiter.completeEvent("event1");
            waiter.addEvent("event2");
            
            waiter.dontWait();
            
            waiter.completeEvent("event0");
            
            assert.isFalse(callbackIsCalled);
        });
        
        it("Should not call the callback when last event is completed.", function(){
            var callbackIsCalled = false;
            
            var callback = function(){
	            callbackIsCalled = true;
            };
            
            var waiter = new EventsWaiter();
            
            waiter.addEvent("event0");
            waiter.addEvent("event1");
            
            waiter.wait(callback);
            
            waiter.completeEvent("event1");
            waiter.addEvent("event2");
            
            waiter.dontWait();
            
            waiter.completeEvent("event0");
            waiter.completeEvent("event2");
            
            assert.isFalse(callbackIsCalled);
        });
        
        it("Should not call the callback if the method *#completeEvent()* is called again.", function(){
            var callbackIsCalled = false;
            
            var callback = function(){
	            callbackIsCalled = true;
            };
            
            var waiter = new EventsWaiter();
            
            waiter.addEvent("event0");
            waiter.addEvent("event1");
            
            waiter.wait(callback);
            
            waiter.completeEvent("event1");
            waiter.addEvent("event2");
            
            waiter.dontWait();
            
            waiter.completeEvent("event0");
            waiter.completeEvent("event2");
            waiter.completeEvent("event2");
            
            assert.isFalse(callbackIsCalled);
        });
    });
    
    describe("#reset()", function(){
    
        it("The member *#_events* should be an empty array.", function(){
            var waiter = new EventsWaiter();
            
            waiter.addEvent("event0");
            waiter.addEvent("event0");
            
            waiter.reset();
            
            assert.isArray(waiter._events);
            assert.equal(waiter._events.length, 0);
        });
        
        it("The member *#_callback* should be null.", function(){

            var waiter = new EventsWaiter();
            
            waiter.addEvent("event0");
            waiter.addEvent("event0");
            waiter.wait(function(){});
            
            waiter.reset();

            assert.isNull(waiter._callback);			
        });
        
        it("The member *#_waitingStarted* should be equal to *false*.", function(){

            var waiter = new EventsWaiter();
            
            waiter.addEvent("event0");
            waiter.addEvent("event0");
            waiter.wait(function(){});
            
            waiter.reset();

            assert.isFalse(waiter._waitingStarted);			

        });
    });

});