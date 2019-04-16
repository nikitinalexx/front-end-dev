(function(window) {
  'use strict';
  var App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function(order) {
    console.log('Adding order for ' + order.emailAddress);
    this.db.add(order.emailAddress, order);
  };

  Truck.prototype.makeUserWip = function(email) {
    console.log('Making a user wip ' + email);
    var wipUsers = this.db.get('wipUsers') || {};
    wipUsers[email] = true;
    this.db.add('wipUsers', wipUsers);
  }

  Truck.prototype.getWip = function(email) {
    var wipUsers = this.db.get('wipUsers');
    if (wipUsers && wipUsers[email]) {
      return true;
    } else {
      return false;
    }
  }

  Truck.prototype.deliverOrder = function(customerId) {
    console.log('Delivering order for ' + customerId);
    this.db.remove(customerId);
  };

  Truck.prototype.printOrders = function() {
    var customerIdArray = Object.keys(this.db.getAll());
    console.log('Truck #' + this.truckId + ' has pending orders:');
    customerIdArray.forEach(function(id) {
      console.log(this.db.get(id));
    }, this);
  };

  App.Truck = Truck;
  window.App = App;
})(window);
