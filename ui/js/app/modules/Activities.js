Kenseo.views.Activities = Backbone.View.extend({
    // The DOM Element associated with this view
    el: '.activity-section',
    // template: _.template(templates['activities']),
    // View constructor
    initialize: function initialize(payload) {
        this.data = payload.data;
        this.templateHolder = payload.templateHolder;
        this.templateWrapperHolder = payload.templateWrapperHolder;
        this.render();
    },
    events: {},
    render: function render() {
        var _this = this;
        // sb.fetch(this.collection, this.data, function (collection, response, options) {
        //     var html = sb.setTemplate('activities', { data: response.data });
        //     _this.$el.html(html);
        // });

        _this.collection.fetch(sb.getStandardData({
            data: _this.data,
            success: function(collection, response){
                var data = response.data;
                var newData = sb.getDayWiseData(data);

                if(_this.templateWrapperHolder){
                    sb.renderTemplate({
                        templateHolder: _this.templateWrapperHolder,
                        templateName: 'activities'
                    });

                    _this.templateHolder = _this.templateWrapperHolder.find(_this.templateHolder);

                    for(var key in newData){
                        var content = "";
                        newData[key].forEach(function(item){
                            var view = new Kenseo.views.Activity({
                                model: new Kenseo.models.Activities(item),
                                collection: _this.collection
                            });

                            content = content + view.el.outerHTML;
                        });

                        _this.templateHolder.append(sb.setTemplate('day-wise-item',{data: {
                            label: key,
                            content: content
                        }}));
                    }
                    // _this.templateHolder = _this.templateWrapperHolder.find('.artifacts-content');

                    // Attach necessary events
                    // sb.attach($('.sub-menu-item'), 'click', function(e){
                    //     var el = e.currentTarget;
                    //     var sortType = el.getAttribute('data-stype');
                    //     _this.sortBy = sortType;
                    //     _this.data.sortBy = sortType;
                    //     _this.render();
                    // });
                }
                else{

                    data.forEach(function(item){
                        var view = new Kenseo.views.Activity({
                            model: new Kenseo.models.Activities(item),
                            collection: _this.collection
                        });

                        _this.templateHolder.append(view.el);
                    });
                }
            }
        }));
        sb.subscribe($(window), 'addActivity', function(){
            var content = "";
            var key = "";
            var view = new Kenseo.views.Activity({
                // Insert global variable data in to the model
                model: new Kenseo.models.Activities(Kenseo.data.model),
                collection: _this.collection,
                parent: _this
            })

            var $date = _this.templateHolder.find('.day-activity-label').eq(0).html();
            if($date){
                $date = $date.trim();
            }
            $activityEntryTime = Kenseo.data.model.time;
            $activityTime = sb.timeFormat($activityEntryTime,true,true);

            if($date == $activityTime) {
                _this.templateHolder.find('.day-activity-section').prepend(view.el);
            } else {
                content = content + view.el.outerHTML;
                key = $activityTime;
                _this.templateHolder.prepend(sb.setTemplate('day-wise-item',{data: {
                    label: key,
                    content: content
                    }}));
            }

            // Empty the used global variable
            Kenseo.data.model = {};

        });
        return this;
    }
});

Kenseo.views.Activity = Backbone.View.extend({
    tagName: "div",
    className: "activity-holder",
    template: function(data){
        return sb.setTemplate('activity', {data: data});
    },
    initialize: function(payload){
        this.data = payload.data;
        this.render();
        return this;
    },
    render: function(){
        var _this = this;

        _this.$el.append(this.template(_this.model.toJSON()));
        return this;
    },
    events: {

    }
});


Kenseo.models.Activities = Backbone.Model.extend({
	// urlRoot: 'app/packages/artifacts.json'
	defaults: {
        activityName: null,
        activityOn: null,
        activityType: null,
        doneBy: null,
        id: null,
        project_name: null,
        time: null
	}
});

Kenseo.collections.Activities = Backbone.Collection.extend({
	url: sb.getRelativePath('getArtefacts'),
	model: function(attrs, options){
		// console.dir(arguments);
		return new Kenseo.models.Activities();
	}
});
