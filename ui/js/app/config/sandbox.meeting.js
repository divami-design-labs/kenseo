/**
 * @author VK
 */
'use strict';

sb.meeting = {
	notes: function notes() {
		//now register events
		$(document).on('click', '.participant', function (e) {
			userId = $(this).attr('data-user');
			//switch the displayed notes
			$('.view-notes').removeClass('selectedNotes');
			$('.view-notes[data-user=' + userId + ']').addClass('selectedNotes');

			//toggle the left section image and name
			$('.currentPersonNotes').removeClass('acitiveNotesPartcipant');
			$('.currentPersonNotes[data-user=' + userId + ']').addClass('acitiveNotesPartcipant');

			//show or hide the the check box
			if (userId == $('.participant')[0].getAttribute('data-user')) {
				$('.meeting-right-section').find('.checkbox').show();
			} else {
				$('.meeting-right-section').find('.checkbox').hide();
			}

			//add active class
			$('.participant').removeClass('active');
			$(this).addClass('active');
		});
	}
};