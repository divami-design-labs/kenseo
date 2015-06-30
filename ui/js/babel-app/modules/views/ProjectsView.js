Kenseo.views.Projects = Backbone.View.extend({
    // The DOM Element associated with this view
    el: '.projects-section-content',
    itemView: function itemView(x) {
        return new Kenseo.views.Project(x);
    },
    // View constructor
    initialize: function initialize(payload) {
        this.data = payload.data;
        this.colStr = payload.colStr;
        this.el = payload.el;
        this.render();
    },
    events: {},
    render: function render() {
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
    initialize: function initialize() {
        if(this.model){
            this.listenTo(this.model, 'remove', this.remove);
        }
        // this.listenTo(this.model.collection, 'add', this.render);
    },
    events: {
        'click .popup-click': 'openPopup'
    },
    render: function render(data) {
        var data = data || this.model.toJSON();
        var html = this.template({ data: data });
        this.$el.append(html);
        return this;
    },
    openPopup: function openPopup(e) {
        e.preventDefault();
        var model = this.model.collection.get($(e.currentTarget).data('id'));
        sb.setPopupData(model.toJSON());

        Kenseo.currentModel = model;
    }
});