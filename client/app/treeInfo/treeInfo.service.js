'use strict';
const angular = require('angular');

/*@ngInject*/
export function treeService($http, $q) {
  // AngularJS will instantiate a singleton by calling "new" on this function

  //TODO: decouple the crap outta these HTML requests
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

  var deleteNode = function(nodeId) {
    return $http({
      method: 'DELETE',
      url: `/api/nodes/${nodeId}`
    });
  };

  var verifyNode = function(nodeId) {
    return $q(function(resolve, reject) {
      $http({
        method: 'GET',
        url: `/api/nodes/${nodeId}`
      }).then(function(res) {
        if(res.status === 200 || res.status === 304) {
          return resolve(true);
        }
        return reject(false);
      }, function() {
        return reject(false);
      });
    });
  };

  return {
    getNodeById,
    getNodes,
    addNode,
    updateNodeChildren,
    deleteNode,
    verifyNode
  };
}

export default angular.module('honorsConciergeApp.treeService', [])
  .service('treeService', treeService)
  .name;
