Kenseo.views.Artefacts = Backbone.View.extend({
    // The DOM Element associated with this view
    el: '.review-requests-content',
    itemView: function(x){
        return new Kenseo.views.Artefact(x);
    },
    // View constructor
    initialize: function(payload) {
        this.data = payload.data;
        this.colStr = payload.colStr;
        this.el = payload.el;
        this.$el.html(this.template)
        this.preLoader = payload.preLoader;
        // this.payload = payload;
        this.render();
    },
    events: {

    },
    render: function() {
        sb.renderXTemplate(this);

        return this;
    }
});

Kenseo.views.Artefact = Backbone.View.extend({
    // The DOM Element associated with this view
    tagName: 'div',
    className: 'review-request-item',
    template: _.template(templates['artefact']),
    // View constructor
    initialize: function() {

    },
    events: {
        'click .popup-click': 'openPopup'
    },
    render: function() {
        var data = this.model.toJSON();
        var html = this.template({data: data});
        this.$el.append(html);
        var dataComparer = -1;
        this.$el.attr('data-pass', function(){
                        if(dataComparer == data.linkedId){
                            dataComparer = data.linkedId; 
                            return 1; 
                        } else{
                            dataComparer = data.linkedId; 
                            return 0; 
                        }
                    }() );

        return this;
    },
    openPopup: function(e){
        e.preventDefault();
        var model = this.model.collection.get($(e.currentTarget).data('id'));
        Kenseo.data = model.toJSON();
    }
});


Kenseo.views.Activities = Backbone.View.extend({
    // The DOM Element associated with this view
    el: '.activity-section',
    // template: _.template(templates['activities']),
    // View constructor
    initialize: function(payload) {
        this.data = payload.data;
        this.render();
    },
    events: {

    },
    render: function() {
        var _this = this;
        this.collection.fetch(sb.getStandardData({data: this.data})).then(function(response){
            var html = _.template(templates['activities'])({data: response.data});
            _this.$el.html(html);
        });
        return this;
    }
});