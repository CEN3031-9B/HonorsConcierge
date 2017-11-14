'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './tree.routes';

export class TreeComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('honorsConciergeApp.tree', [uiRouter])
  .config(routes)
  .component('tree', {
    template: require('./tree.html'),
    controller: TreeComponent,
    controllerAs: 'treeCtrl'
  })
  .name;
