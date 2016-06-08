function Persona(){
	this.init();
}

Persona.prototype = {
	init: function(){
		// register events
		$(document.body)
			.off('click', '.editable').on('click', '.editable', this.makeEditable.bind(this))
			.off('click', this.doOtherActions).on('click', this.doOtherActions.bind(this))
			.off('click', '.template-section--close').on('click', '.template-section--close', this.closeWidget.bind(this))
			.off('click', '.persona-indicator').on('click', '.persona-indicator', this.changeProgress.bind(this))
			.off('click', '.add-widget-btn').on('click', '.add-widget-btn', this.addWidgetBtn.bind(this))
			.off('click', '.persona-trait-item-close').on('click', '.persona-trait-item-close', this.addTraitItem.bind(this))
			.off('click', '.persona-indicator--add').on('click', '.persona-indicator--add', this.addPersonaIndicator.bind(this))
			.off('click', '.widget-item-name').on('click', '.widget-item-name', this.addWidget.bind(this))
			.off('click', '.persona-img-uploader-input').on('change', '.persona-img-uploader-input', this.uploadNewImage.bind(this));

		this.setAddingTag($('.persona-trait-item--add'));
	},
	setAddingTag: function($tagIcon){
		var $tagText = $tagIcon.prev();
		// add tag button
		// var $tagText = $('.persona-trait-item--add .persona-trait-item-text');
		var width = $tagText.outerWidth();
		$tagText.css({
			'margin-left': -width - 5 + "px"
		})
	},
	closeWidget: function(e){
		// @TODO: Do I need to show prompt before closing the widget?
		$(e.currentTarget).parent().remove();
	},
	makeEditable: function(e){
		// make sure all other elements are uneditable
		this.makeAllUneditable();
		// make the clicked element editable
		var el = e.currentTarget;
		$(el).prop('contenteditable', true).focus();
	},
	makeAllUneditable: function(){
		// make all elements with editable class as non editable
		$('.editable').prop('contenteditable', false);
	},
	doOtherActions: function(e){
		var $target = $(e.target);

		if(!sb.hasInheritClass($target, ['editable'])){
			this.makeAllUneditable();
		}

		if(!sb.hasInheritClass($target, ['add-widget-btn'])){
			$('.add-widget-btn').removeClass('active');
		}
	},
	changeProgress: function(e){
		var $el = $(e.currentTarget);
		var width = ((e.pageX - $el.offset().left) / $el.width() ) * 100;
		$el.children().css({
			'width': width + "%"
		});
	},
	addWidgetBtn: function(e){
		var el = e.currentTarget;
		el.classList.toggle('active');
	},
	addTraitItem: function(e){
		var $target = $(e.currentTarget);
		var $el = $target.parent();

		if($target.hasClass('persona-trait-item--add')){
			var $clone = $el.clone();
			$target.removeClass('persona-trait-item--add');

			var svg = $target.find('svg').get(0);
			svg.classList.add('tilt');

			$el.find('.persona-trait-item-text').css({
				'margin-left': "0px"
			});

			$el.parent().append($clone);

		}
		else{
			// $el.remove();
			// setInterval(function)
			// this.setAddingTag($target);
			// setInterval(function(){
				$el.css({
					"margin-left": -$el.outerWidth(),
					"position": "relative",
					"z-index": "-1"
				});

			// }, 300)
			$el.fadeOut('300');

		}
	},
	addPersonaIndicator: function(e){
		var $el = $(e.currentTarget);
		var $parent = $el.parents('.personal-indicator-holder');

		$(sb.setTemplate('persona-indicator', {heading: "Header", caption: "Caption here"})).insertBefore($el);
	},
	addWidget: function(e){
		var $el = $(e.currentTarget);
		var widgetType = $el.attr('persona-widget-type');

		var $leftSection = $('.persona-cards-holder--left');

		var $midSection = $('.persona-cards-holder--mid');

		var $rightSection = $('.persona-cards-holder--right');

		if(widgetType === "progress-indicators"){
			// Add a progress indicator widget
			$rightSection.append(sb.setTemplate('widget-progress-indicators', {
				indicators: [{
					heading: "Heading",
					caption: "Caption here"
				}]
			}));
		}
		else if(widgetType === "tags"){
			$leftSection.append(sb.setTemplate('widget-persona-tags'));
		}
		else if(widgetType === "list-items"){
			$midSection.append(sb.setTemplate('widget-persona-list-items', {
				heading: "Heading",
				items: ['add item here']
			}))
		}

		$('.add-widget-btn').removeClass('active');
	},
	uploadNewImage: function(e){
		console.dir(e.currentTarget);
	}
}