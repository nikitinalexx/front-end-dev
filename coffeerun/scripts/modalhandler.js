(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function ModalHandler(selector, truck) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$modalButton = $(selector);
    if (this.$modalButton.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }

    this.$modalButton.click(function(event) {
      console.log(truck.db);
    })
  }


  // FormHandler.prototype.addSubmitHandler = function(fn) {
  //
  // };

  App.ModalHandler = ModalHandler;
  window.App = App;
})(window);
