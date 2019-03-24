import Service from '@ember/service';

export const DARK_MODE = 'dark-mode';
export const HUMAN_TIME = 'human-time';
export const SHOW_MATH = 'show-math';
export const SHOW_BINARY = 'show-binary';
export default class SettingsService extends Service {

  /**
   *
   * @param {*} key
   */
  get(key) {
    return localStorage.getItem(key);
  }

  /**
   *
   * @param {*} key
   * @param {*} value
   */
  set(key, value) {
    localStorage.setItem(key, value);
  }

  /**
   *
   * @param {*} key
   */
  remove(key) {
    localStorage.removeItem(key);
  }
}
