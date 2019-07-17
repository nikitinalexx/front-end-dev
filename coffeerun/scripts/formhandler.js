(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector, modal, modalConfirm, modalDecline) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    if (!modal) {
      throw new Error('No modal provided');
    }
    if (!modalConfirm) {
      throw new Error('No modal confirm');
    }
    if (!modalDecline) {
      throw new Error('No modal decline');
    }

    this.$formElement = $(selector);
    this.$modalElement = $(modal);
    this.$modalConfirm = $(modalConfirm);
    this.$modalDecline = $(modalDecline);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
    if (this.$modalElement.length === 0) {
      throw new Error('Could not find element with selector: ' + modal);
    }
    if (this.$modalConfirm.length === 0) {
      throw new Error('Could not find element with selector: ' + modalConfirm);
    }
    if (this.$modalDecline.length === 0) {
      throw new Error('Could not find element with selector: ' + modalDecline);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn, makeUserWip, getWip) {
    console.log('Setting submit handler for form');
    var modalElement = this.$modalElement;
    var modalConfirm = this.$modalConfirm;
    var modalDecline = this.$modalDecline;

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

      var onClickCallback = function() {
        fn(data).then(function () {
          this.reset();
          this.elements[0].focus();
        }.bind(this));
      }.bind(this);

      if (data['size'] === 'zilla' && data['strength'] === '100') {
        modalConfirm.unbind();
        modalConfirm.click(function(event) {
          makeUserWip(data['emailAddress']);
          modalElement.modal('hide');
          onClickCallback();
        });
        modalDecline.unbind();
        modalDecline.click(function(event) {
          onClickCallback();
        });
        modalElement.modal('show');
      } else {
        onClickCallback();
      }

    })
  };

  FormHandler.prototype.addInputHandler = function(fn) {
    console.log('Setting input handler for form');

    this.$formElement.on('input', '[name="emailAddress"]', function(event) {
      var emailAddress = event.target.value;
      var message = '';
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email address!'
        event.target.setCustomValidity(message);
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
