Kenseo.views.People = Backbone.View.extend({
    // The DOM Element associated with this view
    el: this.el || '.people-section',
    itemView: function itemView(x) {
        return new Kenseo.views.Person(x);
    },
    // View constructor
    initialize: function initialize(payload) {
        this.data = payload.data;
        this.el = payload.el;
        this.colStr = payload.colStr;
        this.preLoader = payload.preLoader;
        this.render();
    },
    events: {},
    render: function render() {
        sb.renderXTemplate(this);
        return this;
    }
});

Kenseo.views.Person = Backbone.View.extend({
    // The DOM Element associated with this view
    tagName: 'div',
    className: 'people-item-holder',
    template: _.template(templates['person']),
    // View constructor
    initialize: function initialize() {},
    render: function render() {
        var data = this.model.toJSON();
        var html = this.template({ data: data });
        this.$el.append(html);

        return this;
    }
});