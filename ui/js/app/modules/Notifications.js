Kenseo.views.Notifications = Backbone.View.extend({
    el: '.notifications-content',
    initialize: function initialize(payload) {
        this.data = payload.data;
        this.templateHolder = payload.templateHolder;
        this.timeRelated = payload.timeRelated;
        this.render();
    },
    events: {},
    render: function render() {
        var _this = this;

        _this.collection.fetch(sb.getStandardData({
            data: _this.data,
            success: function(collection, response){
                var data = response.data;
                var newData = sb.getDayWiseData(data);

                if(_this.timeRelated){
                    // sb.renderTemplate({
                    //     templateHolder: _this.templateHolder,
                    //     templateName: 'db-notifications'
                    // });

                    // _this.templateHolder = _this.templateWrapperHolder.find(_this.templateHolder);

                    for(var key in newData){
                        var content = "";
                        newData[key].forEach(function(item){
                            var view = new Kenseo.views.Notification({
                                model: new Kenseo.models.Notifications(item),
                                collection: _this.collection
                            });

                            content = content + view.el.outerHTML;
                        });

                        _this.templateHolder.append(sb.setTemplate('day-wise-item',{data: {
                            label: key,
                            content: content
                        }}));
                    }
                }
                else{

                    data.forEach(function(item){
                        var view = new Kenseo.views.Notification({
                            model: new Kenseo.models.Notifications(item),
                            collection: _this.collection
                        });

                        _this.templateHolder.append(view.el);
                    });
                }
            }
        }));
        sb.subscribe($(window), 'addNotification', function(){
            var content = "";
            var key = "";
            var view = new Kenseo.views.Notification({
                // Insert global variable data in to the model
                model: new Kenseo.models.Notifications(Kenseo.data.model),
                collection: _this.collection,
                parent: _this
            })

            var $date = _this.templateHolder.find('.day-activity-label').eq(0).html().trim();
            $notificationEntryTime = Kenseo.data.model.time;
            $notificationTime = sb.timeFormat($notificationEntryTime,true,true);

            if($date == $notificationTime) {
                _this.templateHolder.find('.day-activity-section').prepend(view.el);
            } else {
                content = content + view.el.outerHTML;
                key = $notificationTime;
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

Kenseo.views.Notification = Backbone.View.extend({
    tagName: "div",
    className: "activity-holder",
    // className: "activity-holder",
    template: function(data){
        return sb.setTemplate('db-notification', {data: data});
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


Kenseo.models.Notifications = Backbone.Model.extend({
    // urlRoot: "app/packages/db-notifications.json"
    "default": {
        id: null,
        title: null,
        type: null,
        time: null,
        notifier: null,
        notifierId: null
    }
});

Kenseo.collections.Notifications = Backbone.Collection.extend({
    // url: "app/packages/db-notifications.json",
    url: sb.getRelativePath("getNotifications"),
    model: Kenseo.models.Notifications
});
