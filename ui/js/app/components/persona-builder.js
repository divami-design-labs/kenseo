function Persona(){
	this.init();
}

Persona.prototype = {
	init: function(){
		// register events
		$(document.body)
			.on('click', '.editable', this.makeEditable.bind(this))
			.on('click', this.doOtherActions.bind(this))
			.on('click', '.template-section--close', this.closeWidget.bind(this))
			.on('click', '.persona-indicator', this.changeProgress.bind(this))
			.on('click', '.add-widget-btn', this.addWidgetBtn.bind(this))
			.on('click', '.persona-trait-item-add', this.addTraitItem.bind(this))
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
		var el = e.currentTarget;

		var $parent = $(el.parentElement);
		// clone the current element
		$cloneParent = $parent.clone();

		$parent.prepend('<span class="persona-trait-item-text editable">Tag name</span>');

		$parent.parent().append($cloneParent);
		// For animation
		// el.classList.add('tilt');
		setTimeout(function(){
			// applying all classes of close icon
			el.className = "persona-trait-item-close widget-close template-section--close";
			el.querySelector('svg').classList.add("tilt");
		}, 300);
	}
}