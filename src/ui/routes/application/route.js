import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';
import { DARK_MODE } from '../../../services/settings';

export default class ApplicationRoute extends Route {
  @service settings

  beforeModel() {
    this._super();

    if (this.settings.get(DARK_MODE) === 'true') {
      document.querySelector('body').setAttribute('data-theme', 'dark');
    }
  }
}
