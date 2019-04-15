(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var STRENGTH_INPUT_SELECTOR = '[id="strengthLevel"]';
  var STRENGTH_LEVEL_LABEL='[id="strengthLevelLabel"]';
  var MODAL_SELECTOR = '[id="exampleModal"]';
  var MODAL_CONFIRM_SELECTOR = '[id="modalConfirm"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var SliderHandler = App.SliderHandler;
  var ModalHandler = App.ModalHandler;
  var myTruck = new Truck('EAL', new DataStore());
  window.myTruck = myTruck;
  var formHandler = new FormHandler(FORM_SELECTOR, MODAL_SELECTOR);
  var sliderHandler = new SliderHandler(STRENGTH_INPUT_SELECTOR, STRENGTH_LEVEL_LABEL);
  var modalHandler = new ModalHandler(MODAL_CONFIRM_SELECTOR, myTruck);

  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  sliderHandler.addChangeHandler();

  $(($(FORM_SELECTOR))[0]).on('reset', function() {
    sliderHandler.reset();
  })

  console.log(formHandler);
})(window);
