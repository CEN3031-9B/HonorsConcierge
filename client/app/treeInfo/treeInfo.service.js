'use strict';
const angular = require('angular');

/*@ngInject*/
export function treeInfoService($http, $stateParams) {
  // AngularJS will instantiate a singleton by calling "new" on this function

  var nodeId = $stateParams.treeId;

  var getTreeInfo = function() {
    return $http({
      method: 'GET',
      url: `/api/nodes/${nodeId}`
    });
  };

  return {
    getTreeInfo
  };
}

export default angular.module('honorsConciergeApp.treeInfo', [])
  .service('treeInfo', treeInfoService)
  .name;
