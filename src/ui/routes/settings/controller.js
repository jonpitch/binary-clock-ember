import Controller from '@ember/controller';
import { action, computed } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import { DARK_MODE, HUMAN_TIME, SHOW_MATH, SHOW_BINARY } from '../../../services/settings';

export default class SettingsController extends Controller {
  @service settings

  @computed()
  get isDarkModeEnabled() {
    return this.settings.get(DARK_MODE) === 'true';
  }

  @computed()
  get isShowMathEnabled() {
    return this.settings.get(SHOW_MATH) === 'true';
  }

  @computed()
  get isShowBinaryEnabled() {
    return this.settings.get(SHOW_BINARY) === 'true';
  }

  @computed()
  get isHumanTimeEnabled() {
    return this.settings.get(HUMAN_TIME) === 'true';
  }

  @action
  toggle(key) {
    const current = this.settings.get(key) || false;
    const toValue = current === 'true';
    this.settings.set(key, !toValue);

    this.notifyPropertyChange('isDarkModeEnabled');
    this.notifyPropertyChange('isShowMathEnabled');
    this.notifyPropertyChange('isShowBinaryEnabled');
    this.notifyPropertyChange('isHumanTimeEnabled');

    if (key === DARK_MODE && !toValue) {
      document.querySelector('body').setAttribute('data-theme', 'dark');
    } else if (key === DARK_MODE) {
      document.querySelector('body').setAttribute('data-theme', '');
    }
  }
}
