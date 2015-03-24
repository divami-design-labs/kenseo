Kenseo.Header.HeaderModel = Backbone.Model.extend({
  defaults: {
    profilepic: null
  },

  initialize: function() {
    this.set('profilepic', 'assets/imgs/profilepic.png');
  }
});
