import { module, test } from 'qunit';
import { setupTest } from 'minbin/tests/helpers';
import ViewRoute from 'minbin/routes/view';
import ViewRawRoute from 'minbin/routes/view/raw';

module('Unit | Route | view', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('route:view.index', ViewRoute);
    this.owner.register('route:view.raw', ViewRawRoute);
  });

  test('index exists', function (assert) {
    const route = this.owner.lookup('route:view.index');
    assert.ok(route);
  });

  test('raw exists', function (assert) {
    const route = this.owner.lookup('route:view.raw');
    assert.ok(route);
  });
});
