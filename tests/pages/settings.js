import {
  create,
  visitable,
  clickable,
  is
} from 'ember-cli-page-object';

const url = '/settings';

export default create({
  url,
  visit: visitable(url),

  back: {
    scope: '[data-test="back"]',
    click: clickable('i')
  },

  darkMode: {
    scope: '[data-test="dark-mode"] input[type="checkbox"]',
    isChecked: is(':checked'),
    enable: clickable()
  },
  showMath: {
    scope: '[data-test="show-math"] input[type="checkbox"]',
    isChecked: is(':checked'),
    enable: clickable()
  },
  showBinary: {
    scope: '[data-test="show-binary"] input[type="checkbox"]',
    isChecked: is(':checked'),
    enable: clickable()
  },
  humanTime: {
    scope: '[data-test="human-time"] input[type="checkbox"]',
    isChecked: is(':checked'),
    enable: clickable()
  }

});
