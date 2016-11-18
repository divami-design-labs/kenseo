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
        "click .meeting-update-button": "handleUpdateButtonClick",
        "click .add-meeting-notes"    : "addMeeetingNotes"
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
        sb.setPopulateValue('update-meeting', 'artefact_name',          data.artefact_name);
        sb.setPopulateValue('update-meeting', 'project_id',             data.project_id);
        sb.setPopulateValue('update-meeting', 'project_name',           data.project_name);
        sb.setPopulateValue('update-meeting', 'venue',                  data.venue);
        sb.setPopulateValue('update-meeting', 'meeting_id',             this.payload.meeting_id);
        sb.setPopulateValue('update-meeting', 'meeting_date',           data.meeting_date);
        sb.setPopulateValue('update-meeting', 'meeting_date_from_time', data.meeting_date_from_time);
        sb.setPopulateValue('update-meeting', 'meeting_date_to_time',   data.meeting_date_to_time);
        sb.setPopulateValue('update-meeting', 'participants_user_ids',  data.participants.map(function(participant){ return participant.id }));

        Kenseo.scope = this;
    },
    addMeeetingNotes: function(e){
        var data = this.model.toJSON();
        var currentSection = $('.meeting-right-section');
        if(currentSection.find('.existing-files-chk').prop("checked")){
            data.is_public = 1;
        }else{
            data.is_public = 0;
        }
        data.notes = currentSection.find('.text-editor').html();
        sb.setPopupData("writeMeetingNotes", "actionType");
        sb.setPopupData(data.is_public, "is_public");
        sb.setPopupData("writeMeetingNotes", "command");
        sb.setPopupData(data.notes, "notes");
        sb.setPopupData(data.meeting_id, "meeting_id");
        

    }
});

Kenseo.models.Meeting = Backbone.Model.extend({
});