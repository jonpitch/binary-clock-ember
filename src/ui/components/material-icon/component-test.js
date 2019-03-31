import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  create,
  text
} from 'ember-cli-page-object';

const component = create({
  scope: 'i.material-icons',
  icon: text()
})

module('Integration | Component | material-icon', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    component.setContext(this);
  });

  hooks.afterEach(function() {
    component.removeContext();
  });

  test('it renders', async function(assert) {
    await render(hbs`
      {{#material-icon}}
        settings
      {{/material-icon}}
    `);

    assert.equal(component.icon, 'settings', 'icon name yields');
  });
});
