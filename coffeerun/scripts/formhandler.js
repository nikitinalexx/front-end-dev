(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector, modal) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    if (!modal) {
      throw new Error('No modal provided');
    }

    this.$formElement = $(selector);
    this.$modalElement = $(modal);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
    if (this.$modalElement.length === 0) {
        throw new Error('Could not find element with selector: ' + modal);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log('Setting submit handler for form');
    var modalElement = this.$modalElement;

    this.$formElement.on('submit', function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });

      console.log(data);

      if (data['size'] === 'zilla' && data['strength'] === '100') {
        modalElement.modal();
      }

      fn(data);
      this.reset();
      this.elements[0].focus();
    })
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
