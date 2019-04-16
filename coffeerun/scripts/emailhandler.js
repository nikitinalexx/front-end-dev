(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function EmailHandler(selector, extraAbilitySelector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    if (!extraAbilitySelector) {
      throw new Error('No extra ability selector provided');
    }

    this.$formElement = $(selector);
    this.extraAbilityElement = extraAbilitySelector;
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  EmailHandler.prototype.addChangeHandler = function(getWip) {
    console.log('Setting changle handler for email formHandler');
    var extraAbilityElement = this.extraAbilityElement;
    this.$formElement.on('input', function(event) {
      var foundElement = $(extraAbilityElement);
      if (getWip(this.$formElement[0].value)) {
        if (foundElement.length > 0) {
          $(extraAbilityElement)[0].hidden = false;
        }
      } else {
        if (foundElement.length > 0) {
          $(extraAbilityElement)[0].hidden = true;
        }
      }

    }.bind(this))
  };



  App.EmailHandler = EmailHandler;
  window.App = App;
})(window);
