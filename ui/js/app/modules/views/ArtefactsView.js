'use strict';

Kenseo.views.Artefacts = Backbone.View.extend({
    // The DOM Element associated with this view
    el: '.review-requests-content',
    itemView: function itemView(x) {
        return new Kenseo.views.Artefact(x);
    },
    // View constructor
    initialize: function initialize(payload) {
        this.data = payload.data;
        this.colStr = payload.colStr;
        this.el = payload.el;
        this.$el.html(this.template);
        this.preLoader = payload.preLoader;
        this.id = payload.id;
        // this.payload = payload;
        this.render();
    },
    render: function render() {
        sb.renderXTemplate(this);

        return this;
    }
});

Kenseo.views.Artefact = Backbone.View.extend({
    // The DOM Element associated with this view
    tagName: 'a',
    className: 'review-request-item',
    template: _.template(templates['artefact']),
    // View constructor
    initialize: function initialize() {
        this.listenTo(this.model, 'remove', this.remove);
    },
    events: {
        'click .popup-click': 'openPopup',
        'click .artefact-cur-version': 'toggleVersions'
    },
    render: function render() {
        var data = this.model.toJSON();
        var html = this.template({ data: data });
        this.$el.append(html);
        var dataComparer = -1;
        this.$el.attr('data-pass', (function () {
            if (dataComparer == data.linkedId) {
                dataComparer = data.linkedId;
                return 1;
            } else {
                dataComparer = data.linkedId;
                return 0;
            }
        })());

        this.$el.attr('href', '#documentview/' + data.versionId);

        return this;
    },
    openPopup: function openPopup(e) {
        e.preventDefault();
        var model = this.model.collection.get($(e.currentTarget).data('id'));
        sb.setPopupData(model.toJSON());

        Kenseo.currentModel = model;
    },
    toggleVersions: function toggleVersions(e) {
        var $self = $(this);
        var num = +$self.html().substr(1);
        if (num > 0) {
            $self.toggleClass('active');
        }
    }
});