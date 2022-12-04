import { module, test } from 'qunit';
import { setupTest } from 'minbin/tests/helpers';
import NewRoute from 'minbin/routes/new';

module('Unit | Route | new', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('route:new', NewRoute);
  });

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:new');
    assert.ok(route);
  });
});
