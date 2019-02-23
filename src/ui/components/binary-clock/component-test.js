import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  create,
  hasClass
} from 'ember-cli-page-object';

const component = create({
  h: {
    one: {
      scope: '[data-test="h1"]',
      two: hasClass('active', '[data-test="h12"]'),
      one: hasClass('active', '[data-test="h11"]')
    },
    zero: {
      scope: '[data-test="h0"]',
      eight: hasClass('active', '[data-test="h08"]'),
      four: hasClass('active', '[data-test="h04"]'),
      two: hasClass('active', '[data-test="h02"]'),
      one: hasClass('active', '[data-test="h01"]')
    }
  },
  m: {
    one: {
      scope: '[data-test="m1"]',
      four: hasClass('active', '[data-test="m14"]'),
      two: hasClass('active', '[data-test="m12"]'),
      one: hasClass('active', '[data-test="m11"]')
    },
    zero: {
      scope: '[data-test="m0"]',
      eight: hasClass('active', '[data-test="m08"]'),
      four: hasClass('active', '[data-test="m04"]'),
      two: hasClass('active', '[data-test="m02"]'),
      one: hasClass('active', '[data-test="m01"]')
    }
  },
  s: {
    one: {
      scope: '[data-test="s1"]',
      four: hasClass('active', '[data-test="s14"]'),
      two: hasClass('active', '[data-test="s12"]'),
      one: hasClass('active', '[data-test="s11"]')
    },
    zero: {
      scope: '[data-test="s0"]',
      eight: hasClass('active', '[data-test="s08"]'),
      four: hasClass('active', '[data-test="s04"]'),
      two: hasClass('active', '[data-test="s02"]'),
      one: hasClass('active', '[data-test="s01"]')
    }
  }
});

module('Integration | Component | binary-clock', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    component.setContext(this);
  });

  hooks.afterEach(function() {
    component.removeContext();
  });

  test('hours', async function(assert) {
    const examples = [
      { h: 1, h01: true, h02: false, h04: false, h08: false, h11: false, h12: false },
      { h: 2, h01: false, h02: true, h04: false, h08: false, h11: false, h12: false },
      { h: 3, h01: true, h02: true, h04: false, h08: false, h11: false, h12: false },
      { h: 4, h01: false, h02: false, h04: true, h08: false, h11: false, h12: false },
      { h: 5, h01: true, h02: false, h04: true, h08: false, h11: false, h12: false },
      { h: 6, h01: false, h02: true, h04: true, h08: false, h11: false, h12: false },
      { h: 7, h01: true, h02: true, h04: true, h08: false, h11: false, h12: false },
      { h: 8, h01: false, h02: false, h04: false, h08: true, h11: false, h12: false },
      { h: 9, h01: true, h02: false, h04: false, h08: true, h11: false, h12: false },
      { h: 10, h01: false, h02: false, h04: false, h08: false, h11: true, h12: false },
      { h: 11, h01: true, h02: false, h04: false, h08: false, h11: true, h12: false },
      { h: 12, h01: false, h02: true, h04: false, h08: false, h11: true, h12: false },
      { h: 13, h01: true, h02: true, h04: false, h08: false, h11: true, h12: false },
      { h: 14, h01: false, h02: false, h04: true, h08: false, h11: true, h12: false },
      { h: 15, h01: true, h02: false, h04: true, h08: false, h11: true, h12: false },
      { h: 16, h01: false, h02: true, h04: true, h08: false, h11: true, h12: false },
      { h: 17, h01: true, h02: true, h04: true, h08: false, h11: true, h12: false },
      { h: 18, h01: false, h02: false, h04: false, h08: true, h11: true, h12: false },
      { h: 19, h01: true, h02: false, h04: false, h08: true, h11: true, h12: false },
      { h: 20, h01: false, h02: false, h04: false, h08: false, h11: false, h12: true },
      { h: 21, h01: true, h02: false, h04: false, h08: false, h11: false, h12: true },
      { h: 22, h01: false, h02: true, h04: false, h08: false, h11: false, h12: true },
      { h: 23, h01: true, h02: true, h04: false, h08: false, h11: false, h12: true },
    ];

    this.set('_time', new Date(1984, 6, 8, 0, 0, 0));
    await render(hbs`
      <BinaryClock @_time={{this._time}} />
    `);

    assert.notOk(component.h.one.one, '0 - h11 correct');
    assert.notOk(component.h.one.two, '0 - h12 correct');
    assert.notOk(component.h.zero.eight, '0 - h08 correct');
    assert.notOk(component.h.zero.four, '0 - h04 correct');
    assert.notOk(component.h.zero.two, '0 - h02 correct');
    assert.notOk(component.h.zero.one, '0 - h01 correct');

    examples.forEach(async (e) => {
      this.set('_time', new Date(1984, 6, 8, e.h, 0, 0));

      if (e.h11) {
        assert.ok(component.h.one.one, `${e.h} - h11 correct`);
      } else {
        assert.notOk(component.h.one.one, `${e.h} - h11 correct`);
      }

      if (e.h12) {
        assert.ok(component.h.one.two, `${e.h} - h12 correct`);
      } else {
        assert.notOk(component.h.one.two, `${e.h} - h12 correct`);
      }

      if (e.h08) {
        assert.ok(component.h.zero.eight, `${e.h} - h08 correct`);
      } else {
        assert.notOk(component.h.zero.eight, `${e.h} - h08 correct`);
      }

      if (e.h04) {
        assert.ok(component.h.zero.four, `${e.h} - h04 correct`);
      } else {
        assert.notOk(component.h.zero.four, `${e.h} - h04 correct`);
      }

      if (e.h02) {
        assert.ok(component.h.zero.two, `${e.h} - h02 correct`);
      } else {
        assert.notOk(component.h.zero.two, `${e.h} - h02 correct`);
      }

      if (e.h01) {
        assert.ok(component.h.zero.one, `${e.h} - h01 correct`);
      } else {
        assert.notOk(component.h.zero.one, `${e.h} - h01 correct`);
      }
    });
  });

  test('minutes', async function(assert) {
    const examples = [
      { m: 1, m01: true, m02: false, m04: false, m08: false, m11: false, m12: false, m14: false },
      { m: 2, m01: false, m02: true, m04: false, m08: false, m11: false, m12: false, m14: false },
      { m: 3, m01: true, m02: true, m04: false, m08: false, m11: false, m12: false, m14: false },
      { m: 4, m01: false, m02: false, m04: true, m08: false, m11: false, m12: false, m14: false },
      { m: 5, m01: true, m02: false, m04: true, m08: false, m11: false, m12: false, m14: false },
      { m: 6, m01: false, m02: true, m04: true, m08: false, m11: false, m12: false, m14: false },
      { m: 7, m01: true, m02: true, m04: true, m08: false, m11: false, m12: false, m14: false },
      { m: 8, m01: false, m02: false, m04: false, m08: true, m11: false, m12: false, m14: false },
      { m: 9, m01: true, m02: false, m04: false, m08: true, m11: false, m12: false, m14: false },
      { m: 10, m01: false, m02: false, m04: false, m08: false, m11: true, m12: false, m14: false },
      { m: 11, m01: true, m02: false, m04: false, m08: false, m11: true, m12: false, m14: false },
      { m: 12, m01: false, m02: true, m04: false, m08: false, m11: true, m12: false, m14: false },
      { m: 13, m01: true, m02: true, m04: false, m08: false, m11: true, m12: false, m14: false },
      { m: 14, m01: false, m02: false, m04: true, m08: false, m11: true, m12: false, m14: false },
      { m: 15, m01: true, m02: false, m04: true, m08: false, m11: true, m12: false, m14: false },
      { m: 16, m01: false, m02: true, m04: true, m08: false, m11: true, m12: false, m14: false },
      { m: 17, m01: true, m02: true, m04: true, m08: false, m11: true, m12: false, m14: false },
      { m: 18, m01: false, m02: false, m04: false, m08: true, m11: true, m12: false, m14: false },
      { m: 19, m01: true, m02: false, m04: false, m08: true, m11: true, m12: false, m14: false },
      { m: 20, m01: false, m02: false, m04: false, m08: false, m11: false, m12: true, m14: false },
      { m: 21, m01: true, m02: false, m04: false, m08: false, m11: false, m12: true, m14: false },
      { m: 22, m01: false, m02: true, m04: false, m08: false, m11: false, m12: true, m14: false },
      { m: 23, m01: true, m02: true, m04: false, m08: false, m11: false, m12: true, m14: false },
      { m: 24, m01: false, m02: false, m04: true, m08: false, m11: false, m12: true, m14: false },
      { m: 25, m01: true, m02: false, m04: true, m08: false, m11: false, m12: true, m14: false },
      { m: 26, m01: false, m02: true, m04: true, m08: false, m11: false, m12: true, m14: false },
      { m: 27, m01: true, m02: true, m04: true, m08: false, m11: false, m12: true, m14: false },
      { m: 28, m01: false, m02: false, m04: false, m08: true, m11: false, m12: true, m14: false },
      { m: 29, m01: true, m02: false, m04: false, m08: true, m11: false, m12: true, m14: false },
      { m: 30, m01: false, m02: false, m04: false, m08: false, m11: true, m12: true, m14: false },
      { m: 31, m01: true, m02: false, m04: false, m08: false, m11: true, m12: true, m14: false },
      { m: 32, m01: false, m02: true, m04: false, m08: false, m11: true, m12: true, m14: false },
      { m: 33, m01: true, m02: true, m04: false, m08: false, m11: true, m12: true, m14: false },
      { m: 34, m01: false, m02: false, m04: true, m08: false, m11: true, m12: true, m14: false },
      { m: 35, m01: true, m02: false, m04: true, m08: false, m11: true, m12: true, m14: false },
      { m: 36, m01: false, m02: true, m04: true, m08: false, m11: true, m12: true, m14: false },
      { m: 37, m01: true, m02: true, m04: true, m08: false, m11: true, m12: true, m14: false },
      { m: 38, m01: false, m02: false, m04: false, m08: true, m11: true, m12: true, m14: false },
      { m: 39, m01: true, m02: false, m04: false, m08: true, m11: true, m12: true, m14: false },
      { m: 40, m01: false, m02: false, m04: false, m08: false, m11: false, m12: false, m14: true },
      { m: 41, m01: true, m02: false, m04: false, m08: false, m11: false, m12: false, m14: true },
      { m: 42, m01: false, m02: true, m04: false, m08: false, m11: false, m12: false, m14: true },
      { m: 43, m01: true, m02: true, m04: false, m08: false, m11: false, m12: false, m14: true },
      { m: 44, m01: false, m02: false, m04: true, m08: false, m11: false, m12: false, m14: true },
      { m: 45, m01: true, m02: false, m04: true, m08: false, m11: false, m12: false, m14: true },
      { m: 46, m01: false, m02: true, m04: true, m08: false, m11: false, m12: false, m14: true },
      { m: 47, m01: true, m02: true, m04: true, m08: false, m11: false, m12: false, m14: true },
      { m: 48, m01: false, m02: false, m04: false, m08: true, m11: false, m12: false, m14: true },
      { m: 49, m01: true, m02: false, m04: false, m08: true, m11: false, m12: false, m14: true },
      { m: 50, m01: false, m02: false, m04: false, m08: false, m11: true, m12: false, m14: true },
      { m: 51, m01: true, m02: false, m04: false, m08: false, m11: true, m12: false, m14: true },
      { m: 52, m01: false, m02: true, m04: false, m08: false, m11: true, m12: false, m14: true },
      { m: 53, m01: true, m02: true, m04: false, m08: false, m11: true, m12: false, m14: true },
      { m: 54, m01: false, m02: false, m04: true, m08: false, m11: true, m12: false, m14: true },
      { m: 55, m01: true, m02: false, m04: true, m08: false, m11: true, m12: false, m14: true },
      { m: 56, m01: false, m02: true, m04: true, m08: false, m11: true, m12: false, m14: true },
      { m: 57, m01: true, m02: true, m04: true, m08: false, m11: true, m12: false, m14: true },
      { m: 58, m01: false, m02: false, m04: false, m08: true, m11: true, m12: false, m14: true },
      { m: 59, m01: true, m02: false, m04: false, m08: true, m11: true, m12: false, m14: true },
    ];

    this.set('_time', new Date(1984, 6, 8, 0, 0, 0));
    await render(hbs`
      <BinaryClock @_time={{this._time}} />
    `);

    assert.notOk(component.m.one.one, '0 - m11 correct');
    assert.notOk(component.m.one.two, '0 - m12 correct');
    assert.notOk(component.m.one.four, '0 - m14 correct');
    assert.notOk(component.m.zero.eight, '0 - m08 correct');
    assert.notOk(component.m.zero.four, '0 - m04 correct');
    assert.notOk(component.m.zero.two, '0 - m02 correct');
    assert.notOk(component.m.zero.one, '0 - m01 correct');

    examples.forEach(async (e) => {
      this.set('_time', new Date(1984, 6, 8, 0, e.m, 0));

      if (e.m11) {
        assert.ok(component.m.one.one, `${e.m} - m11 correct`);
      } else {
        assert.notOk(component.m.one.one, `${e.m} - m11 correct`);
      }

      if (e.m12) {
        assert.ok(component.m.one.two, `${e.m} - m12 correct`);
      } else {
        assert.notOk(component.m.one.two, `${e.m} - m12 correct`);
      }

      if (e.m14) {
        assert.ok(component.m.one.four, `${e.m} - m14 correct`);
      } else {
        assert.notOk(component.m.one.four, `${e.m} - m14 correct`);
      }

      if (e.m08) {
        assert.ok(component.m.zero.eight, `${e.m} - m08 correct`);
      } else {
        assert.notOk(component.m.zero.eight, `${e.m} - m08 correct`);
      }

      if (e.m04) {
        assert.ok(component.m.zero.four, `${e.m} - m04 correct`);
      } else {
        assert.notOk(component.m.zero.four, `${e.m} - m04 correct`);
      }

      if (e.m02) {
        assert.ok(component.m.zero.two, `${e.m} - m02 correct`);
      } else {
        assert.notOk(component.m.zero.two, `${e.m} - m02 correct`);
      }

      if (e.m01) {
        assert.ok(component.m.zero.one, `${e.m} - m01 correct`);
      } else {
        assert.notOk(component.m.zero.one, `${e.m} - m01 correct`);
      }
    });
  });

  test('seconds', async function(assert) {
    const examples = [
      { s: 1, s01: true, s02: false, s04: false, s08: false, s11: false, s12: false, s14: false },
      { s: 2, s01: false, s02: true, s04: false, s08: false, s11: false, s12: false, s14: false },
      { s: 3, s01: true, s02: true, s04: false, s08: false, s11: false, s12: false, s14: false },
      { s: 4, s01: false, s02: false, s04: true, s08: false, s11: false, s12: false, s14: false },
      { s: 5, s01: true, s02: false, s04: true, s08: false, s11: false, s12: false, s14: false },
      { s: 6, s01: false, s02: true, s04: true, s08: false, s11: false, s12: false, s14: false },
      { s: 7, s01: true, s02: true, s04: true, s08: false, s11: false, s12: false, s14: false },
      { s: 8, s01: false, s02: false, s04: false, s08: true, s11: false, s12: false, s14: false },
      { s: 9, s01: true, s02: false, s04: false, s08: true, s11: false, s12: false, s14: false },
      { s: 10, s01: false, s02: false, s04: false, s08: false, s11: true, s12: false, s14: false },
      { s: 11, s01: true, s02: false, s04: false, s08: false, s11: true, s12: false, s14: false },
      { s: 12, s01: false, s02: true, s04: false, s08: false, s11: true, s12: false, s14: false },
      { s: 13, s01: true, s02: true, s04: false, s08: false, s11: true, s12: false, s14: false },
      { s: 14, s01: false, s02: false, s04: true, s08: false, s11: true, s12: false, s14: false },
      { s: 15, s01: true, s02: false, s04: true, s08: false, s11: true, s12: false, s14: false },
      { s: 16, s01: false, s02: true, s04: true, s08: false, s11: true, s12: false, s14: false },
      { s: 17, s01: true, s02: true, s04: true, s08: false, s11: true, s12: false, s14: false },
      { s: 18, s01: false, s02: false, s04: false, s08: true, s11: true, s12: false, s14: false },
      { s: 19, s01: true, s02: false, s04: false, s08: true, s11: true, s12: false, s14: false },
      { s: 20, s01: false, s02: false, s04: false, s08: false, s11: false, s12: true, s14: false },
      { s: 21, s01: true, s02: false, s04: false, s08: false, s11: false, s12: true, s14: false },
      { s: 22, s01: false, s02: true, s04: false, s08: false, s11: false, s12: true, s14: false },
      { s: 23, s01: true, s02: true, s04: false, s08: false, s11: false, s12: true, s14: false },
      { s: 24, s01: false, s02: false, s04: true, s08: false, s11: false, s12: true, s14: false },
      { s: 25, s01: true, s02: false, s04: true, s08: false, s11: false, s12: true, s14: false },
      { s: 26, s01: false, s02: true, s04: true, s08: false, s11: false, s12: true, s14: false },
      { s: 27, s01: true, s02: true, s04: true, s08: false, s11: false, s12: true, s14: false },
      { s: 28, s01: false, s02: false, s04: false, s08: true, s11: false, s12: true, s14: false },
      { s: 29, s01: true, s02: false, s04: false, s08: true, s11: false, s12: true, s14: false },
      { s: 30, s01: false, s02: false, s04: false, s08: false, s11: true, s12: true, s14: false },
      { s: 31, s01: true, s02: false, s04: false, s08: false, s11: true, s12: true, s14: false },
      { s: 32, s01: false, s02: true, s04: false, s08: false, s11: true, s12: true, s14: false },
      { s: 33, s01: true, s02: true, s04: false, s08: false, s11: true, s12: true, s14: false },
      { s: 34, s01: false, s02: false, s04: true, s08: false, s11: true, s12: true, s14: false },
      { s: 35, s01: true, s02: false, s04: true, s08: false, s11: true, s12: true, s14: false },
      { s: 36, s01: false, s02: true, s04: true, s08: false, s11: true, s12: true, s14: false },
      { s: 37, s01: true, s02: true, s04: true, s08: false, s11: true, s12: true, s14: false },
      { s: 38, s01: false, s02: false, s04: false, s08: true, s11: true, s12: true, s14: false },
      { s: 39, s01: true, s02: false, s04: false, s08: true, s11: true, s12: true, s14: false },
      { s: 40, s01: false, s02: false, s04: false, s08: false, s11: false, s12: false, s14: true },
      { s: 41, s01: true, s02: false, s04: false, s08: false, s11: false, s12: false, s14: true },
      { s: 42, s01: false, s02: true, s04: false, s08: false, s11: false, s12: false, s14: true },
      { s: 43, s01: true, s02: true, s04: false, s08: false, s11: false, s12: false, s14: true },
      { s: 44, s01: false, s02: false, s04: true, s08: false, s11: false, s12: false, s14: true },
      { s: 45, s01: true, s02: false, s04: true, s08: false, s11: false, s12: false, s14: true },
      { s: 46, s01: false, s02: true, s04: true, s08: false, s11: false, s12: false, s14: true },
      { s: 47, s01: true, s02: true, s04: true, s08: false, s11: false, s12: false, s14: true },
      { s: 48, s01: false, s02: false, s04: false, s08: true, s11: false, s12: false, s14: true },
      { s: 49, s01: true, s02: false, s04: false, s08: true, s11: false, s12: false, s14: true },
      { s: 50, s01: false, s02: false, s04: false, s08: false, s11: true, s12: false, s14: true },
      { s: 51, s01: true, s02: false, s04: false, s08: false, s11: true, s12: false, s14: true },
      { s: 52, s01: false, s02: true, s04: false, s08: false, s11: true, s12: false, s14: true },
      { s: 53, s01: true, s02: true, s04: false, s08: false, s11: true, s12: false, s14: true },
      { s: 54, s01: false, s02: false, s04: true, s08: false, s11: true, s12: false, s14: true },
      { s: 55, s01: true, s02: false, s04: true, s08: false, s11: true, s12: false, s14: true },
      { s: 56, s01: false, s02: true, s04: true, s08: false, s11: true, s12: false, s14: true },
      { s: 57, s01: true, s02: true, s04: true, s08: false, s11: true, s12: false, s14: true },
      { s: 58, s01: false, s02: false, s04: false, s08: true, s11: true, s12: false, s14: true },
      { s: 59, s01: true, s02: false, s04: false, s08: true, s11: true, s12: false, s14: true },
    ];

    this.set('_time', new Date(1984, 6, 8, 0, 0, 0));
    await render(hbs`
      <BinaryClock @_time={{this._time}} />
    `);

    assert.notOk(component.s.one.one, '0 - s11 correct');
    assert.notOk(component.s.one.two, '0 - s12 correct');
    assert.notOk(component.s.one.four, '0 - s14 correct');
    assert.notOk(component.s.zero.eight, '0 - s08 correct');
    assert.notOk(component.s.zero.four, '0 - s04 correct');
    assert.notOk(component.s.zero.two, '0 - s02 correct');
    assert.notOk(component.s.zero.one, '0 - s01 correct');

    examples.forEach(async (e) => {
      this.set('_time', new Date(1984, 6, 8, 0, 0, e.s));

      if (e.s11) {
        assert.ok(component.s.one.one, `${e.s} - s11 correct`);
      } else {
        assert.notOk(component.s.one.one, `${e.s} - s11 correct`);
      }

      if (e.s12) {
        assert.ok(component.s.one.two, `${e.s} - s12 correct`);
      } else {
        assert.notOk(component.s.one.two, `${e.s} - s12 correct`);
      }

      if (e.s14) {
        assert.ok(component.s.one.four, `${e.s} - s14 correct`);
      } else {
        assert.notOk(component.s.one.four, `${e.s} - s14 correct`);
      }

      if (e.s08) {
        assert.ok(component.s.zero.eight, `${e.s} - s08 correct`);
      } else {
        assert.notOk(component.s.zero.eight, `${e.s} - s08 correct`);
      }

      if (e.s04) {
        assert.ok(component.s.zero.four, `${e.s} - s04 correct`);
      } else {
        assert.notOk(component.s.zero.four, `${e.s} - s04 correct`);
      }

      if (e.s02) {
        assert.ok(component.s.zero.two, `${e.s} - s02 correct`);
      } else {
        assert.notOk(component.s.zero.two, `${e.s} - s02 correct`);
      }

      if (e.s01) {
        assert.ok(component.s.zero.one, `${e.s} - s01 correct`);
      } else {
        assert.notOk(component.s.zero.one, `${e.s} - s01 correct`);
      }
    });
  });
});
