'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

const async = require('async');
const _ = require('lodash');

const UNKNOWN_ERR = 0;
const NO_CURR_NODE = 1;
const NO_NODE = 2;
const HAS_CHILDREN = 3;
const DELETION_ERR = 4;
const FAILED_PATCH = 5;

import routes from './tree.routes';

export class TreeComponent {

  leafClicked = false;

  /*@ngInject*/
  constructor($http, $scope, $window, $state, $stateParams, Auth, treeService) {
    this.$http = $http;
    this.$scope = $scope;
    this.$window = $window;
    this.$stateParams = $stateParams;
    this.treeService = treeService;
    this.isAdmin = Auth.isAdminSync; // eslint-disable-line no-sync
  }

  $onInit() {
    this.treeService.getNodeById(this.$stateParams.treeId)
      .then(res => {
        this.$scope.currId = res.data._id;
        this.$scope.currTitle = res.data.title;
        this.$scope.currDesc = res.data.description;
        this.$scope.currContent = res.data.content;
        this.$scope.currChildrenIds = res.data.children;
        this.$scope.currAncestors = res.data.ancestors;
        this.$scope.currChildren = [];
        async.each(this.$scope.currChildrenIds, (childId, cb) => {
          this.treeService.getNodeById(childId)
            .then(innerRes => {
              this.$scope.currChildren.push(innerRes.data);
              cb();
            }, () => {
              // TODO: Handle scenario when a child isn't found
              cb();
            });
        });
      }, () => {
        this.$window.location.href = '/';
      });
    this.$scope.isEditingNode = false;
    this.$scope.isEditingLeaf = false;
  }

  editNode() {
    if(!this.isAdmin()) {
      this.$state.go('login');
      return;
    }
    const newNode = {
      title: this.$scope.currTitle,
      description: this.$scope.currDesc,
      content: this.$scope.currContent,
      children: this.$scope.currChildrenIds,
      ancestors: this.$scope.currAncestors,
      isLeaf: false,
      isRoot: false
    };
    this.treeService.verifyNode(this.$scope.currId).then(valid => {
      if(!valid) {
        this.$scope.message = 'The current node is missing. Please refresh and try again.';
        return;
      }
      this.treeService.updateNode(newNode, this.$scope.currId)
        .then(() => {
          this.$scope.message = 'Node edited successfully';
        }, () => {
          this.$scope.message = 'An error occurred';
        });
    });
    this.$scope.isEditingNode = false;
  }

  viewEdit() {
    this.$scope.isEditingNode = true;
  }

  editLeaf() {
    if(!this.isAdmin()) {
      this.$state.go('login');
      return;
    }
    const newLeaf = {
      title: this.$scope.leafTitle,
      description: this.$scope.leafDesc,
      content: this.$scope.leafContent,
      children: [],
      ancestors: this.$scope.leafAncestors,
      isLeaf: true,
      isRoot: false
    };
    this.treeService.verifyNode(this.$scope.leafId).then(valid => {
      if(!valid) {
        this.$scope.message = 'The leaf is missing. Please refresh and try again.';
        return;
      }
      this.treeService.updateNode(newLeaf, this.$scope.leafId)
        .then(() => {
          this.$scope.message = 'Leaf edited successfully';
        }, () => {
          this.$scope.message = 'An error occurred';
        });
    });
    this.$scope.isEditingLeaf = false;
  }

  addNode() {
    if(!this.isAdmin()) {
      return;
    }
    const newAncestors = angular.copy(this.$scope.currAncestors);
    newAncestors.push({
      title: this.$scope.nodeAncestorTitle,
      id: this.$scope.currId
    });
    const newNode = {
      title: this.$scope.nodeTitle,
      description: this.$scope.nodeDesc,
      content: this.$scope.nodeContent,
      children: [],
      ancestors: newAncestors,
      isLeaf: this.$scope.nodeLeaf,
      isRoot: false
    };
    async.series([
      cb => {
        this.treeService.verifyNode(this.$scope.currId).then(valid => {
          if(valid) {
            return cb(null);
          }
          return cb(NO_CURR_NODE);
        });
      },
      cb => {
        this.treeService.addNode(newNode).then(res => {
          this.$scope.currChildrenIds.push(res.data._id);
          newNode._id = res.data._id;
          this.$scope.currChildren.push(newNode);
          this.treeService.updateNodeChildren(this.$stateParams.treeId, this.$scope.currChildrenIds)
            .then(() => {
              this.$scope.message = 'Node added successfully';
              cb();
            }, () => {
              this.$scope.message = 'An error occurred';
              cb(UNKNOWN_ERR);
            });
        }, () => {
          this.$scope.message = 'An error occurred';
          cb(UNKNOWN_ERR);
        });
      }
    ], err => {
      if(err) {
        switch (err) {
        case NO_CURR_NODE:
          this.$scope.message = 'The current node is missing. Please refresh and try again.';
          break;
        default:
          this.$scope.message = 'An unexpected error occured. Please refresh and try again';
          break;
        }
      }
    });
  }

  deleteNode(nodeId) {
    if(!this.isAdmin()) {
      return;
    }
    async.series([
      cb => {
        this.treeService.verifyNode(this.$scope.currId).then(valid => {
          if(valid) {
            return cb(null);
          }
          return cb(NO_CURR_NODE);
        });
      },

      cb => {
        this.treeService.verifyNode(nodeId).then(valid => {
          if(valid) {
            return cb(null);
          }
          return cb(NO_NODE);
        });
      },

      cb => {
        this.treeService.getNodeById(nodeId).then(res => {
          if(res.data.children.length) {
            return cb(HAS_CHILDREN);
          }
          return cb(null);
        }, () => {
          return cb(UNKNOWN_ERR);
        });
      },

      cb => {
        this.treeService.deleteNode(nodeId).then(() => {
          _.pull(this.$scope.currChildrenIds, nodeId);
          let indexOfGoneChild = -1;
          async.eachOf(this.$scope.currChildren, (child, index, innerCb) => {
            if(child._id === nodeId) {
              indexOfGoneChild = index;
            }
            innerCb(null);
          }, err => {
            if(err || indexOfGoneChild === -1) {
              return cb(UNKNOWN_ERR);
            }
            this.$scope.currChildren.splice(indexOfGoneChild, 1);
            return cb(null);
          });
        }, () => {
          cb(DELETION_ERR);
        });
      },

      cb => {
        this.treeService.updateNodeChildren(this.$stateParams.treeId, this.$scope.currChildrenIds)
          .then(() => {
            this.$scope.message = 'Node deleted successfully';
            cb(null);
          }, () => {
            cb(FAILED_PATCH);
          });
      }
    ], err => {
      if(err) {
        switch (err) {
        case UNKNOWN_ERR:
          this.$scope.message = 'An unexpected error occured. Please refresh and try again';
          break;
        case NO_CURR_NODE:
          this.$scope.message = 'The current node is missing. Please refresh and try again.';
          break;
        case NO_NODE:
          this.$scope.message = 'That node is missing. Please refresh and try again.';
          break;
        case HAS_CHILDREN:
          this.$scope.message = 'That node has children. Please delete its children before removing it.';
          break;
        case DELETION_ERR:
          this.$scope.message = 'An error occured while deleting the node. Please refresh and try again.';
          break;
        case FAILED_PATCH:
          this.$scope.message = 'The node was deleted. However, the server was unable to update the list of children for this node. You may experience some problems.';
          break;
        }
      }
    });
  }

  showLeaf(leafIndex) {
    this.leafClicked = true;
    const currLeaf = this.$scope.currChildren[leafIndex];
    this.$scope.leafId = currLeaf._id;
    this.$scope.leafTitle = currLeaf.title;
    this.$scope.leafDesc = currLeaf.description;
    this.$scope.leafCont = currLeaf.content;
    this.$scope.leafAncestors = currLeaf.ancestors;
  }
}


export default angular.module('honorsConciergeApp.tree', [uiRouter])
  .config(routes)
  .component('tree', {
    template: require('./tree.html'),
    controller: ['$http', '$scope', '$window', '$state', '$stateParams', 'Auth', 'treeService', TreeComponent],
    controllerAs: 'treeCtrl'
  })
  .name;
