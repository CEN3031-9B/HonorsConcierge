'use strict';

describe('Component: DegreePlanningComponent', function() {
  // load the controller's module
  beforeEach(module('honorsConciergeApp.degreePlanning'));

  var DegreePlanningComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    DegreePlanningComponent = $componentController('degreePlanning', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
