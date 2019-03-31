import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import page from '../pages/binary-clock';
import settings from '../pages/settings';
import {
  DARK_MODE,
  SHOW_MATH,
  SHOW_BINARY,
  HUMAN_TIME
} from '../../src/services/settings';

let settingsService;

module('Acceptance | binary clock', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    settingsService = this.owner.lookup('service:settings');
    settingsService.remove(DARK_MODE);
    settingsService.remove(SHOW_MATH);
    settingsService.remove(SHOW_BINARY);
    settingsService.remove(HUMAN_TIME);
  });

  hooks.afterEach(function() {
    settingsService.remove(DARK_MODE);
    settingsService.remove(SHOW_MATH);
    settingsService.remove(SHOW_BINARY);
    settingsService.remove(HUMAN_TIME);
  });

  test('user can view clock and change settings', async function(assert) {
    await page.visit();
    assert.equal(currentURL(), page.url, 'on the right page');

    assert.ok(page.clock.isVisible, 'see binary clock');
    assert.ok(page.settings.isVisible, 'see settings icon');
    assert.notOk(page.clock.binary.h1, 'no h1 binary');
    assert.notOk(page.clock.binary.h0, 'no h0 binary');
    assert.notOk(page.clock.binary.m1, 'no m1 binary');
    assert.notOk(page.clock.binary.m0, 'no m0 binary');
    assert.notOk(page.clock.binary.s1, 'no s1 binary');
    assert.notOk(page.clock.binary.s0, 'no s0 binary');
    assert.notOk(page.clock.math.h1, 'no h1 math');
    assert.notOk(page.clock.math.h0, 'no h0 math');
    assert.notOk(page.clock.math.m1, 'no m1 math');
    assert.notOk(page.clock.math.m0, 'no m0 math');
    assert.notOk(page.clock.math.s1, 'no s1 math');
    assert.notOk(page.clock.math.s0, 'no s0 math');
    assert.notOk(page.clock.humanTime, 'no human readable time');
    // assert.equal(page.clock.theme.value, '', 'is light mode by default');

    await page.settings.click();
    assert.equal(currentURL(), settings.url, 'on the settings page');
    assert.notOk(settings.darkMode.isChecked, 'dark mode not toggled');
    assert.notOk(settings.showBinary.isChecked, 'show binary not toggled');
    assert.notOk(settings.showMath.isChecked, 'show math not toggled');
    assert.notOk(settings.humanTime.isChecked, 'human time not toggled');

    await settings.darkMode.enable();
    assert.ok(settings.darkMode.isChecked, 'dark mode is toggled');

    await settings.showBinary.enable();
    assert.ok(settings.showBinary.isChecked, 'show binary is toggled');

    await settings.showMath.enable();
    assert.ok(settings.showMath.isChecked, 'show math is toggled');

    await settings.humanTime.enable();
    assert.ok(settings.humanTime.isChecked, 'human time is toggled');

    await settings.back.click();
    assert.equal(currentURL(), page.url, 'back at the clock');
    assert.ok(page.clock.isVisible, 'see binary clock');
    assert.ok(page.settings.isVisible, 'see settings icon');
    assert.ok(page.clock.binary.h1, 'h1 binary');
    assert.ok(page.clock.binary.h0, 'h0 binary');
    assert.ok(page.clock.binary.m1, 'm1 binary');
    assert.ok(page.clock.binary.m0, 'm0 binary');
    assert.ok(page.clock.binary.s1, 's1 binary');
    assert.ok(page.clock.binary.s0, 's0 binary');
    assert.ok(page.clock.math.h1, 'h1 math');
    assert.ok(page.clock.math.h0, 'h0 math');
    assert.ok(page.clock.math.m1, 'm1 math');
    assert.ok(page.clock.math.m0, 'm0 math');
    assert.ok(page.clock.math.s1, 's1 math');
    assert.ok(page.clock.math.s0, 's0 math');
    assert.ok(page.clock.humanTime, 'see human readable time');
    // assert.equal(page.clock.theme.value, 'dark', 'is now dark mode');
  });
});
