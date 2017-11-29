'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

const async = require('async');

import routes from './tree.routes';

export class TreeComponent {

  /*@ngInject*/
  constructor($http, $scope, $window, $stateParams, Auth, treeService) {
    this.$http = $http;
    this.$scope = $scope;
    this.$window = $window;
    this.$stateParams = $stateParams;
    this.treeService = treeService;
    this.isLoggedIn = Auth.isLoggedInAsync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
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
            });
        });
      }, () => {
        this.$window.location.href = '/';
      });
  }

  addNode() {
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
      ancestors: newAncestors
    };
    this.treeService.addNode(newNode).then(res => {
      this.$scope.currChildrenIds.push(res.data._id);
      newNode._id = res.data._id;
      this.$scope.currChildren.push(newNode);
      this.treeService.updateNodeChildren(this.$stateParams.treeId, this.$scope.currChildrenIds)
        .then(() => {
          this.$scope.message = 'Node added successfully';
        }, () => {
          this.$scope.message = 'An error occurred';
        });
    }, () => {
      this.$scope.message = 'An error occurred';
    });
  }

}

export default angular.module('honorsConciergeApp.tree', [uiRouter])
  .config(routes)
  .component('tree', {
    template: require('./tree.html'),
    controller: ['$http', '$scope', '$window', '$stateParams', 'Auth', 'treeInfo', TreeComponent],
    controllerAs: 'treeCtrl'
  })
  .name;
