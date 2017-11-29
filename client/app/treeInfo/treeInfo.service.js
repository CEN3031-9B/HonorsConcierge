'use strict';
const angular = require('angular');

/*@ngInject*/
export function treeInfoService($http) {
  // AngularJS will instantiate a singleton by calling "new" on this function

  var getNodeById = function(nodeId) {
    return $http({
      method: 'GET',
      url: `/api/nodes/${nodeId}`
    });
  };

  var getNodes = function() {
    return $http({
      method: 'GET',
      url: '/api/nodes/'
    });
  };

  var addNode = function(nodeInfo) {
    return $http({
      method: 'POST',
      url: '/api/nodes',
      data: nodeInfo
    });
  };

  var updateNodeChildren = function(nodeId, children) {
    return $http({
      method: 'PATCH',
      url: `/api/nodes/${nodeId}`,
      data: [{
        op: 'replace',
        path: '/children',
        value: children
      }]
    });
  };

  return {
    getNodeById,
    getNodes,
    addNode,
    updateNodeChildren
  };
}

export default angular.module('honorsConciergeApp.treeInfo', [])
  .service('treeInfo', treeInfoService)
  .name;
