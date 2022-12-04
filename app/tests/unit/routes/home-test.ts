import { module, test } from 'qunit';
import { setupTest } from 'minbin/tests/helpers';
import HomeRoute from 'minbin/routes/home';

module('Unit | Route | home', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('route:home', HomeRoute);
  });

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:home');
    assert.ok(route);
  });
});
