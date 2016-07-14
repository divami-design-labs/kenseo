Kenseo.views.People = Backbone.View.extend({
    // The DOM Element associated with this view
    el: '.people-section',
    itemView: function itemView(x) {
        return new Kenseo.views.Person(x);
    },
    // View constructor
    initialize: function initialize(payload) {
        this.data = payload.data;
        this.templateHolder = payload.templateHolder;
        // presence of templateWrapperHolder is assumed to render the project page section
        this.templateWrapperHolder = payload.templateWrapperHolder;
        this.render();
        return this;
    },
    events: {},
    render: function render() {
        var _this = this;
        _this.collection.fetch(sb.getStandardData({
            data: _this.data,
            success: function(collection, response){
                // console.dir(response);
                var data = response.data;
                if(_this.templateWrapperHolder){
                    // Making sure the element is empty
                    _this.templateWrapperHolder.html('');

                    sb.renderTemplate({
                        templateHolder: _this.templateWrapperHolder,
                        templateName: 'people'
                    });

                    _this.templateHolder = _this.templateWrapperHolder.find(_this.templateHolder);

                }

                // make sure the element is empty
                _this.templateHolder.html('');

                var linkedId = -1;
                data.forEach(function(m, i, a){
                    // console.log(linkedId, m['linked_id'], linkedId === +m['linked_id']);
                    var view = new Kenseo.views.Person({
                        model: new Kenseo.models.People(m),
                        collection: _this.collection
                    });
                    _this.templateHolder.append(view.el);
                });

                // no items template
                if(data.length === 0){
                    _this.templateHolder.html("No users found");
                }
            }
        }));
    }
});

Kenseo.views.Person = Backbone.View.extend({
    // The DOM Element associated with this view
    tagName: 'div',
    className: 'people-item-holder',
    template: function(data){
        return sb.setTemplate('person', data)
    },
    // View constructor
    initialize: function initialize() {
        this.render();
        return this;
    },
    render: function render() {
        var data = this.model.toJSON();
        var html = this.template({ data: data });
        this.$el.append(html);

        return this;
    },
    events: {
        'click [data-url="removePeople"]': 'removePerson'
    },
    removePerson: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this,
            afterRender: function($popupContainer, scope){
                sb.attachIn('click', '.ok-btn', function(){
                    // hide the item temporarily
                    scope.$el.hide();
                    sb.ajaxCall({
                        url: sb.getRelativePath('removePeople'),
                        data: scope.model.toJSON(),
                        success: function(response){
                            // console.log("delete artefact");
                            if(response.data){ // is true
                                // hide popup
                                $popupContainer.remove();
                                $popupContainer.hide();
                                // delete the item permanently
                                scope.$el.remove();
                            }
                        }
                    })
                }, $popupContainer);
            }
        });
    }
});


Kenseo.models.People = Backbone.Model.extend({
    defaults: {

    }
});

// urlRoot: 'app/packages/people.json'

Kenseo.collections.People = Backbone.Collection.extend({
	url: sb.getRelativePath('getPeople'),
	model: function(attrs, options){
        return new Kenseo.models.People();
    }
});
