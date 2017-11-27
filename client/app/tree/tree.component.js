'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './tree.routes';
// import treeInfo from '../treeInfo/treeInfo.service';

export class TreeComponent {

  /*@ngInject*/
  constructor($http, $scope, treeInfo) {
    this.$http = $http;
    this.$scope = $scope;
    this.treeInfo = treeInfo;
    treeInfo.getTreeInfo()
      .then((res) => {
        console.log(res);
        this.$scope.currTitle = res.data.title;
        this.$scope.currDesc = res.data.description;
        this.$scope.currContent = res.data.content;
        this.$scope.currChildren = res.data.children;
        this.$scope.currAncestors = res.data.ancestors;
      }, (res) => {
        console.log(res);
      });
  }

  nodeAdd() {
    this.$http({
      method: 'POST',
      url: '/api/nodes',
      data: {
        title: this.$scope.nodeTitle,
        description: this.$scope.nodeDesc,
        content: this.$scope.nodeContent,
        children: this.$scope.nodeChildren,
        ancestors: this.$scope.nodeAncestor
      }
    }).then((res) => {
      this.$scope.message = res;
    }, (res) => {
      this.$scope.message = res;
    });
  }

}

export default angular.module('honorsConciergeApp.tree', [uiRouter])
  .config(routes)
  .component('tree', {
    template: require('./tree.html'),
    controller: ['$http', '$scope', 'treeInfo', TreeComponent],
    controllerAs: 'treeCtrl'
  })
  .name;
