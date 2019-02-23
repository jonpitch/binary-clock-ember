import Ember from 'ember';
import Component from '@ember/component';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { computed } from '@ember-decorators/object';

export default class BinaryClock extends Component {

  _time = null;

  constructor() {
    super(...arguments);
    this.timer.perform();
  }

  @computed('_time')
  get s01() {
    const seconds = this._time.getSeconds();
    const binary = parseInt(seconds % 10, 10).toString(2).padStart(4, '0')
    return binary.slice(3) === '1';
  }

  @computed('_time')
  get s02() {
    const seconds = this._time.getSeconds();
    const binary = parseInt(seconds % 10, 10).toString(2).padStart(4, '0')
    return binary.slice(2, 3) === '1';
  }

  @computed('_time')
  get s04() {
    const seconds = this._time.getSeconds();
    const binary = parseInt(seconds % 10, 10).toString(2).padStart(4, '0')
    return binary.slice(1, 2) === '1';
  }

  @computed('_time')
  get s08() {
    const seconds = this._time.getSeconds();
    const binary = parseInt(seconds % 10, 10).toString(2).padStart(4, '0')
    return binary.slice(0, 1) === '1';
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
  get m01() {
    const minutes = this._time.getMinutes();
    const binary = parseInt(minutes % 10, 10).toString(2).padStart(4, '0')
    return binary.slice(3) === '1';
  }

  @computed('_time')
  get m02() {
    const minutes = this._time.getMinutes();
    const binary = parseInt(minutes % 10, 10).toString(2).padStart(4, '0')
    return binary.slice(2, 3) === '1';
  }

  @computed('_time')
  get m04() {
    const minutes = this._time.getMinutes();
    const binary = parseInt(minutes % 10, 10).toString(2).padStart(4, '0')
    return binary.slice(1, 2) === '1';
  }

  @computed('_time')
  get m08() {
    const minutes = this._time.getMinutes();
    const binary = parseInt(minutes % 10, 10).toString(2).padStart(4, '0')
    return binary.slice(0, 1) === '1';
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

  @computed('_time')
  get h01() {
    const hours = this._time.getHours();
    const binary = parseInt(hours % 10, 10).toString(2).padStart(4, '0')
    return binary.slice(3) === '1';
  }

  @computed('_time')
  get h02() {
    const hours = this._time.getHours();
    const binary = parseInt(hours % 10, 10).toString(2).padStart(4, '0')
    return binary.slice(2, 3) === '1';
  }

  @computed('_time')
  get h04() {
    const hours = this._time.getHours();
    const binary = parseInt(hours % 10, 10).toString(2).padStart(4, '0')
    return binary.slice(1, 2) === '1';
  }

  @computed('_time')
  get h08() {
    const hours = this._time.getHours();
    const binary = parseInt(hours % 10, 10).toString(2).padStart(4, '0')
    return binary.slice(0, 1) === '1';
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

  @task
  timer = function*() {
    while (true && !Ember.testing) {
      this.set('_time', new Date());
      yield timeout(1000);
    }
  }

}
