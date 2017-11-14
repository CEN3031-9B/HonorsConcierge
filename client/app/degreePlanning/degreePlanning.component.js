'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './degreePlanning.routes';

export class DegreePlanningComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('honorsConciergeApp.degreePlanning', [uiRouter])
  .config(routes)
  .component('degreePlanning', {
    template: require('./degreePlanning.html'),
    controller: DegreePlanningComponent,
    controllerAs: 'degreePlanningCtrl'
  })
  .name;
