(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;



  function SliderHandler(selector, label) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    if (!label) {
      throw new Error('No label provided');
    }

    this.$sliderElement = $(selector);
    this.$sliderLabel = $(label);

    if (this.$sliderElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
    if (this.$sliderLabel.length === 0) {
      throw new Error('Could not find label with selector: ' + label);
    }

    this.defaultLabel = this.$sliderLabel[0].textContent + ' ' + this.$sliderElement[0].value;
    this.defaultColor = $('.colorLabel').css('color');

    this.$sliderLabel[0].textContent = this.$sliderLabel[0].textContent + ' ' + this.$sliderElement[0].value;

    var labelSplit = this.$sliderLabel[0].textContent.split(' ');


    delete labelSplit[labelSplit.length - 1];

    this.initialLabelValue = labelSplit.join(' ');

  }



  SliderHandler.prototype.addChangeHandler = function() {
    console.log('Setting changle handler for slider');
    this.$sliderElement.on('input', function(event) {
      this.$sliderLabel[0].textContent = this.initialLabelValue + ' ' + event.target.value;
      var color = this.defaultColor;
      if (event.target.value <= 50) {
        var percent = event.target.value / 50;
        color = 'rgb(' + (255 * percent) + ', 255, 0';
      } else {
        var percent = (event.target.value - 50) / 50;
        color = 'rgb(255,' + (255 * (1 - percent)) + ', 0';
      }
      this.$sliderLabel[0].style.color = color;
    }.bind(this))
  };

  SliderHandler.prototype.reset = function() {
    this.$sliderLabel[0].textContent = this.defaultLabel;
    this.$sliderLabel[0].style.color = this.defaultColor;
  };

  App.SliderHandler = SliderHandler;
  window.App = App;
})(window);
