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
        this.id = payload.id;
        // this.payload = payload;
        this.render();
    },
    events: {
        'click .sort-item': 'sortArtefacts'
    },
    render: function() {
        sb.renderXTemplate(this);

        return this;
    },
    sortArtefacts: function(e){
        new Kenseo.views.Artefacts({
            el: '.artifacts-section',
            id: this.id, 
            colStr: 'Artefacts', 
            data: {projects: true, project_id: this.id, sharePermission: false, sortBy: $(e.currentTarget).data('stype')}, 
            preLoader: function(response){
                $('.artifacts-section').html(_.template(templates['artefacts'])(response));
            }
        });
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
        sb.setDynamicData("popup", model.toJSON());
    }
});