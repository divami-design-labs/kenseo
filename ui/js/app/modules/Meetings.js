Kenseo.views.Meetings = Backbone.View.extend({
});

Kenseo.views.MeetingInvitation = Backbone.View.extend({
    initialize: function(payload){
        this.payload = payload;
    }
});

Kenseo.views.MeetingNotes = Backbone.View.extend({
    el: '.meeting-notes-section',
    template: function(data){
        return sb.setTemplate('meetingnotes', {data: data});
    },
    initialize: function(payload){
        this.payload = payload;

        this.listenTo(this.model, 'change', this.render);
        // this.listenTo(this.model, 'change:toTime', this.changeValue.bind(this, 'toTime'));
        // this.listenTo(this.model, 'change:fromTime', this.changeValue.bind(this, 'fromTime'));
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));

        //since we have the Html ready now we can have the editor in place.
        var textEditorObj = new textEditor(document.querySelector('.text-editor-section'));
        sb.meeting.notes();
    },
    events: {
        "click": "handleUpdateButtonClick"
    },
    // changeValue: function(property, model, propertyValue){
    //     var obj = {};
    //     obj[property] = model.get('date') + " " + this.getTime(propertyValue);
    //     model.set(obj, {
    //         silent: true
    //     });
    // },
    getTime: function(str){
        if(/^t/i.test(str)){
            return str.match(/\d+:\d+/)[0];
        }
        return str;
    },
    handleUpdateButtonClick: function(){
        var data = this.model.toJSON();
        // prepare the edit meeting invitation field values
        sb.setPopulateValue('update-meeting', 'agenda',                 data.agenda);
        sb.setPopulateValue('update-meeting', 'artefact_name',          data.artefactName);
        sb.setPopulateValue('update-meeting', 'project_id',             data.projectId);
        sb.setPopulateValue('update-meeting', 'project_name',           data.projectName);
        sb.setPopulateValue('update-meeting', 'venue',                  data.venue);
        sb.setPopulateValue('update-meeting', 'meeting_id',             this.payload.meetingId);
        sb.setPopulateValue('update-meeting', 'meeting_date',           data.date);
        sb.setPopulateValue('update-meeting', 'meeting_date_from_time', data.fromTime);
        sb.setPopulateValue('update-meeting', 'meeting_date_to_time',   data.toTime);
        sb.setPopulateValue('update-meeting', 'participants_user_ids',  data.participants.map(function(participant){ return participant.id }));

        Kenseo.scope = this;
    }
});

Kenseo.models.Meeting = Backbone.Model.extend({
});