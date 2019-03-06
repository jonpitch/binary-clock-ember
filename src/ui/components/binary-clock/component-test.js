import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  create,
  hasClass,
  text,
  isVisible
} from 'ember-cli-page-object';

const component = create({
  h: {
    one: {
      scope: '[data-test="h1"]',
      two: hasClass('active', '[data-test="h12"]'),
      one: hasClass('active', '[data-test="h11"]'),
      binary: {
        scope: '[data-test="h1-binary"]',
        isVisible: isVisible(),
        text: text()
      },
      math: {
        scope: '[data-test="h1-math"]',
        isVisible: isVisible(),
        text: text()
      }
    },
    zero: {
      scope: '[data-test="h0"]',
      eight: hasClass('active', '[data-test="h08"]'),
      four: hasClass('active', '[data-test="h04"]'),
      two: hasClass('active', '[data-test="h02"]'),
      one: hasClass('active', '[data-test="h01"]'),
      binary: {
        scope: '[data-test="h0-binary"]',
        isVisible: isVisible(),
        text: text()
      },
      math: {
        scope: '[data-test="h0-math"]',
        isVisible: isVisible(),
        text: text()
      }
    }
  },
  m: {
    one: {
      scope: '[data-test="m1"]',
      four: hasClass('active', '[data-test="m14"]'),
      two: hasClass('active', '[data-test="m12"]'),
      one: hasClass('active', '[data-test="m11"]'),
      binary: {
        scope: '[data-test="m1-binary"]',
        isVisible: isVisible(),
        text: text()
      },
      math: {
        scope: '[data-test="m1-math"]',
        isVisible: isVisible(),
        text: text()
      }
    },
    zero: {
      scope: '[data-test="m0"]',
      eight: hasClass('active', '[data-test="m08"]'),
      four: hasClass('active', '[data-test="m04"]'),
      two: hasClass('active', '[data-test="m02"]'),
      one: hasClass('active', '[data-test="m01"]'),
      binary: {
        scope: '[data-test="m0-binary"]',
        isVisible: isVisible(),
        text: text()
      },
      math: {
        scope: '[data-test="m0-math"]',
        isVisible: isVisible(),
        text: text()
      }
    }
  },
  s: {
    one: {
      scope: '[data-test="s1"]',
      four: hasClass('active', '[data-test="s14"]'),
      two: hasClass('active', '[data-test="s12"]'),
      one: hasClass('active', '[data-test="s11"]'),
      binary: {
        scope: '[data-test="s1-binary"]',
        isVisible: isVisible(),
        text: text()
      },
      math: {
        scope: '[data-test="s1-math"]',
        isVisible: isVisible(),
        text: text()
      }
    },
    zero: {
      scope: '[data-test="s0"]',
      eight: hasClass('active', '[data-test="s08"]'),
      four: hasClass('active', '[data-test="s04"]'),
      two: hasClass('active', '[data-test="s02"]'),
      one: hasClass('active', '[data-test="s01"]'),
      binary: {
        scope: '[data-test="s0-binary"]',
        isVisible: isVisible(),
        text: text()
      },
      math: {
        scope: '[data-test="s0-math"]',
        isVisible: isVisible(),
        text: text()
      }
    }
  },
  human: {
    scope: '[data-test="human-time"]',
    time: text(),
    isVisible: isVisible()
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
      { h: 1, h01: true, h02: false, h04: false, h08: false, h11: false, h12: false, bin0: '0001', math0: '0+0+0+1', bin1: '00000', math1: '0+0' },
      { h: 2, h01: false, h02: true, h04: false, h08: false, h11: false, h12: false, bin0: '0010', math0: '0+0+2+0', bin1: '00000', math1: '0+0' },
      { h: 3, h01: true, h02: true, h04: false, h08: false, h11: false, h12: false, bin0: '0011', math0: '0+0+2+1', bin1: '00000', math1: '0+0' },
      { h: 4, h01: false, h02: false, h04: true, h08: false, h11: false, h12: false, bin0: '0100', math0: '0+4+0+0', bin1: '00000', math1: '0+0' },
      { h: 5, h01: true, h02: false, h04: true, h08: false, h11: false, h12: false, bin0: '0101', math0: '0+4+0+1', bin1: '00000', math1: '0+0' },
      { h: 6, h01: false, h02: true, h04: true, h08: false, h11: false, h12: false, bin0: '0110', math0: '0+4+2+0', bin1: '00000', math1: '0+0' },
      { h: 7, h01: true, h02: true, h04: true, h08: false, h11: false, h12: false, bin0: '0111', math0: '0+4+2+1', bin1: '00000', math1: '0+0' },
      { h: 8, h01: false, h02: false, h04: false, h08: true, h11: false, h12: false, bin0: '1000', math0: '8+0+0+0', bin1: '00000', math1: '0+0' },
      { h: 9, h01: true, h02: false, h04: false, h08: true, h11: false, h12: false, bin0: '1001', math0: '8+0+0+1', bin1: '00000', math1: '0+0' },
      { h: 10, h01: false, h02: false, h04: false, h08: false, h11: true, h12: false, bin0: '0000', math0: '0+0+0+0', bin1: '01010', math1: '0+1' },
      { h: 11, h01: true, h02: false, h04: false, h08: false, h11: true, h12: false, bin0: '0001', math0: '0+0+0+1', bin1: '01010', math1: '0+1' },
      { h: 12, h01: false, h02: true, h04: false, h08: false, h11: true, h12: false, bin0: '0010', math0: '0+0+2+0', bin1: '01010', math1: '0+1' },
      { h: 13, h01: true, h02: true, h04: false, h08: false, h11: true, h12: false, bin0: '0011', math0: '0+0+2+1', bin1: '01010', math1: '0+1' },
      { h: 14, h01: false, h02: false, h04: true, h08: false, h11: true, h12: false, bin0: '0100', math0: '0+4+0+0', bin1: '01010', math1: '0+1' },
      { h: 15, h01: true, h02: false, h04: true, h08: false, h11: true, h12: false, bin0: '0101', math0: '0+4+0+1', bin1: '01010', math1: '0+1' },
      { h: 16, h01: false, h02: true, h04: true, h08: false, h11: true, h12: false, bin0: '0110', math0: '0+4+2+0', bin1: '01010', math1: '0+1' },
      { h: 17, h01: true, h02: true, h04: true, h08: false, h11: true, h12: false, bin0: '0111', math0: '0+4+2+1', bin1: '01010', math1: '0+1' },
      { h: 18, h01: false, h02: false, h04: false, h08: true, h11: true, h12: false, bin0: '1000', math0: '8+0+0+0', bin1: '01010', math1: '0+1' },
      { h: 19, h01: true, h02: false, h04: false, h08: true, h11: true, h12: false, bin0: '1001', math0: '8+0+0+1', bin1: '01010', math1: '0+1' },
      { h: 20, h01: false, h02: false, h04: false, h08: false, h11: false, h12: true, bin0: '0000', math0: '0+0+0+0', bin1: '10100', math1: '2+0' },
      { h: 21, h01: true, h02: false, h04: false, h08: false, h11: false, h12: true, bin0: '0001', math0: '0+0+0+1', bin1: '10100', math1: '2+0' },
      { h: 22, h01: false, h02: true, h04: false, h08: false, h11: false, h12: true, bin0: '0010', math0: '0+0+2+0', bin1: '10100', math1: '2+0' },
      { h: 23, h01: true, h02: true, h04: false, h08: false, h11: false, h12: true, bin0: '0011', math0: '0+0+2+1', bin1: '10100', math1: '2+0' },
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
    assert.equal(component.h.zero.math.text, '0+0+0+0', '0 - h0 math is correct');
    assert.equal(component.h.zero.binary.text, '0000', '0 - h0 binary is correct');
    assert.equal(component.h.one.math.text, '0+0', '0 - h1 math is correct');
    assert.equal(component.h.one.binary.text, '00000', '0 - h1 math is correct');

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

      assert.equal(component.h.zero.math.text, e.math0, `${e.h} zero math correct`);
      assert.equal(component.h.zero.binary.text, e.bin0, `${e.h} zero binary correct`);
      assert.equal(component.h.one.math.text, e.math1, `${e.h} one math correct`);
      assert.equal(component.h.one.binary.text, e.bin1, `${e.h} one binary correct`);

      const [display] = this._time.toTimeString().split(' ');
      assert.equal(component.human.time, display, 'human time is correct');
    });
  });

  test('minutes', async function(assert) {
    const examples = [
      { m: 1, m01: true, m02: false, m04: false, m08: false, m11: false, m12: false, m14: false, bin0: '0001', math0: '0+0+0+1', bin1: '000000', math1: '0+0+0' },
      { m: 2, m01: false, m02: true, m04: false, m08: false, m11: false, m12: false, m14: false, bin0: '0010', math0: '0+0+2+0', bin1: '000000', math1: '0+0+0' },
      { m: 3, m01: true, m02: true, m04: false, m08: false, m11: false, m12: false, m14: false, bin0: '0011', math0: '0+0+2+1', bin1: '000000', math1: '0+0+0' },
      { m: 4, m01: false, m02: false, m04: true, m08: false, m11: false, m12: false, m14: false, bin0: '0100', math0: '0+4+0+0', bin1: '000000', math1: '0+0+0' },
      { m: 5, m01: true, m02: false, m04: true, m08: false, m11: false, m12: false, m14: false, bin0: '0101', math0: '0+4+0+1', bin1: '000000', math1: '0+0+0' },
      { m: 6, m01: false, m02: true, m04: true, m08: false, m11: false, m12: false, m14: false, bin0: '0110', math0: '0+4+2+0', bin1: '000000', math1: '0+0+0' },
      { m: 7, m01: true, m02: true, m04: true, m08: false, m11: false, m12: false, m14: false, bin0: '0111', math0: '0+4+2+1', bin1: '000000', math1: '0+0+0' },
      { m: 8, m01: false, m02: false, m04: false, m08: true, m11: false, m12: false, m14: false, bin0: '1000', math0: '8+0+0+0', bin1: '000000', math1: '0+0+0' },
      { m: 9, m01: true, m02: false, m04: false, m08: true, m11: false, m12: false, m14: false, bin0: '1001', math0: '8+0+0+1', bin1: '000000', math1: '0+0+0' },
      { m: 10, m01: false, m02: false, m04: false, m08: false, m11: true, m12: false, m14: false, bin0: '0000', math0: '0+0+0+0', bin1: '001010', math1: '0+0+1' },
      { m: 11, m01: true, m02: false, m04: false, m08: false, m11: true, m12: false, m14: false, bin0: '0001', math0: '0+0+0+1', bin1: '001010', math1: '0+0+1' },
      { m: 12, m01: false, m02: true, m04: false, m08: false, m11: true, m12: false, m14: false, bin0: '0010', math0: '0+0+2+0', bin1: '001010', math1: '0+0+1' },
      { m: 13, m01: true, m02: true, m04: false, m08: false, m11: true, m12: false, m14: false, bin0: '0011', math0: '0+0+2+1', bin1: '001010', math1: '0+0+1' },
      { m: 14, m01: false, m02: false, m04: true, m08: false, m11: true, m12: false, m14: false, bin0: '0100', math0: '0+4+0+0', bin1: '001010', math1: '0+0+1' },
      { m: 15, m01: true, m02: false, m04: true, m08: false, m11: true, m12: false, m14: false, bin0: '0101', math0: '0+4+0+1', bin1: '001010', math1: '0+0+1' },
      { m: 16, m01: false, m02: true, m04: true, m08: false, m11: true, m12: false, m14: false, bin0: '0110', math0: '0+4+2+0', bin1: '001010', math1: '0+0+1' },
      { m: 17, m01: true, m02: true, m04: true, m08: false, m11: true, m12: false, m14: false, bin0: '0111', math0: '0+4+2+1', bin1: '001010', math1: '0+0+1' },
      { m: 18, m01: false, m02: false, m04: false, m08: true, m11: true, m12: false, m14: false, bin0: '1000', math0: '8+0+0+0', bin1: '001010', math1: '0+0+1' },
      { m: 19, m01: true, m02: false, m04: false, m08: true, m11: true, m12: false, m14: false, bin0: '1001', math0: '8+0+0+1', bin1: '001010', math1: '0+0+1' },
      { m: 20, m01: false, m02: false, m04: false, m08: false, m11: false, m12: true, m14: false, bin0: '0000', math0: '0+0+0+0', bin1: '010100', math1: '0+2+0' },
      { m: 21, m01: true, m02: false, m04: false, m08: false, m11: false, m12: true, m14: false, bin0: '0001', math0: '0+0+0+1', bin1: '010100', math1: '0+2+0' },
      { m: 22, m01: false, m02: true, m04: false, m08: false, m11: false, m12: true, m14: false, bin0: '0010', math0: '0+0+2+0', bin1: '010100', math1: '0+2+0' },
      { m: 23, m01: true, m02: true, m04: false, m08: false, m11: false, m12: true, m14: false, bin0: '0011', math0: '0+0+2+1', bin1: '010100', math1: '0+2+0' },
      { m: 24, m01: false, m02: false, m04: true, m08: false, m11: false, m12: true, m14: false, bin0: '0100', math0: '0+4+0+0', bin1: '010100', math1: '0+2+0' },
      { m: 25, m01: true, m02: false, m04: true, m08: false, m11: false, m12: true, m14: false, bin0: '0101', math0: '0+4+0+1', bin1: '010100', math1: '0+2+0' },
      { m: 26, m01: false, m02: true, m04: true, m08: false, m11: false, m12: true, m14: false, bin0: '0110', math0: '0+4+2+0', bin1: '010100', math1: '0+2+0' },
      { m: 27, m01: true, m02: true, m04: true, m08: false, m11: false, m12: true, m14: false, bin0: '0111', math0: '0+4+2+1', bin1: '010100', math1: '0+2+0' },
      { m: 28, m01: false, m02: false, m04: false, m08: true, m11: false, m12: true, m14: false, bin0: '1000', math0: '8+0+0+0', bin1: '010100', math1: '0+2+0' },
      { m: 29, m01: true, m02: false, m04: false, m08: true, m11: false, m12: true, m14: false, bin0: '1001', math0: '8+0+0+1', bin1: '010100', math1: '0+2+0' },
      { m: 30, m01: false, m02: false, m04: false, m08: false, m11: true, m12: true, m14: false, bin0: '0000', math0: '0+0+0+0', bin1: '011110', math1: '0+2+1' },
      { m: 31, m01: true, m02: false, m04: false, m08: false, m11: true, m12: true, m14: false, bin0: '0001', math0: '0+0+0+1', bin1: '011110', math1: '0+2+1' },
      { m: 32, m01: false, m02: true, m04: false, m08: false, m11: true, m12: true, m14: false, bin0: '0010', math0: '0+0+2+0', bin1: '011110', math1: '0+2+1' },
      { m: 33, m01: true, m02: true, m04: false, m08: false, m11: true, m12: true, m14: false, bin0: '0011', math0: '0+0+2+1', bin1: '011110', math1: '0+2+1' },
      { m: 34, m01: false, m02: false, m04: true, m08: false, m11: true, m12: true, m14: false, bin0: '0100', math0: '0+4+0+0', bin1: '011110', math1: '0+2+1' },
      { m: 35, m01: true, m02: false, m04: true, m08: false, m11: true, m12: true, m14: false, bin0: '0101', math0: '0+4+0+1', bin1: '011110', math1: '0+2+1' },
      { m: 36, m01: false, m02: true, m04: true, m08: false, m11: true, m12: true, m14: false, bin0: '0110', math0: '0+4+2+0', bin1: '011110', math1: '0+2+1' },
      { m: 37, m01: true, m02: true, m04: true, m08: false, m11: true, m12: true, m14: false, bin0: '0111', math0: '0+4+2+1', bin1: '011110', math1: '0+2+1' },
      { m: 38, m01: false, m02: false, m04: false, m08: true, m11: true, m12: true, m14: false, bin0: '1000', math0: '8+0+0+0', bin1: '011110', math1: '0+2+1' },
      { m: 39, m01: true, m02: false, m04: false, m08: true, m11: true, m12: true, m14: false, bin0: '1001', math0: '8+0+0+1', bin1: '011110', math1: '0+2+1' },
      { m: 40, m01: false, m02: false, m04: false, m08: false, m11: false, m12: false, m14: true, bin0: '0000', math0: '0+0+0+0', bin1: '101000', math1: '4+0+0' },
      { m: 41, m01: true, m02: false, m04: false, m08: false, m11: false, m12: false, m14: true, bin0: '0001', math0: '0+0+0+1', bin1: '101000', math1: '4+0+0' },
      { m: 42, m01: false, m02: true, m04: false, m08: false, m11: false, m12: false, m14: true, bin0: '0010', math0: '0+0+2+0', bin1: '101000', math1: '4+0+0' },
      { m: 43, m01: true, m02: true, m04: false, m08: false, m11: false, m12: false, m14: true, bin0: '0011', math0: '0+0+2+1', bin1: '101000', math1: '4+0+0' },
      { m: 44, m01: false, m02: false, m04: true, m08: false, m11: false, m12: false, m14: true, bin0: '0100', math0: '0+4+0+0', bin1: '101000', math1: '4+0+0' },
      { m: 45, m01: true, m02: false, m04: true, m08: false, m11: false, m12: false, m14: true, bin0: '0101', math0: '0+4+0+1', bin1: '101000', math1: '4+0+0' },
      { m: 46, m01: false, m02: true, m04: true, m08: false, m11: false, m12: false, m14: true, bin0: '0110', math0: '0+4+2+0', bin1: '101000', math1: '4+0+0' },
      { m: 47, m01: true, m02: true, m04: true, m08: false, m11: false, m12: false, m14: true, bin0: '0111', math0: '0+4+2+1', bin1: '101000', math1: '4+0+0' },
      { m: 48, m01: false, m02: false, m04: false, m08: true, m11: false, m12: false, m14: true, bin0: '1000', math0: '8+0+0+0', bin1: '101000', math1: '4+0+0' },
      { m: 49, m01: true, m02: false, m04: false, m08: true, m11: false, m12: false, m14: true, bin0: '1001', math0: '8+0+0+1', bin1: '101000', math1: '4+0+0' },
      { m: 50, m01: false, m02: false, m04: false, m08: false, m11: true, m12: false, m14: true, bin0: '0000', math0: '0+0+0+0', bin1: '110010', math1: '4+0+1' },
      { m: 51, m01: true, m02: false, m04: false, m08: false, m11: true, m12: false, m14: true, bin0: '0001', math0: '0+0+0+1', bin1: '110010', math1: '4+0+1' },
      { m: 52, m01: false, m02: true, m04: false, m08: false, m11: true, m12: false, m14: true, bin0: '0010', math0: '0+0+2+0', bin1: '110010', math1: '4+0+1' },
      { m: 53, m01: true, m02: true, m04: false, m08: false, m11: true, m12: false, m14: true, bin0: '0011', math0: '0+0+2+1', bin1: '110010', math1: '4+0+1' },
      { m: 54, m01: false, m02: false, m04: true, m08: false, m11: true, m12: false, m14: true, bin0: '0100', math0: '0+4+0+0', bin1: '110010', math1: '4+0+1' },
      { m: 55, m01: true, m02: false, m04: true, m08: false, m11: true, m12: false, m14: true, bin0: '0101', math0: '0+4+0+1', bin1: '110010', math1: '4+0+1' },
      { m: 56, m01: false, m02: true, m04: true, m08: false, m11: true, m12: false, m14: true, bin0: '0110', math0: '0+4+2+0', bin1: '110010', math1: '4+0+1' },
      { m: 57, m01: true, m02: true, m04: true, m08: false, m11: true, m12: false, m14: true, bin0: '0111', math0: '0+4+2+1', bin1: '110010', math1: '4+0+1' },
      { m: 58, m01: false, m02: false, m04: false, m08: true, m11: true, m12: false, m14: true, bin0: '1000', math0: '8+0+0+0', bin1: '110010', math1: '4+0+1' },
      { m: 59, m01: true, m02: false, m04: false, m08: true, m11: true, m12: false, m14: true, bin0: '1001', math0: '8+0+0+1', bin1: '110010', math1: '4+0+1' },
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
    assert.equal(component.m.zero.math.text, '0+0+0+0', '0 - m0 math is correct');
    assert.equal(component.m.zero.binary.text, '0000', '0 - m0 binary is correct');
    assert.equal(component.m.one.math.text, '0+0+0', '0 - m1 math is correct');
    assert.equal(component.m.one.binary.text, '000000', '0 - m1 binary is correct');

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

      assert.equal(component.m.zero.math.text, e.math0, `${e.m} zero math correct`);
      assert.equal(component.m.zero.binary.text, e.bin0, `${e.m} zero binary correct`);
      assert.equal(component.m.one.math.text, e.math1, `${e.m} one math correct`);
      assert.equal(component.m.one.binary.text, e.bin1, `${e.m} one binary correct`);

      const [display] = this._time.toTimeString().split(' ');
      assert.equal(component.human.time, display, 'human time is correct');
    });
  });

  test('seconds', async function(assert) {
    const examples = [
      { s: 1, s01: true, s02: false, s04: false, s08: false, s11: false, s12: false, s14: false, bin0: '0001', math0: '0+0+0+1', bin1: '000000', math1: '0+0+0' },
      { s: 2, s01: false, s02: true, s04: false, s08: false, s11: false, s12: false, s14: false, bin0: '0010', math0: '0+0+2+0', bin1: '000000', math1: '0+0+0' },
      { s: 3, s01: true, s02: true, s04: false, s08: false, s11: false, s12: false, s14: false, bin0: '0011', math0: '0+0+2+1', bin1: '000000', math1: '0+0+0' },
      { s: 4, s01: false, s02: false, s04: true, s08: false, s11: false, s12: false, s14: false, bin0: '0100', math0: '0+4+0+0', bin1: '000000', math1: '0+0+0' },
      { s: 5, s01: true, s02: false, s04: true, s08: false, s11: false, s12: false, s14: false, bin0: '0101', math0: '0+4+0+1', bin1: '000000', math1: '0+0+0' },
      { s: 6, s01: false, s02: true, s04: true, s08: false, s11: false, s12: false, s14: false, bin0: '0110', math0: '0+4+2+0', bin1: '000000', math1: '0+0+0' },
      { s: 7, s01: true, s02: true, s04: true, s08: false, s11: false, s12: false, s14: false, bin0: '0111', math0: '0+4+2+1', bin1: '000000', math1: '0+0+0' },
      { s: 8, s01: false, s02: false, s04: false, s08: true, s11: false, s12: false, s14: false, bin0: '1000', math0: '8+0+0+0', bin1: '000000', math1: '0+0+0' },
      { s: 9, s01: true, s02: false, s04: false, s08: true, s11: false, s12: false, s14: false, bin0: '1001', math0: '8+0+0+1', bin1: '000000', math1: '0+0+0' },
      { s: 10, s01: false, s02: false, s04: false, s08: false, s11: true, s12: false, s14: false, bin0: '0000', math0: '0+0+0+0', bin1: '001010', math1: '0+0+1' },
      { s: 11, s01: true, s02: false, s04: false, s08: false, s11: true, s12: false, s14: false, bin0: '0001', math0: '0+0+0+1', bin1: '001010', math1: '0+0+1' },
      { s: 12, s01: false, s02: true, s04: false, s08: false, s11: true, s12: false, s14: false, bin0: '0010', math0: '0+0+2+0', bin1: '001010', math1: '0+0+1' },
      { s: 13, s01: true, s02: true, s04: false, s08: false, s11: true, s12: false, s14: false, bin0: '0011', math0: '0+0+2+1', bin1: '001010', math1: '0+0+1' },
      { s: 14, s01: false, s02: false, s04: true, s08: false, s11: true, s12: false, s14: false, bin0: '0100', math0: '0+4+0+0', bin1: '001010', math1: '0+0+1' },
      { s: 15, s01: true, s02: false, s04: true, s08: false, s11: true, s12: false, s14: false, bin0: '0101', math0: '0+4+0+1', bin1: '001010', math1: '0+0+1' },
      { s: 16, s01: false, s02: true, s04: true, s08: false, s11: true, s12: false, s14: false, bin0: '0110', math0: '0+4+2+0', bin1: '001010', math1: '0+0+1' },
      { s: 17, s01: true, s02: true, s04: true, s08: false, s11: true, s12: false, s14: false, bin0: '0111', math0: '0+4+2+1', bin1: '001010', math1: '0+0+1' },
      { s: 18, s01: false, s02: false, s04: false, s08: true, s11: true, s12: false, s14: false, bin0: '1000', math0: '8+0+0+0', bin1: '001010', math1: '0+0+1' },
      { s: 19, s01: true, s02: false, s04: false, s08: true, s11: true, s12: false, s14: false, bin0: '1001', math0: '8+0+0+1', bin1: '001010', math1: '0+0+1' },
      { s: 20, s01: false, s02: false, s04: false, s08: false, s11: false, s12: true, s14: false, bin0: '0000', math0: '0+0+0+0', bin1: '010100', math1: '0+2+0' },
      { s: 21, s01: true, s02: false, s04: false, s08: false, s11: false, s12: true, s14: false, bin0: '0001', math0: '0+0+0+1', bin1: '010100', math1: '0+2+0' },
      { s: 22, s01: false, s02: true, s04: false, s08: false, s11: false, s12: true, s14: false, bin0: '0010', math0: '0+0+2+0', bin1: '010100', math1: '0+2+0' },
      { s: 23, s01: true, s02: true, s04: false, s08: false, s11: false, s12: true, s14: false, bin0: '0011', math0: '0+0+2+1', bin1: '010100', math1: '0+2+0' },
      { s: 24, s01: false, s02: false, s04: true, s08: false, s11: false, s12: true, s14: false, bin0: '0100', math0: '0+4+0+0', bin1: '010100', math1: '0+2+0' },
      { s: 25, s01: true, s02: false, s04: true, s08: false, s11: false, s12: true, s14: false, bin0: '0101', math0: '0+4+0+1', bin1: '010100', math1: '0+2+0' },
      { s: 26, s01: false, s02: true, s04: true, s08: false, s11: false, s12: true, s14: false, bin0: '0110', math0: '0+4+2+0', bin1: '010100', math1: '0+2+0' },
      { s: 27, s01: true, s02: true, s04: true, s08: false, s11: false, s12: true, s14: false, bin0: '0111', math0: '0+4+2+1', bin1: '010100', math1: '0+2+0' },
      { s: 28, s01: false, s02: false, s04: false, s08: true, s11: false, s12: true, s14: false, bin0: '1000', math0: '8+0+0+0', bin1: '010100', math1: '0+2+0' },
      { s: 29, s01: true, s02: false, s04: false, s08: true, s11: false, s12: true, s14: false, bin0: '1001', math0: '8+0+0+1', bin1: '010100', math1: '0+2+0' },
      { s: 30, s01: false, s02: false, s04: false, s08: false, s11: true, s12: true, s14: false, bin0: '0000', math0: '0+0+0+0', bin1: '011110', math1: '0+2+1' },
      { s: 31, s01: true, s02: false, s04: false, s08: false, s11: true, s12: true, s14: false, bin0: '0001', math0: '0+0+0+1', bin1: '011110', math1: '0+2+1' },
      { s: 32, s01: false, s02: true, s04: false, s08: false, s11: true, s12: true, s14: false, bin0: '0010', math0: '0+0+2+0', bin1: '011110', math1: '0+2+1' },
      { s: 33, s01: true, s02: true, s04: false, s08: false, s11: true, s12: true, s14: false, bin0: '0011', math0: '0+0+2+1', bin1: '011110', math1: '0+2+1' },
      { s: 34, s01: false, s02: false, s04: true, s08: false, s11: true, s12: true, s14: false, bin0: '0100', math0: '0+4+0+0', bin1: '011110', math1: '0+2+1' },
      { s: 35, s01: true, s02: false, s04: true, s08: false, s11: true, s12: true, s14: false, bin0: '0101', math0: '0+4+0+1', bin1: '011110', math1: '0+2+1' },
      { s: 36, s01: false, s02: true, s04: true, s08: false, s11: true, s12: true, s14: false, bin0: '0110', math0: '0+4+2+0', bin1: '011110', math1: '0+2+1' },
      { s: 37, s01: true, s02: true, s04: true, s08: false, s11: true, s12: true, s14: false, bin0: '0111', math0: '0+4+2+1', bin1: '011110', math1: '0+2+1' },
      { s: 38, s01: false, s02: false, s04: false, s08: true, s11: true, s12: true, s14: false, bin0: '1000', math0: '8+0+0+0', bin1: '011110', math1: '0+2+1' },
      { s: 39, s01: true, s02: false, s04: false, s08: true, s11: true, s12: true, s14: false, bin0: '1001', math0: '8+0+0+1', bin1: '011110', math1: '0+2+1' },
      { s: 40, s01: false, s02: false, s04: false, s08: false, s11: false, s12: false, s14: true, bin0: '0000', math0: '0+0+0+0', bin1: '101000', math1: '4+0+0' },
      { s: 41, s01: true, s02: false, s04: false, s08: false, s11: false, s12: false, s14: true, bin0: '0001', math0: '0+0+0+1', bin1: '101000', math1: '4+0+0' },
      { s: 42, s01: false, s02: true, s04: false, s08: false, s11: false, s12: false, s14: true, bin0: '0010', math0: '0+0+2+0', bin1: '101000', math1: '4+0+0' },
      { s: 43, s01: true, s02: true, s04: false, s08: false, s11: false, s12: false, s14: true, bin0: '0011', math0: '0+0+2+1', bin1: '101000', math1: '4+0+0' },
      { s: 44, s01: false, s02: false, s04: true, s08: false, s11: false, s12: false, s14: true, bin0: '0100', math0: '0+4+0+0', bin1: '101000', math1: '4+0+0' },
      { s: 45, s01: true, s02: false, s04: true, s08: false, s11: false, s12: false, s14: true, bin0: '0101', math0: '0+4+0+1', bin1: '101000', math1: '4+0+0' },
      { s: 46, s01: false, s02: true, s04: true, s08: false, s11: false, s12: false, s14: true, bin0: '0110', math0: '0+4+2+0', bin1: '101000', math1: '4+0+0' },
      { s: 47, s01: true, s02: true, s04: true, s08: false, s11: false, s12: false, s14: true, bin0: '0111', math0: '0+4+2+1', bin1: '101000', math1: '4+0+0' },
      { s: 48, s01: false, s02: false, s04: false, s08: true, s11: false, s12: false, s14: true, bin0: '1000', math0: '8+0+0+0', bin1: '101000', math1: '4+0+0' },
      { s: 49, s01: true, s02: false, s04: false, s08: true, s11: false, s12: false, s14: true, bin0: '1001', math0: '8+0+0+1', bin1: '101000', math1: '4+0+0' },
      { s: 50, s01: false, s02: false, s04: false, s08: false, s11: true, s12: false, s14: true, bin0: '0000', math0: '0+0+0+0', bin1: '110010', math1: '4+0+1' },
      { s: 51, s01: true, s02: false, s04: false, s08: false, s11: true, s12: false, s14: true, bin0: '0001', math0: '0+0+0+1', bin1: '110010', math1: '4+0+1' },
      { s: 52, s01: false, s02: true, s04: false, s08: false, s11: true, s12: false, s14: true, bin0: '0010', math0: '0+0+2+0', bin1: '110010', math1: '4+0+1' },
      { s: 53, s01: true, s02: true, s04: false, s08: false, s11: true, s12: false, s14: true, bin0: '0011', math0: '0+0+2+1', bin1: '110010', math1: '4+0+1' },
      { s: 54, s01: false, s02: false, s04: true, s08: false, s11: true, s12: false, s14: true, bin0: '0100', math0: '0+4+0+0', bin1: '110010', math1: '4+0+1' },
      { s: 55, s01: true, s02: false, s04: true, s08: false, s11: true, s12: false, s14: true, bin0: '0101', math0: '0+4+0+1', bin1: '110010', math1: '4+0+1' },
      { s: 56, s01: false, s02: true, s04: true, s08: false, s11: true, s12: false, s14: true, bin0: '0110', math0: '0+4+2+0', bin1: '110010', math1: '4+0+1' },
      { s: 57, s01: true, s02: true, s04: true, s08: false, s11: true, s12: false, s14: true, bin0: '0111', math0: '0+4+2+1', bin1: '110010', math1: '4+0+1' },
      { s: 58, s01: false, s02: false, s04: false, s08: true, s11: true, s12: false, s14: true, bin0: '1000', math0: '8+0+0+0', bin1: '110010', math1: '4+0+1' },
      { s: 59, s01: true, s02: false, s04: false, s08: true, s11: true, s12: false, s14: true, bin0: '1001', math0: '8+0+0+1', bin1: '110010', math1: '4+0+1' },
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
    assert.equal(component.s.zero.math.text, '0+0+0+0', '0 - s0 math is correct');
    assert.equal(component.s.zero.binary.text, '0000', '0 - s0 binary is correct');
    assert.equal(component.s.one.math.text, '0+0+0', '0 - s1 math is correct');
    assert.equal(component.s.one.binary.text, '000000', '0 - s1 binary is correct');

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

      assert.equal(component.s.zero.math.text, e.math0, `${e.s} zero math correct`);
      assert.equal(component.s.zero.binary.text, e.bin0, `${e.s} zero binary correct`);
      assert.equal(component.s.one.math.text, e.math1, `${e.s} one math correct`);
      assert.equal(component.s.one.binary.text, e.bin1, `${e.s} one binary correct`);

      const [display] = this._time.toTimeString().split(' ');
      assert.equal(component.human.time, display, 'human time is correct');
    });
  });
});
