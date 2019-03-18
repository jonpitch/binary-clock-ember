import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const testKey = 'settings-service-test';

module('Unit | Service | settings', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    localStorage.removeItem(testKey);
  });

  hooks.afterEach(function() {
    localStorage.removeItem(testKey);
  });

  test('get / set', function(assert) {
    let service = this.owner.lookup('service:settings');
    assert.equal(service.get(testKey), null, 'no key found');

    service.set(testKey, 'jawns');
    assert.equal(service.get(testKey), 'jawns', 'got the right value');
  });

  test('remove', function(assert) {
    let service = this.owner.lookup('service:settings');
    service.set(testKey, 'jawns');
    assert.equal(service.get(testKey), 'jawns', 'value set');

    service.remove(testKey);
    assert.equal(service.get(testKey), null, 'value cleared');
  });
});
