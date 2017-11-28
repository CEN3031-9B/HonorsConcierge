'use strict';

describe('Component: TreeComponent', function() {
  // load the controller's module
  beforeEach(module('honorsConciergeApp.tree'));

  var TreeComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TreeComponent = $componentController('tree', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
