'use strict';

describe('Service: treeInfo', function() {
  // load the service's module
  beforeEach(module('honorsConciergeApp.treeInfo'));

  // instantiate service
  var treeInfo;
  beforeEach(inject(function(_treeInfo_) {
    treeInfo = _treeInfo_;
  }));

  it('should do something', function() {
    expect(!!treeInfo).to.be.true;
  });
});
