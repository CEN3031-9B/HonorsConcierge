'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('tree', {
      url: '/tree',
      template: '<tree></tree>'
    });
}
