(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector, modal, modalConfirm) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    if (!modal) {
      throw new Error('No modal provided');
    }
    if (!modalConfirm) {
      throw new Error('No modal confirm');
    }

    this.$formElement = $(selector);
    this.$modalElement = $(modal);
    this.$modalConfirm = $(modalConfirm);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
    if (this.$modalElement.length === 0) {
      throw new Error('Could not find element with selector: ' + modal);
    }
    if (this.$modalConfirm.length === 0) {
      throw new Error('Could not find element with selector: ' + modalConfirm);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn, makeUserWip, getWip) {
    console.log('Setting submit handler for form');
    var modalElement = this.$modalElement;
    var modalConfirm = this.$modalConfirm;

    this.$formElement.on('submit', function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });

      if (!getWip(data['emailAddress'])) {
        data['extraAbility'] = '';
      }

      console.log(data);

      if (data['size'] === 'zilla' && data['strength'] === '100') {
        modalConfirm.click(function(event) {
          makeUserWip(data['emailAddress']);
          modalElement.modal('hide');
        });
        modalElement.click(function(event) {
          this.reset();
        }.bind(this));
        modalElement.modal('show');
      } else {
        this.reset();
      }

      fn(data);

      this.elements[0].focus();
    })
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
