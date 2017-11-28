'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './tree.routes';

export class TreeComponent {

  /*@ngInject*/
  constructor($http, $scope, $window, $stateParams, treeService) {
    this.$http = $http;
    this.$scope = $scope;
    this.$window = $window;
    this.$stateParams = $stateParams;
    this.treeService = treeService;
  }

  $onInit() {
    this.treeService.getTreeInfo(this.$stateParams.treeId)
      .then(res => {
        this.$scope.currTitle = res.data.title;
        this.$scope.currDesc = res.data.description;
        this.$scope.currContent = res.data.content;
        this.$scope.currChildren = res.data.children;
        this.$scope.currAncestors = res.data.ancestors;
      }, () => {
        this.$window.location.href = '/';
      });
  }

  addNode() {
    this.treeService.addNode({
      title: this.$scope.nodeTitle,
      description: this.$scope.nodeDesc,
      content: this.$scope.nodeContent,
      children: [],
      ancestors: this.$scope.nodeAncestor
    }).then(res => {
      this.$scope.currChildren.push(res.data._id);
      this.treeService.updateNodeChildren(this.$stateParams.treeId, this.$scope.currChildren)
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
    controller: ['$http', '$scope', '$window', '$stateParams', 'treeInfo', TreeComponent],
    controllerAs: 'treeCtrl'
  })
  .name;
