import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  create,
  is,
  clickable
} from 'ember-cli-page-object';

const component = create({
  scope: 'div.mdc-checkbox',
  checked: is(':checked', 'input'),
  click: clickable('input')
});

module('Integration | Component | mdc-checkbox', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    component.setContext(this);
  });

  hooks.afterEach(function() {
    component.removeContext();
  });

  test('it renders - unchecked', async function(assert) {
    await render(hbs`
      <MdcCheckbox @selected={{false}} />
    `);

    assert.notOk(component.checked, 'not checked');
  });

  test('it renders - checked', async function(assert) {
    await render(hbs`
      <MdcCheckbox @selected={{true}} />
    `);

    assert.ok(component.checked, 'checked');
  });

  test('change', async function(assert) {
    let value = false;
    const onChange = function() {
      value = !value;
    };

    this.set('selected', value);
    this.set('onChange', onChange)
    await render(hbs`
      <MdcCheckbox
        @selected={{selected}}
        onChange={{onChange}} />
    `);

    assert.notOk(component.checked, 'not checked');

    await component.click();
    assert.ok(component.checked, 'now checked');
    assert.ok(value, 'mutated value');
  });
});
