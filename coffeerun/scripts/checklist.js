(function() {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  function Row(coffeeOrder) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    })

    var color = 'style="color: rgb(0,0,0);"';
    if (coffeeOrder.flavor === 'caramel') {
      color = 'style="color: rgb(167,107,41);"';
    } else if (coffeeOrder.flavor === 'almond') {
      color = 'style="color: rgb(94,87,80);"';
    } else if (coffeeOrder.flavor === 'mocha') {
      color = 'style="color: rgb(111,55,45);"';
    }

    var $label = $('<label ' + color + '></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });

    var description = '[' + coffeeOrder.strength + 'x] ';
    description += coffeeOrder.size + ' ';

    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
    }

    description += coffeeOrder.coffee;
    if (coffeeOrder.extraAbility) {
      description += ' ' + coffeeOrder.extraAbility;
    }

    description += '(' + coffeeOrder.emailAddress + ')';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  CheckList.prototype.addRow = function(coffeeOrder) {
    this.removeRow(coffeeOrder.emailAddress);

    // Создаем новый экземпляр строки на основе информации о заказе кофе
    var rowElement = new Row(coffeeOrder);
    // Добавляем свойство $element нового экземпляра строки в перечень
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function(email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  CheckList.prototype.addClickHandler = function(fn) {
    this.$element.on('click', 'input', function(event) {
      var email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));
  };


  App.CheckList = CheckList;
  window.App = App;
}());
