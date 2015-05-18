Kenseo.views.Projects = Backbone.View.extend({
    // The DOM Element associated with this view
    el: '.projects-section-content',
    itemView: function(x){
        return new Kenseo.views.Project(x);
    },
    // View constructor
    initialize: function(payload) {
        this.data = payload.data;
        this.colStr = payload.colStr;
        this.render();
    },
    events: {

    },
    render: function() {
        sb.renderXTemplate(this);
        return this;
    }
});

Kenseo.views.Project = Backbone.View.extend({
    // The DOM Element associated with this view
    tagName: 'div',
    className: 'project-block',
    template: _.template(templates['project-section']),
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
        return this;
    },
    openPopup: function(e){
        e.preventDefault();
        var model = this.model.collection.get($(e.currentTarget).data('id'));
        sb.setPopupData(model.toJSON());
    }
});