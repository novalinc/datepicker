import { Injectable } from '@angular/core';

@Injectable()
export class DatepickerService {
    validOptions = [
            'configureOn',
            'dropdownSelector',
            'minuteStep',
            'minView',
            'modelType',
            'parseFormat',
            'renderOn',
            'startView',
            'screenReader'
        ];


 validator (configuration: any): boolean {

      var invalidOptions = Object.keys(configuration).filter(function (key) {
        return (this.validOptions.indexOf(key) < 0)
      })

      if (invalidOptions.length) {
        throw new Error('Invalid options: ' + invalidOptions.join(', '))
      }

      // Order of the elements in the validViews array is significant.
      var validViews = ['minute', 'hour', 'day', 'month', 'year']

      if (validViews.indexOf(configuration.startView) < 0) {
        throw new Error('invalid startView value: ' + configuration.startView)
      }

      if (validViews.indexOf(configuration.minView) < 0) {
        throw new Error('invalid minView value: ' + configuration.minView)
      }

      if (validViews.indexOf(configuration.minView) > validViews.indexOf(configuration.startView)) {
        throw new Error('startView must be greater than minView')
      }

      if (typeof configuration.minuteStep !== 'number') {
        throw new Error('minuteStep must be numeric')
      }
      if (configuration.minuteStep <= 0 || configuration.minuteStep >= 60) {
        throw new Error('minuteStep must be greater than zero and less than 60')
      }
      if (!configuration.configureOn || (typeof configuration.configureOn !== 'string')) {
        throw new Error('configureOn must be a string')
      }
      if (configuration.configureOn.length < 1) {
        throw new Error('configureOn must not be an empty string')
      }
      if (configuration.renderOn !== null && (configuration.renderOn !== 'string')) {
        throw new Error('renderOn must be a string')
      }
      if (configuration.renderOn.length < 1) {
        throw new Error('renderOn must not be an empty string')
      }
      if (!configuration.modelType || (typeof configuration.modelType === 'string')) {
        throw new Error('modelType must be a string')
      }
      if (configuration.modelType.length < 1) {
        throw new Error('modelType must not be an empty string')
      }
      if (configuration.modelType !== 'Date' && configuration.modelType !== 'moment' && configuration.modelType !== 'milliseconds') {
        // modelType contains string format, overriding parseFormat with modelType
        configuration.parseFormat = configuration.modelType
      }
      if (!configuration.dropdownSelector || (typeof configuration.dropdownSelector === 'string')) {
        throw new Error('dropdownSelector must be a string')
      }

      /* istanbul ignore next */
    //   if (configuration.dropdownSelector !== null && ((typeof jQuery === 'undefined') || (typeof jQuery().dropdown !== 'function'))) {
    //     $log.error('Please DO NOT specify the dropdownSelector option unless you are using jQuery AND Bootstrap.js. ' +
    //       'Please include jQuery AND Bootstrap.js, or write code to close the dropdown in the on-set-time callback. \n\n' +
    //       'The dropdownSelector configuration option is being removed because it will not function properly.')
    //     delete configuration.dropdownSelector
    //   }
      return true;
    }

}