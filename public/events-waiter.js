/** Create an object that can call the callback function when all registered events are completed.
 * @constructor EventsWaiter
 */
 /*
 * @method {undefined} #addEvent(string: event) - Register an event.
 * @method {undefined} #removeEvent(string: event) - Unregister an event.
 * @method {undefined} #completeEvent(string: event) - Mark an event as completed.
 * @method {undefined} #wait(function: callback) - Start waiting. Call the callback function when all events are completed.
 * @method {undefined} #dontWait() - Stop waiting.
 * @method {undefined} #reset() - Rallback this object to the inital state.
 
 * @method {undefined} #_tryToComplete() - Check conditions of the waiting stop. Stop waiting and call the callback function if conditions are truly.
 * @method {boolean} #_areEventsCompleted() - Return true if all events are completed, else rerurn false.
 
 * @member {array} ~_events - The events list.
 * @member {function|null} ~_callback - The callback that will be called when all events are completed.
 * @member {boolean} ~_waitingStarted - The flag that specified the waiting state.
 */
function EventsWaiter(){

    /** The events list.
     * @member {array} EventsWaiter~_events
     * @private
     */
    this._events = [];
    
    /** The callback that will be called when all events are completed.
     * @member {function} EventsWaiter~_callback
     * @private
     */
    this._callback = null;
    
    /** The flag that specified the waiting state.
     * @member {boolean} EventsWaiter~_waitingStarted
     * @private
     */
    this._waitingStarted = false;
    
};

/** Register an event. 
 * @method EventsWaiter#addEvent
 * @param {string} event - Event name.
 * @returns {undefined}
 */
EventsWaiter.prototype.addEvent = function(event){
    if (typeof(event) != "string") throw new Error("The option 'event' should be a string.");
    
    this._events.push(event);
};

/** Unregister an event.
 * @method EventsWaiter#removeEvent
 * @param {string} event - Event name.
 * @returns {undefined}
 */
EventsWaiter.prototype.removeEvent = function(event){
    if (typeof(event) != "string") throw new Error("The option 'event' should be a string.");
    
    for (var i=0; i<this._events.length; i++){
        if (this._events[i] == event){
            this._events.splice(i, 1);
        };
    };
};

/** Mark an event as completed.
 * @method EventsWaiter#completeEvent
 * @param {string} event - Event name.
 * @returns {undefined}
 */
EventsWaiter.prototype.completeEvent = function(event){
    if (typeof(event) != "string") throw new Error("The option 'event' should be a string.");
    
    this.removeEvent(event);
    this._tryToComplete();
};

/** Start waiting. Call the callback function when all events are completed. 
 * @method EventsWaiter#wait
 * @param {function} callback
 * @returns {undefined}
 */
EventsWaiter.prototype.wait = function(callback){
    if (!(callback instanceof Function)) throw new Error("The option 'callback' should be a function.");
    
    this._callback = callback;
    this._waitingStarted = true;
    this._tryToComplete();
};

/** Stop waiting.
 * @method EventsWaiter#dontWait
 * @returns {undefined}
 */
EventsWaiter.prototype.dontWait = function(){
    this._waitingStarted = false;
    this._callback = null;
};

/** Rallback this object to the inital state.
 * @method EventsWaiter#reset
 * @returns {undefined}
 */
EventsWaiter.prototype.reset = function(){
    this._events = [];
    this._callback = null;
    this._waitingStarted = false;
};
 
/** Check conditions of the waiting stop. Stop waiting and call the callback function if conditions are truly.
 * @method EventsWaiter#_tryToComplete
 * @returns {undefined}
 * @private
 */
EventsWaiter.prototype._tryToComplete = function(){
	if (this._waitingStarted){
	    if (this._areEventsCompleted()){
	        var callback = this._callback;
	        this.dontWait();
	        callback();
	    };
	};
};

/** Return true if all events are completed, else rerurn false.
 * @method EventsWaiter#_areEventsCompleted
 * @returns {boolean}
 * @private
 */
EventsWaiter.prototype._areEventsCompleted = function(){
    if (this._events.length == 0) return true;
    return false;
};