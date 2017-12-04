'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

const async = require('async');
const _ = require('lodash');

import routes from './contact.routes';

export class ContactComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('honorsConciergeApp.contact', [uiRouter])
  .config(routes)
  .component('contact', {
    template: require('./contact.html'),
    controller: ['$http', '$scope', '$window', ContactComponent],
    controllerAs: 'contactCtrl'
  })
  .name;
