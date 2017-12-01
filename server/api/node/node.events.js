/**
 * Node model events
 */

'use strict';

import {EventEmitter} from 'events';
var NodeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NodeEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Node) {
  for(var e in events) {
    let event = events[e];
    Node.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    NodeEvents.emit(`${event}:${doc._id}`, doc);
    NodeEvents.emit(event, doc);
  };
}

export {registerEvents};
export default NodeEvents;
