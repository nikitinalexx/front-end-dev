(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var STRENGTH_INPUT_SELECTOR = '[id="strengthLevel"]';
  var STRENGTH_LEVEL_LABEL = '[id="strengthLevelLabel"]';
  var MODAL_SELECTOR = '[id="exampleModal"]';
  var MODAL_CONFIRM_SELECTOR = '[id="modalConfirm"]';
  var EMAIL_INPUT_SELECTOR = '[id="emailInput"]';
  var EXTRA_ABILITY_SELECTOR = '[id="extraAbilityDiv"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var SliderHandler = App.SliderHandler;
  var EmailHandler = App.EmailHandler;
  var myTruck = new Truck('EAL', new DataStore());
  window.myTruck = myTruck;
  var formHandler = new FormHandler(FORM_SELECTOR, MODAL_SELECTOR, MODAL_CONFIRM_SELECTOR);
  var sliderHandler = new SliderHandler(STRENGTH_INPUT_SELECTOR, STRENGTH_LEVEL_LABEL);
  var emailHandler = new EmailHandler(EMAIL_INPUT_SELECTOR, EXTRA_ABILITY_SELECTOR);

  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck), myTruck.makeUserWip.bind(myTruck), myTruck.getWip.bind(myTruck));
  sliderHandler.addChangeHandler();
  emailHandler.addChangeHandler(myTruck.getWip.bind(myTruck));

  $(($(FORM_SELECTOR))[0]).on('reset', function() {
    sliderHandler.reset();
  })

  console.log(formHandler);
})(window);
