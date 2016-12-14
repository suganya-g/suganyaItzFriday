const should = require('should');

describe('Testing Mocha Integration', function() {
  it('Passing Test Case', function() {
    (3).should.be.exactly(2+1);
  });
});
