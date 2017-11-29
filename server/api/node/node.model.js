'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './node.events';

var AncestorSchema = new mongoose.Schema({
  title: String, // text displayed in breadcrumbs
  id: mongoose.Schema.ObjectId // id of breadcrumx item
});

var NodeSchema = new mongoose.Schema({
  title: String, // text to be displayed for parent node
  description: String, // text to be displayed in headings and breadcrumbs
  content: String, // text to be displayed when on this node
  children: [mongoose.Schema.ObjectId],
  ancestors: [AncestorSchema], // objects should contain the name of the ancestor and the ancestor's id
  isLeaf: Boolean, // bool whether node is a leaf
  isRoot: Boolean // bool whether node is for the home page
});

registerEvents(NodeSchema);
export default mongoose.model('Node', NodeSchema);
