import {
  create,
  visitable,
  isVisible,
  clickable,
  attribute
} from 'ember-cli-page-object';

const url = '/';

export default create({
  url,
  visit: visitable(url),

  clock: {
    scope: 'binary-clock',
    isVisible: isVisible(),
    binary: {
      h1: isVisible('[data-test="h1-binary"]'),
      h0: isVisible('[data-test="h0-binary"]'),
      m1: isVisible('[data-test="m1-binary"]'),
      m0: isVisible('[data-test="m0-binary"]'),
      s1: isVisible('[data-test="s1-binary"]'),
      s0: isVisible('[data-test="s0-binary"]')
    },
    math: {
      h1: isVisible('[data-test="h1-math"]'),
      h0: isVisible('[data-test="h0-math"]'),
      m1: isVisible('[data-test="m1-math"]'),
      m0: isVisible('[data-test="m0-math"]'),
      s1: isVisible('[data-test="s1-math"]'),
      s0: isVisible('[data-test="s0-math"]')
    },
    humanTime: isVisible('[data-test="human-time"]'),
    theme: {
      resetScope: true,
      scope: 'body',
      value: attribute('data-theme')
    }
  },
  settings: {
    scope: '[data-test="settings"]',
    isVisible: isVisible('i'),
    click: clickable('i')
  }
});
