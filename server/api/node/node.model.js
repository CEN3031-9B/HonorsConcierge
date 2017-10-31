'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './node.events';

var NodeSchema = new mongoose.Schema({
  title: String, // text to be displayed for parent node
  description: String, // text to be displayed in headings and breadcrumbs
  content: String, // text to be displayed when on this node
  children: [mongoose.Schema.ObjectId],
  ancestors: [{
    name: String,
    id: mongoose.Schema.ObjectId
  }]
});

registerEvents(NodeSchema);
export default mongoose.model('Node', NodeSchema);
