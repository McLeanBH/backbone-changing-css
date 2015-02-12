(function(){

  var AppModel = Backbone.Model.extend({ // --> constructor
    defaults: {
      color: 'black'
    }
  });

  window.appModel = new AppModel(); //--> instance of model that reps the application state

var AppView = Backbone.View.extend({
  el: 'body',

  initialize: function(){
    this.listenTo(appModel, 'change', this.render);
  },

  render: function(){
    this.$el.css({
      'background-color': appModel.get('color')
    });
  }
});

  window.appView = new AppView({model: appModel}); // --> these lines 11-25 is the methos for changing body background-color on enter

  var TextInputView = Backbone.View.extend({
      el: 'form',
      events: {
        'submit': 'changeColor'
      },

      initialize: function(){
        this.listenTo(appModel, 'change', this.render);
      },

      changeColor: function(e) { // ---> this fxn is fired on the input view, when that happens, changes color on the appModel, fires change event, view (reacts?)...
        e.preventDefault();
        var color = this.$('input').val();
        appModel.set('color', color);
        // this.$('p, input').css('color', color );
        // this.$('input').val('');
      },

      render: function() {
        this.$('p, input').css('color', appModel.get('color'));
      }

});

window.inputView = new TextInputView(); // --> instance of view constructor - wired up to listen at the appModel

})();



// this.$('p, input').css('color', color ); --> this notation allows you to select multiple html elements.
// this.$('p').css('color', color );  ---> changes single html element
// this.$('input').val('');  ---> clears input field on enter
