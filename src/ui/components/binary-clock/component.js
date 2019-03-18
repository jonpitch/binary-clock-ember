import Ember from 'ember';
import Component from '@ember/component';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { computed } from '@ember-decorators/object';
import { tagName } from '@ember-decorators/component';
import { inject as service } from '@ember-decorators/service';
import { HUMAN_TIME, SHOW_MATH, SHOW_BINARY } from '../../../services/settings';

@tagName('binary-clock')
export default class BinaryClock extends Component {
  @service settings

  _time = null;

  constructor() {
    super(...arguments);
    this.timer.perform();
  }

  @computed('_time')
  get s01() {
    const seconds = this._time.getSeconds();
    const binary = this._toBinary(seconds);
    return binary.slice(3) === '1';
  }

  @computed('_time')
  get s02() {
    const seconds = this._time.getSeconds();
    const binary = this._toBinary(seconds);
    return binary.slice(2, 3) === '1';
  }

  @computed('_time')
  get s04() {
    const seconds = this._time.getSeconds();
    const binary = this._toBinary(seconds);
    return binary.slice(1, 2) === '1';
  }

  @computed('_time')
  get s08() {
    const seconds = this._time.getSeconds();
    const binary = this._toBinary(seconds);
    return binary.slice(0, 1) === '1';
  }

  @computed('_time')
  get s0binary() {
    const seconds = this._time.getSeconds();
    const binary = this._toBinary(seconds);
    return binary;
  }

  @computed('s01', 's02', 's04', 's08')
  get s0math() {
    const eight = this.s08 ? '8+' : '0+';
    const four = this.s04 ? '4+' : '0+';
    const two = this.s02 ? '2+' : '0+';
    const one = this.s01 ? '1' : '0';
    return `${eight}${four}${two}${one}`;
  }

  @computed('_time')
  get s11() {
    const seconds = this._time.getSeconds();
    const tens = ((seconds - (seconds % 10)) / 10);
    return (tens === 1 || tens === 3 || tens === 5);
  }

  @computed('_time')
  get s12() {
    const seconds = this._time.getSeconds();
    const tens = ((seconds - (seconds % 10)) / 10);
    return (tens === 2 || tens === 3);
  }

  @computed('_time')
  get s14() {
    const seconds = this._time.getSeconds();
    const tens = ((seconds - (seconds % 10)) / 10);
    return (tens === 4 || tens === 5);
  }

  @computed('_time')
  get s1binary() {
    const seconds = this._time.getSeconds();
    const tens = (seconds - (seconds % 10));
    return this._toBinaryString(tens, 6);
  }

  @computed('s11', 's12', 's14', 's08')
  get s1math() {
    const four = this.s14 ? '4+' : '0+';
    const two = this.s12 ? '2+' : '0+';
    const one = this.s11 ? '1' : '0';
    return `${four}${two}${one}`;
  }

  @computed('_time')
  get m01() {
    const minutes = this._time.getMinutes();
    const binary = this._toBinary(minutes);
    return binary.slice(3) === '1';
  }

  @computed('_time')
  get m02() {
    const minutes = this._time.getMinutes();
    const binary = this._toBinary(minutes);
    return binary.slice(2, 3) === '1';
  }

  @computed('_time')
  get m04() {
    const minutes = this._time.getMinutes();
    const binary = this._toBinary(minutes);
    return binary.slice(1, 2) === '1';
  }

  @computed('_time')
  get m08() {
    const minutes = this._time.getMinutes();
    const binary = this._toBinary(minutes);
    return binary.slice(0, 1) === '1';
  }

  @computed('m01', 'm02', 'm04', 'm08')
  get m0math() {
    const eight = this.m08 ? '8+' : '0+';
    const four = this.m04 ? '4+' : '0+';
    const two = this.m02 ? '2+' : '0+';
    const one = this.m01 ? '1' : '0';
    return `${eight}${four}${two}${one}`;
  }

  @computed('_time')
  get m0binary() {
    const minutes = this._time.getMinutes();
    const binary = this._toBinary(minutes);
    return binary;
  }

  @computed('_time')
  get m11() {
    const minutes = this._time.getMinutes();
    const tens = ((minutes - (minutes % 10)) / 10);
    return (tens === 1 || tens === 3 || tens === 5);
  }

  @computed('_time')
  get m12() {
    const minutes = this._time.getMinutes();
    const tens = ((minutes - (minutes % 10)) / 10);
    return (tens === 2 || tens === 3);
  }

  @computed('_time')
  get m14() {
    const minutes = this._time.getMinutes();
    const tens = ((minutes - (minutes % 10)) / 10);
    return (tens === 4 || tens === 5);
  }

  @computed('m11', 'm12', 'm14')
  get m1math() {
    const four = this.m14 ? '4+' : '0+';
    const two = this.m12 ? '2+' : '0+';
    const one = this.m11 ? '1' : '0';
    return `${four}${two}${one}`;
  }

  @computed('_time')
  get m1binary() {
    const minutes = this._time.getMinutes();
    const tens = (minutes - (minutes % 10));
    return this._toBinaryString(tens, 6);
  }

  @computed('_time')
  get h01() {
    const hours = this._time.getHours();
    const binary = this._toBinary(hours);
    return binary.slice(3) === '1';
  }

  @computed('_time')
  get h02() {
    const hours = this._time.getHours();
    const binary = this._toBinary(hours);
    return binary.slice(2, 3) === '1';
  }

  @computed('_time')
  get h04() {
    const hours = this._time.getHours();
    const binary = this._toBinary(hours);
    return binary.slice(1, 2) === '1';
  }

  @computed('_time')
  get h08() {
    const hours = this._time.getHours();
    const binary = this._toBinary(hours);
    return binary.slice(0, 1) === '1';
  }

  @computed('h01', 'h02', 'h04', 'h08')
  get h0math() {
    const eight = this.h08 ? '8+' : '0+';
    const four = this.h04 ? '4+' : '0+';
    const two = this.h02 ? '2+' : '0+';
    const one = this.h01 ? '1' : '0';
    return `${eight}${four}${two}${one}`;
  }

  @computed('_time')
  get h0binary() {
    const hours = this._time.getHours();
    const binary = this._toBinary(hours);
    return binary;
  }

  @computed('_time')
  get h11() {
    const hours = this._time.getHours();
    return ((hours - (hours % 10)) / 10) === 1;
  }

  @computed('_time')
  get h12() {
    const hours = this._time.getHours();
    return ((hours - (hours % 10)) / 10) === 2;
  }

  @computed('h11', 'h12')
  get h1math() {
    const two = this.h12 ? '2+' : '0+';
    const one = this.h11 ? '1' : '0';
    return `${two}${one}`;
  }

  @computed('_time')
  get h1binary() {
    const hours = this._time.getHours();
    const tens = (hours - (hours % 10));
    return this._toBinaryString(tens, 5);
  }

  @computed('_time')
  get humanTime() {
    const h = this._time.getHours().toString().padStart(2, '0');
    const m = this._time.getMinutes().toString().padStart(2, '0');
    const s = this._time.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  @computed('settings.human-time')
  get showHumanTime() {
    return this.settings.get(HUMAN_TIME) === 'true';
  }

  @computed('settings.show-math')
  get showMath() {
    return this.settings.get(SHOW_MATH) === 'true';
  }

  @computed('settings.show-binary')
  get showBinary() {
    return this.settings.get(SHOW_BINARY) === 'true';
  }

  @task
  timer = function*() {
    while (true && !Ember.testing) {
      this.set('_time', new Date());
      yield timeout(1000);
    }
  }

  /**
   * convert an integer to a binary string
   * @param {int} decimal base 10 integer
   * @param {int} places pad result to the left with '0'
   * @return {string} binary string
   */
  _toBinary(decimal, places = 4) {
    const number = parseInt(decimal % 10, 10);
    return this._toBinaryString(number, places);
  }

  /**
   * format a decimal number as a binary string
   * @param {int} decimal
   * @param {int} places
   * @return {string} binary string
   */
  _toBinaryString(decimal, places = 4) {
    return decimal.toString(2).padStart(places, '0');
  }

}
