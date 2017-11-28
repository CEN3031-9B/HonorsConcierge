'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('tree', {
      url: '/tree/:treeId',
      template: '<tree></tree>'
    });
}
