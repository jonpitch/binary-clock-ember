import Route from '@ember/routing/route';
import { action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';

export default class SettingsRoute extends Route {
  @service settings

  @action
  toggle(key) {
    const current = this.settings.get(key) || false;
    current === 'true'
      ? this.settings.set(key, false)
      : this.settings.set(key, true);
  }
}
