const async = require('async');

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  rootNode = {};

  /*@ngInject*/
  constructor($http, $scope, treeService) {
    this.$http = $http;
    this.$scope = $scope;
    this.treeService = treeService;
  }

  $onInit() {
    this.treeService.getNodes()
      .then(res => {
        var rootNode = res.data.filter(findRoot)[0];
        this.rootNode = rootNode;
        this.$scope.rootNode = rootNode;
        this.renderChildren(this.rootNode.children);
      });
  }

  renderChildren(children) {
    async.each(children, (childId, cb) => {
      this.treeService.getNodeById(childId)
        .then(innerRes => {
          console.log(innerRes);
          switch (innerRes.data.title) {
          case 'Honors Program':
            this.$scope.honorsProgramId = childId;
            break;
          case 'Registration':
            this.$scope.registrationId = childId;
            break;
          case 'Degree Planning':
            this.$scope.degreePlanningId = childId;
            break;
          }
          return cb();
        });
    });
  }

}

function findRoot(node) {
  return node.isRoot;
}

export default angular.module('honorsConciergeApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: ['$http', '$scope', 'treeInfo', MainController]
  })
  .name;
