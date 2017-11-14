'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('degreePlanning', {
      url: '/degreePlanning',
      template: '<degree-planning></degree-planning>'
    });
}
