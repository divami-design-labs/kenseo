/**
  * This is a Type-ahead Hierarchical combo tree component
  * @author Venkateshwar
  */
var comboBox = function comboBox(elem, suggestions, values) {
	var _this = this;
	var code = { up: 38, down: 40, enter: 13 },
	    $elem = $(elem);

	_this.suggestions = suggestions;
	values = values || {}, values.container = values.container || "comboTree", values.suggestionsContainer = values.suggestionsContainer || "suggestionsContainer", values.hoveredElement = values.hoveredElement || "active", values.collapseArrow = values.collapseArrow || "collapseArrow", values.expandArrow = values.expandArrow || "expandArrow", values.listClass = values.listClass || "selectable", values.noChild = "noChild", values.placeholder = values.placeholder || "", dot = ".", suggestionsContainerClass = dot + values.suggestionsContainer;

	$elem.addClass(values.container);

	_this.$elem = $elem;
	// var textBox = document.createElement('input');
	// textBox.setAttribute('type', 'text');
	renderSuggestions(elem, _this.suggestions);
	// if(values.disabled){
	// 	textBox.setAttribute('disabled', true);
	// }

	// <--  Hide section -->
	//events
	// This section is to make sure that when the user clicks on outside of the suggestions box
	// The suggestion box will hide.
	document.onclick = function () {
		hideSuggestions(true);
	};
	$elem.click(function (e) {
		e.stopPropagation();
	});
	// <-- End of Hide section -->

	/**
  * It is used to show or hide the child items. 'excludeChildren' flag is used to show or hide the child items
  * @constructor
  * @param {object} e - represents the event or jquery element object.
  */
	function toggleChildItems(e) {
		var el = $(e.currentTarget);

		if (el.hasClass(values.collapseArrow)) {
			collapseItems(el);
		} else if (el.hasClass(values.expandArrow)) {
			expandItems(el);
		}
		$elem.find("input").focus();
	}

	/**
  * It is used to hide the child items Makes the flag, 'excludeChildren' true. To hide the child items and then renders the new list again
  * @constructor
  * @param: {object} el - Holds the clicked parent list item
  */
	function collapseItems(el) {
		var refId = el.parent().data("id");
		for (var i = 0; i < _this.suggestions.length; i++) {
			var p = _this.suggestions[i];
			if (refId === p.id) {
				p.excludeChildren = true;
			}
		}
		renderSuggestions(elem, _this.suggestions);
	}

	/**
  * It is used to show the child items Makes the flag, 'excludeChildren' false. To show the child items and then renders the new list again
  * @param {object} el - Holds the clicked parent list item
  */
	function expandItems(el) {
		var refId = el.parent().data("id");
		var blnAccess = false;
		for (var i = 0; i < _this.suggestions.length; i++) {
			var p = _this.suggestions[i];
			if (refId === p.id) {
				blnAccess = true;
				p.excludeChildren = false;
			}
		}
		if (blnAccess) {
			renderSuggestions(elem, _this.suggestions);
		}
	}

	/**
  * Inserts the clicked list item's data in to the textbox. Here the code checks whether the clicked list item is parent item or parent item with no children or child item.
  * @constructor
  * @param {object} e - could be the event or the jquery dom element object itself.
  */
	function insertData(e) {
		var $el = $(e.currentTarget || e);
		var $text = $elem.find("input");
		var html = $el.html();
		// Trigger change event
		if ($text.val().toLowerCase() !== html.toLowerCase() && _this.onchange) {
			_this.onchange($text, $el, true);
		}
		if (!values.multiSelect) {
			var obj = {};
			var attrs = $el[0].attributes;
			for (var i = 0; i < attrs.length; i++) {
				var attr = attrs[i];
				if (attr.name !== "class") {
					$text.attr(attr.name, attr.value);
				}
			}

			$text.val(html);
		} else {
			var obj = {};
			var attrs = $el[0].attributes;
			for (var i = 0; i < attrs.length; i++) {
				var attr = attrs[i];
				if (attr.name !== "class") {
					obj[attr.name] = attr.value;
				}
			}
			obj.name = html;
			setSuggestionViewerItem(obj);
			$text.val("");
		}
		hideSuggestions();
		// Trigger change event
		if (_this.insertAfter) {
			_this.insertAfter($text, $el, true);
		}
	}

	/**
  * Shows the suggestions
  * @constructor
  * @param {object} e - event
  */
	function showSuggestions(e) {
		if ($elem.find(suggestionsContainerClass).css("display") !== "none") {
			return;
		}
		if (e) {
			filterSuggestions($(e.currentTarget));
		}
		$elem.find(suggestionsContainerClass).show();
	}

	function toggleSuggestions(e) {
		var $el = $(e.currentTarget);

		if ($(e.target).hasClass("selectable") || $el.find("input").prop("disabled")) {
			return;
		}
		if (e) {
			filterSuggestions($el.find("input"), true);
		}
		var $suggestionsContainer = $elem.find(suggestionsContainerClass);
		if ($suggestionsContainer.css("display") !== "none") {
			$suggestionsContainer.hide();
		} else {
			$(".combobox").not($elem).find(suggestionsContainerClass).hide();
			$suggestionsContainer.show();

			placeSuggestions($elem);
		}
	}
	/**
  * Hides the suggestions
  * @constructor
  * @param {boolean} dontFocus - This will be true if the textbox shouldn't be focussed.
  */
	function hideSuggestions(dontFocus) {
		$elem.find(suggestionsContainerClass).hide();
		if (!dontFocus) {
			focusInputTextBox();
		}
	}

	/*
  * Focuses the textBox
  * @constructor
  */
	function focusInputTextBox() {
		$elem.find("input").focus();
	}
	function placeSuggestions($combobox, $container) {
		var $el = $combobox.find('.combobox-wrapper');
		var width = $el.innerWidth(),
		    height = $el.outerHeight(),
		    offset = $el.offset();
		if ($container) {
			var oTop = $container.offset().top;
			var xTop = offset.top;

			var oHeight = $container.height();
			var scrollHeight = $container[0].scrollHeight;

			if (oTop > xTop || oTop + oHeight < xTop + height) {
				hideSuggestions(true);
				return;
			}
		}
		$el.find(".suggestionsContainer").css({
			left: offset.left - window.scrollX,
			top: offset.top + height,
			width: width
		});
	}
	/**
  * Triggers whenever user presses a keyboard key.
  * <br><b>Code explanation:</b> Handles keys to navigate the items up or down and 
  * when pressed 'Enter', the selected item will be added to the textbox.
  * @constructor
  * @param {object} e - represents key pressed event.
  */
	function keyOperations(e) {
		var keyCode = e.keyCode || e.which;
		var el = $(e.currentTarget);
		// 'UP' Key pressed
		if (code.up == keyCode) {
			var active = $elem.find(dot + values.hoveredElement);

			if (active.length) {

				var selectables = $elem.find(dot + values.listClass);

				for (var i = 0; i < selectables.length; i++) {
					var s = selectables.eq(i);
					if (s[0] === active[0]) {
						var k = i - 1;
						if (k >= 0 && k < selectables.length) {
							selectables.eq(k).addClass(values.hoveredElement);
						} else {
							selectables.eq(selectables.length - 1).addClass(values.hoveredElement);
						}
						active.removeClass(values.hoveredElement);
					}
				}
			} else {
				$elem.find(dot + values.listClass).last().addClass(values.hoveredElement);
			}
			showActiveItemTop();
		}
		// 'DOWN' key pressed
		else if (code.down === keyCode) {
				var active = $elem.find(dot + values.hoveredElement);

				if (active.length) {

					var selectables = $elem.find(dot + values.listClass);

					for (var i = 0; i < selectables.length; i++) {
						var s = selectables.eq(i);
						if (s[0] === active[0]) {
							var k = i + 1;
							if (k >= selectables.length) {
								selectables.eq(0).addClass(values.hoveredElement);
							} else {
								selectables.eq(k).addClass(values.hoveredElement);
							}
							active.removeClass(values.hoveredElement);
						}
					}
				} else {
					$elem.find(dot + values.listClass).first().addClass(values.hoveredElement);
				}
				showActiveItemDown();
			}
			// 'ENTER' Key pressed
			else if (code.enter === keyCode) {
					var $active = $elem.find(dot + values.listClass + dot + values.hoveredElement);
					if ($active.length && $active.is(":visible")) {
						insertData($active);
					} else {
						showSuggestions();
					}
				}
				// For other key pressed, just filter the suggestions.
				else {
						filterSuggestions(el);
					}
	}
	function showActiveItemTop() {
		var $activeItem = $elem.find(dot + values.hoveredElement);
		var $suggestionsContainer = $elem.find(dot + values.suggestionsContainer);
		var top = $activeItem.position().top;
		var actualTop = top + $suggestionsContainer.scrollTop();
		$suggestionsContainer.scrollTop(actualTop);
	}
	function showActiveItemDown() {
		var $activeItem = $elem.find(dot + values.hoveredElement);
		var $suggestionsContainer = $elem.find(dot + values.suggestionsContainer);
		var top = $activeItem.position().top;
		var actualTop = top + $suggestionsContainer.scrollTop();
		if (actualTop === 0) {
			$suggestionsContainer.scrollTop(0);
		} else if (actualTop >= $suggestionsContainer.height()) {
			$suggestionsContainer.scrollTop($activeItem.outerHeight() + $suggestionsContainer.scrollTop());
		}
	}
	/*
  * Styles the hovered item (parent or child).
  * @constructor
  * @param: 'e' represents the Mouse hovered event
  */
	function makeActive(e) {
		var el = $(e.currentTarget);
		$elem.find(dot + values.hoveredElement).removeClass(values.hoveredElement);
		el.addClass(values.hoveredElement);
	}

	/**
  * Filters the suggestions based on the entered text in textbox.
  * <br><b>Code explanation:</b> 'query' represents textbox value (with no colon)
  * 'queryString' represents parent item textbox value (before colon)
  * 'subQuery' represents child item's textbox value (after colon)
  * @constructor
  * @param {object} el - represent jquery dom element object.
  */
	function filterSuggestions(el, blnSuggestions) {
		if (!blnSuggestions) {
			showSuggestions();
		}
		var query = el.val().toLowerCase();
		for (var i = 0; i < _this.suggestions.length; i++) {
			var p = _this.suggestions[i];
			if (p.name.toLowerCase().indexOf(query) < 0) {
				p.excludeParent = true;
			} else {
				p.excludeParent = false;
			}
		}
		// renderSuggestions(elem, _this.suggestions, el.get(0));
		renderSuggestions(elem, _this.suggestions);

		// Preparing change event call
		var $selecteds = $elem.find(".selectable").filter(function () {
			return query === this.innerHTML.toLowerCase();
		});
		// Calling change event
		if (_this.onchange) {
			_this.onchange(el, $selecteds, !!$selecteds.length);
		}
	}

	/**
  * Renders the suggestions dynamically when user shows/hides the child items
  * or when user press any key (by focussing on input textbox).
  * 'list' represents the object data holding all parent items and child items with initialized flags:
  * 'excludeParent', 'excludeChildren' and 'excludeChild' flags.
  * @constructor
  * @param {object} el - represents the element in which the suggestions are to be rendered.
  */
	function renderSuggestions(el, list) {
		if (!el) {
			return;
		}
		var textBox = el.querySelector('input[type="text"]');
		var comboboxWrapper = el.querySelector('.combobox-wrapper');

		var $suggestionsViewer = $elem.find(".suggestions-viewer");
		var newList = _.cloneDeep(list);
		if ($suggestionsViewer.length) {
			$suggestionsViewer.find(".sv-item").each(function () {
				for (var i = 0; i < newList.length; i++) {
					if (newList[i].name.toLowerCase() === this.textContent.toLowerCase()) {
						newList.splice(i, 1);
					}
				}
			});
		}
		if (newList) {
			var ul = document.createElement("ul");

			for (var i = 0; i < newList.length; i++) {
				var project = newList[i];
				if (!project.excludeParent) {
					var projectHeadingWrapper = document.createElement("div");

					projectHeadingWrapper.className = values.listClass;
					projectHeadingWrapper.onmouseover = makeActive;

					projectHeadingWrapper.innerHTML = project.name;

					for (var key in project) {
						if (key !== "name") {
							if (key === "date") {
								project[key] = sb.timeFormat(project[key]);
							}
							projectHeadingWrapper.setAttribute("data-" + key, project[key]);
						}
					}
					// projectHeadingWrapper.setAttribute('data-id', project.id);

					projectHeadingWrapper.onclick = insertData;
					projectHeadingWrapper.name = project.id;

					var li = document.createElement("li");
					li.appendChild(projectHeadingWrapper);

					ul.appendChild(li);
				}
			}
			// if (!textBox) {
			if (!$suggestionsViewer.length) {
				var suggestionsViewer = document.createElement("div");
				// var comboboxWrapper = document.createElement("div");
				var suggestionsContainer = document.createElement("div");
				suggestionsViewer.className = "suggestions-viewer";
				suggestionsContainer.className = values.suggestionsContainer;
				// comboboxWrapper.className = "combobox-wrapper";
				// textBox = document.createElement("input");
				// textBox.setAttribute("type", "text");
				if (values.disabled) {
					textBox.setAttribute("disabled", true);
				}
				//event
				comboboxWrapper.onclick = toggleSuggestions;
				textBox.onkeyup = keyOperations;
				suggestionsContainer.appendChild(ul);
				// comboboxWrapper.appendChild(textBox);
				comboboxWrapper.appendChild(suggestionsContainer);
				if (values.suggestionsViewerAlign && values.suggestionsViewerAlign == "top") {
					// el.appendChild(suggestionsViewer);
					el.insertBefore(suggestionsViewer, comboboxWrapper);
					// el.appendChild(comboboxWrapper);
				} else {
						// el.appendChild(comboboxWrapper);
						el.appendChild(suggestionsViewer);
					}
				textBox.value = textBox.value || values.value || "";
				placeSuggestions($elem);
				window.addEventListener("resize", function () {
					placeSuggestions($elem);
				}, true);
				document.addEventListener("scroll", function (e) {
					var $self = $(e.target);
					if ($self.hasClass("suggestionsContainer")) {
						return;
					}
					placeSuggestions($elem, $self);
				}, true);
			} else {
				$elem.find(dot + values.suggestionsContainer).html("");
				$elem.find(dot + values.suggestionsContainer).get(0).appendChild(ul);
			}
			// textBox.value = txtValue;
			if (!newList.length) {
				textBox.placeholder = values.noplaceholder || "No items to choose";
			} else {
				textBox.placeholder = textBox.placeholder || values.placeholder;
			}
			// textBox.focus();
		}
	}
	function setSuggestionViewerItem(s) {
		if (s.name) {
			var svItem = document.createElement("div");
			svItem.className = "sv-item";
			var svName = document.createElement("div");
			svName.innerHTML = s.name;
			svName.className = "sv-name";
			for (var key in s) {
				if (key !== "name") svName.setAttribute(key, s[key]);
			}
			var svClose = document.createElement("div");
			svClose.className = "sv-close";
			svClose.onclick = function (e) {
				var el = e.currentTarget;
				$(el.parentElement).remove();
			};
			svItem.appendChild(svName);
			svItem.appendChild(svClose);
			$elem.find(".suggestions-viewer").append($(svItem));
		}
	}

	function renderSelectedItems() {
		var key = $elem.parent().data("name");
		if (key) {
			var selectedItems = Kenseo.popup.data[key];
			if (selectedItems) {
				var $suggestionsViewer = $elem.find(".suggestions-viewer");
				for (var i = 0; i < selectedItems.length; i++) {
					setSuggestionViewerItem(selectedItems[i]);
				}
			}
		}
	}

	renderSelectedItems();

	/**
  * when we want to change the suggestions or update the suggestion in the combobox
  * we can use this method to update them
  */
	_this.setSuggestions = function (newSuggestions) {
		_this.suggestions = newSuggestions;
		renderSuggestions(elem, _this.suggestions);
	};
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2JhYmVsLWFwcC9jb21wb25lbnRzL2NvbWJvYm94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxJQUFJLFFBQVEsR0FBRyxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRTtBQUMzRCxLQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDakIsS0FBSSxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtLQUN0QyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVwQixNQUFLLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUNoQyxPQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksV0FBVyxFQUFFLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsb0JBQW9CLElBQUksc0JBQXNCLEVBQUUsTUFBTSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxJQUFJLFFBQVEsRUFBRSxNQUFNLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLElBQUksZUFBZSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxhQUFhLEVBQUUsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUseUJBQXlCLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQzs7QUFFOWhCLE1BQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVqQyxN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QUFDLEFBTXRCLE1BQUssQ0FBQyxjQUFjLEdBQUcsVUFBVSxjQUFjLEVBQUU7QUFDaEQsT0FBSyxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUM7QUFDbkMsbUJBQWlCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztFQUMzQyxDQUFDO0NBQ0YsQ0FBQyIsImZpbGUiOiJjb21ib2JveC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICAqIFRoaXMgaXMgYSBUeXBlLWFoZWFkIEhpZXJhcmNoaWNhbCBjb21ibyB0cmVlIGNvbXBvbmVudFxuICAqIEBhdXRob3IgVmVua2F0ZXNod2FyXG4gICovXG52YXIgY29tYm9Cb3ggPSBmdW5jdGlvbiBjb21ib0JveChlbGVtLCBzdWdnZXN0aW9ucywgdmFsdWVzKSB7XG5cdHZhciBfdGhpcyA9IHRoaXM7XG5cdHZhciBjb2RlID0geyB1cDogMzgsIGRvd246IDQwLCBlbnRlcjogMTMgfSxcblx0ICAgICRlbGVtID0gJChlbGVtKTtcblxuXHRfdGhpcy5zdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zO1xuXHR2YWx1ZXMgPSB2YWx1ZXMgfHwge30sIHZhbHVlcy5jb250YWluZXIgPSB2YWx1ZXMuY29udGFpbmVyIHx8IFwiY29tYm9UcmVlXCIsIHZhbHVlcy5zdWdnZXN0aW9uc0NvbnRhaW5lciA9IHZhbHVlcy5zdWdnZXN0aW9uc0NvbnRhaW5lciB8fCBcInN1Z2dlc3Rpb25zQ29udGFpbmVyXCIsIHZhbHVlcy5ob3ZlcmVkRWxlbWVudCA9IHZhbHVlcy5ob3ZlcmVkRWxlbWVudCB8fCBcImFjdGl2ZVwiLCB2YWx1ZXMuY29sbGFwc2VBcnJvdyA9IHZhbHVlcy5jb2xsYXBzZUFycm93IHx8IFwiY29sbGFwc2VBcnJvd1wiLCB2YWx1ZXMuZXhwYW5kQXJyb3cgPSB2YWx1ZXMuZXhwYW5kQXJyb3cgfHwgXCJleHBhbmRBcnJvd1wiLCB2YWx1ZXMubGlzdENsYXNzID0gdmFsdWVzLmxpc3RDbGFzcyB8fCBcInNlbGVjdGFibGVcIiwgdmFsdWVzLm5vQ2hpbGQgPSBcIm5vQ2hpbGRcIiwgdmFsdWVzLnBsYWNlaG9sZGVyID0gdmFsdWVzLnBsYWNlaG9sZGVyIHx8IFwiXCIsIGRvdCA9IFwiLlwiLCBzdWdnZXN0aW9uc0NvbnRhaW5lckNsYXNzID0gZG90ICsgdmFsdWVzLnN1Z2dlc3Rpb25zQ29udGFpbmVyO1xuXG5cdCRlbGVtLmFkZENsYXNzKHZhbHVlcy5jb250YWluZXIpO1xuXG5cdF90aGlzLiRlbGVtID0gJGVsZW07XG5cdC8vIHZhciB0ZXh0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0Ly8gdGV4dEJveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuXHRyZW5kZXJTdWdnZXN0aW9ucyhlbGVtLCBfdGhpcy5zdWdnZXN0aW9ucyk7XG5cdC8vIGlmKHZhbHVlcy5kaXNhYmxlZCl7XG5cdC8vIFx0dGV4dEJveC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdC8vIH1cblxuXHQvLyA8LS0gIEhpZGUgc2VjdGlvbiAtLT5cblx0Ly9ldmVudHNcblx0Ly8gVGhpcyBzZWN0aW9uIGlzIHRvIG1ha2Ugc3VyZSB0aGF0IHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIG91dHNpZGUgb2YgdGhlIHN1Z2dlc3Rpb25zIGJveFxuXHQvLyBUaGUgc3VnZ2VzdGlvbiBib3ggd2lsbCBoaWRlLlxuXHRkb2N1bWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuXHRcdGhpZGVTdWdnZXN0aW9ucyh0cnVlKTtcblx0fTtcblx0JGVsZW0uY2xpY2soZnVuY3Rpb24gKGUpIHtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9KTtcblx0Ly8gPC0tIEVuZCBvZiBIaWRlIHNlY3Rpb24gLS0+XG5cblx0LyoqXG4gICogSXQgaXMgdXNlZCB0byBzaG93IG9yIGhpZGUgdGhlIGNoaWxkIGl0ZW1zLiAnZXhjbHVkZUNoaWxkcmVuJyBmbGFnIGlzIHVzZWQgdG8gc2hvdyBvciBoaWRlIHRoZSBjaGlsZCBpdGVtc1xuICAqIEBjb25zdHJ1Y3RvclxuICAqIEBwYXJhbSB7b2JqZWN0fSBlIC0gcmVwcmVzZW50cyB0aGUgZXZlbnQgb3IganF1ZXJ5IGVsZW1lbnQgb2JqZWN0LlxuICAqL1xuXHRmdW5jdGlvbiB0b2dnbGVDaGlsZEl0ZW1zKGUpIHtcblx0XHR2YXIgZWwgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cblx0XHRpZiAoZWwuaGFzQ2xhc3ModmFsdWVzLmNvbGxhcHNlQXJyb3cpKSB7XG5cdFx0XHRjb2xsYXBzZUl0ZW1zKGVsKTtcblx0XHR9IGVsc2UgaWYgKGVsLmhhc0NsYXNzKHZhbHVlcy5leHBhbmRBcnJvdykpIHtcblx0XHRcdGV4cGFuZEl0ZW1zKGVsKTtcblx0XHR9XG5cdFx0JGVsZW0uZmluZChcImlucHV0XCIpLmZvY3VzKCk7XG5cdH1cblxuXHQvKipcbiAgKiBJdCBpcyB1c2VkIHRvIGhpZGUgdGhlIGNoaWxkIGl0ZW1zIE1ha2VzIHRoZSBmbGFnLCAnZXhjbHVkZUNoaWxkcmVuJyB0cnVlLiBUbyBoaWRlIHRoZSBjaGlsZCBpdGVtcyBhbmQgdGhlbiByZW5kZXJzIHRoZSBuZXcgbGlzdCBhZ2FpblxuICAqIEBjb25zdHJ1Y3RvclxuICAqIEBwYXJhbToge29iamVjdH0gZWwgLSBIb2xkcyB0aGUgY2xpY2tlZCBwYXJlbnQgbGlzdCBpdGVtXG4gICovXG5cdGZ1bmN0aW9uIGNvbGxhcHNlSXRlbXMoZWwpIHtcblx0XHR2YXIgcmVmSWQgPSBlbC5wYXJlbnQoKS5kYXRhKFwiaWRcIik7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBfdGhpcy5zdWdnZXN0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHAgPSBfdGhpcy5zdWdnZXN0aW9uc1tpXTtcblx0XHRcdGlmIChyZWZJZCA9PT0gcC5pZCkge1xuXHRcdFx0XHRwLmV4Y2x1ZGVDaGlsZHJlbiA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJlbmRlclN1Z2dlc3Rpb25zKGVsZW0sIF90aGlzLnN1Z2dlc3Rpb25zKTtcblx0fVxuXG5cdC8qKlxuICAqIEl0IGlzIHVzZWQgdG8gc2hvdyB0aGUgY2hpbGQgaXRlbXMgTWFrZXMgdGhlIGZsYWcsICdleGNsdWRlQ2hpbGRyZW4nIGZhbHNlLiBUbyBzaG93IHRoZSBjaGlsZCBpdGVtcyBhbmQgdGhlbiByZW5kZXJzIHRoZSBuZXcgbGlzdCBhZ2FpblxuICAqIEBwYXJhbSB7b2JqZWN0fSBlbCAtIEhvbGRzIHRoZSBjbGlja2VkIHBhcmVudCBsaXN0IGl0ZW1cbiAgKi9cblx0ZnVuY3Rpb24gZXhwYW5kSXRlbXMoZWwpIHtcblx0XHR2YXIgcmVmSWQgPSBlbC5wYXJlbnQoKS5kYXRhKFwiaWRcIik7XG5cdFx0dmFyIGJsbkFjY2VzcyA9IGZhbHNlO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgX3RoaXMuc3VnZ2VzdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBwID0gX3RoaXMuc3VnZ2VzdGlvbnNbaV07XG5cdFx0XHRpZiAocmVmSWQgPT09IHAuaWQpIHtcblx0XHRcdFx0YmxuQWNjZXNzID0gdHJ1ZTtcblx0XHRcdFx0cC5leGNsdWRlQ2hpbGRyZW4gPSBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKGJsbkFjY2Vzcykge1xuXHRcdFx0cmVuZGVyU3VnZ2VzdGlvbnMoZWxlbSwgX3RoaXMuc3VnZ2VzdGlvbnMpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAqIEluc2VydHMgdGhlIGNsaWNrZWQgbGlzdCBpdGVtJ3MgZGF0YSBpbiB0byB0aGUgdGV4dGJveC4gSGVyZSB0aGUgY29kZSBjaGVja3Mgd2hldGhlciB0aGUgY2xpY2tlZCBsaXN0IGl0ZW0gaXMgcGFyZW50IGl0ZW0gb3IgcGFyZW50IGl0ZW0gd2l0aCBubyBjaGlsZHJlbiBvciBjaGlsZCBpdGVtLlxuICAqIEBjb25zdHJ1Y3RvclxuICAqIEBwYXJhbSB7b2JqZWN0fSBlIC0gY291bGQgYmUgdGhlIGV2ZW50IG9yIHRoZSBqcXVlcnkgZG9tIGVsZW1lbnQgb2JqZWN0IGl0c2VsZi5cbiAgKi9cblx0ZnVuY3Rpb24gaW5zZXJ0RGF0YShlKSB7XG5cdFx0dmFyICRlbCA9ICQoZS5jdXJyZW50VGFyZ2V0IHx8IGUpO1xuXHRcdHZhciAkdGV4dCA9ICRlbGVtLmZpbmQoXCJpbnB1dFwiKTtcblx0XHR2YXIgaHRtbCA9ICRlbC5odG1sKCk7XG5cdFx0Ly8gVHJpZ2dlciBjaGFuZ2UgZXZlbnRcblx0XHRpZiAoJHRleHQudmFsKCkudG9Mb3dlckNhc2UoKSAhPT0gaHRtbC50b0xvd2VyQ2FzZSgpICYmIF90aGlzLm9uY2hhbmdlKSB7XG5cdFx0XHRfdGhpcy5vbmNoYW5nZSgkdGV4dCwgJGVsLCB0cnVlKTtcblx0XHR9XG5cdFx0aWYgKCF2YWx1ZXMubXVsdGlTZWxlY3QpIHtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdHZhciBhdHRycyA9ICRlbFswXS5hdHRyaWJ1dGVzO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgYXR0ciA9IGF0dHJzW2ldO1xuXHRcdFx0XHRpZiAoYXR0ci5uYW1lICE9PSBcImNsYXNzXCIpIHtcblx0XHRcdFx0XHQkdGV4dC5hdHRyKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0JHRleHQudmFsKGh0bWwpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgb2JqID0ge307XG5cdFx0XHR2YXIgYXR0cnMgPSAkZWxbMF0uYXR0cmlidXRlcztcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGF0dHIgPSBhdHRyc1tpXTtcblx0XHRcdFx0aWYgKGF0dHIubmFtZSAhPT0gXCJjbGFzc1wiKSB7XG5cdFx0XHRcdFx0b2JqW2F0dHIubmFtZV0gPSBhdHRyLnZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRvYmoubmFtZSA9IGh0bWw7XG5cdFx0XHRzZXRTdWdnZXN0aW9uVmlld2VySXRlbShvYmopO1xuXHRcdFx0JHRleHQudmFsKFwiXCIpO1xuXHRcdH1cblx0XHRoaWRlU3VnZ2VzdGlvbnMoKTtcblx0XHQvLyBUcmlnZ2VyIGNoYW5nZSBldmVudFxuXHRcdGlmIChfdGhpcy5pbnNlcnRBZnRlcikge1xuXHRcdFx0X3RoaXMuaW5zZXJ0QWZ0ZXIoJHRleHQsICRlbCwgdHJ1ZSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICogU2hvd3MgdGhlIHN1Z2dlc3Rpb25zXG4gICogQGNvbnN0cnVjdG9yXG4gICogQHBhcmFtIHtvYmplY3R9IGUgLSBldmVudFxuICAqL1xuXHRmdW5jdGlvbiBzaG93U3VnZ2VzdGlvbnMoZSkge1xuXHRcdGlmICgkZWxlbS5maW5kKHN1Z2dlc3Rpb25zQ29udGFpbmVyQ2xhc3MpLmNzcyhcImRpc3BsYXlcIikgIT09IFwibm9uZVwiKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmIChlKSB7XG5cdFx0XHRmaWx0ZXJTdWdnZXN0aW9ucygkKGUuY3VycmVudFRhcmdldCkpO1xuXHRcdH1cblx0XHQkZWxlbS5maW5kKHN1Z2dlc3Rpb25zQ29udGFpbmVyQ2xhc3MpLnNob3coKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZVN1Z2dlc3Rpb25zKGUpIHtcblx0XHR2YXIgJGVsID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG5cdFx0aWYgKCQoZS50YXJnZXQpLmhhc0NsYXNzKFwic2VsZWN0YWJsZVwiKSB8fCAkZWwuZmluZChcImlucHV0XCIpLnByb3AoXCJkaXNhYmxlZFwiKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoZSkge1xuXHRcdFx0ZmlsdGVyU3VnZ2VzdGlvbnMoJGVsLmZpbmQoXCJpbnB1dFwiKSwgdHJ1ZSk7XG5cdFx0fVxuXHRcdHZhciAkc3VnZ2VzdGlvbnNDb250YWluZXIgPSAkZWxlbS5maW5kKHN1Z2dlc3Rpb25zQ29udGFpbmVyQ2xhc3MpO1xuXHRcdGlmICgkc3VnZ2VzdGlvbnNDb250YWluZXIuY3NzKFwiZGlzcGxheVwiKSAhPT0gXCJub25lXCIpIHtcblx0XHRcdCRzdWdnZXN0aW9uc0NvbnRhaW5lci5oaWRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQoXCIuY29tYm9ib3hcIikubm90KCRlbGVtKS5maW5kKHN1Z2dlc3Rpb25zQ29udGFpbmVyQ2xhc3MpLmhpZGUoKTtcblx0XHRcdCRzdWdnZXN0aW9uc0NvbnRhaW5lci5zaG93KCk7XG5cblx0XHRcdHBsYWNlU3VnZ2VzdGlvbnMoJGVsZW0pO1xuXHRcdH1cblx0fVxuXHQvKipcbiAgKiBIaWRlcyB0aGUgc3VnZ2VzdGlvbnNcbiAgKiBAY29uc3RydWN0b3JcbiAgKiBAcGFyYW0ge2Jvb2xlYW59IGRvbnRGb2N1cyAtIFRoaXMgd2lsbCBiZSB0cnVlIGlmIHRoZSB0ZXh0Ym94IHNob3VsZG4ndCBiZSBmb2N1c3NlZC5cbiAgKi9cblx0ZnVuY3Rpb24gaGlkZVN1Z2dlc3Rpb25zKGRvbnRGb2N1cykge1xuXHRcdCRlbGVtLmZpbmQoc3VnZ2VzdGlvbnNDb250YWluZXJDbGFzcykuaGlkZSgpO1xuXHRcdGlmICghZG9udEZvY3VzKSB7XG5cdFx0XHRmb2N1c0lucHV0VGV4dEJveCgpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG4gICogRm9jdXNlcyB0aGUgdGV4dEJveFxuICAqIEBjb25zdHJ1Y3RvclxuICAqL1xuXHRmdW5jdGlvbiBmb2N1c0lucHV0VGV4dEJveCgpIHtcblx0XHQkZWxlbS5maW5kKFwiaW5wdXRcIikuZm9jdXMoKTtcblx0fVxuXHRmdW5jdGlvbiBwbGFjZVN1Z2dlc3Rpb25zKCRjb21ib2JveCwgJGNvbnRhaW5lcikge1xuXHRcdHZhciAkZWwgPSAkY29tYm9ib3guZmluZCgnLmNvbWJvYm94LXdyYXBwZXInKTtcblx0XHR2YXIgd2lkdGggPSAkZWwuaW5uZXJXaWR0aCgpLFxuXHRcdCAgICBoZWlnaHQgPSAkZWwub3V0ZXJIZWlnaHQoKSxcblx0XHQgICAgb2Zmc2V0ID0gJGVsLm9mZnNldCgpO1xuXHRcdGlmICgkY29udGFpbmVyKSB7XG5cdFx0XHR2YXIgb1RvcCA9ICRjb250YWluZXIub2Zmc2V0KCkudG9wO1xuXHRcdFx0dmFyIHhUb3AgPSBvZmZzZXQudG9wO1xuXG5cdFx0XHR2YXIgb0hlaWdodCA9ICRjb250YWluZXIuaGVpZ2h0KCk7XG5cdFx0XHR2YXIgc2Nyb2xsSGVpZ2h0ID0gJGNvbnRhaW5lclswXS5zY3JvbGxIZWlnaHQ7XG5cblx0XHRcdGlmIChvVG9wID4geFRvcCB8fCBvVG9wICsgb0hlaWdodCA8IHhUb3AgKyBoZWlnaHQpIHtcblx0XHRcdFx0aGlkZVN1Z2dlc3Rpb25zKHRydWUpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXHRcdCRlbC5maW5kKFwiLnN1Z2dlc3Rpb25zQ29udGFpbmVyXCIpLmNzcyh7XG5cdFx0XHRsZWZ0OiBvZmZzZXQubGVmdCAtIHdpbmRvdy5zY3JvbGxYLFxuXHRcdFx0dG9wOiBvZmZzZXQudG9wICsgaGVpZ2h0LFxuXHRcdFx0d2lkdGg6IHdpZHRoXG5cdFx0fSk7XG5cdH1cblx0LyoqXG4gICogVHJpZ2dlcnMgd2hlbmV2ZXIgdXNlciBwcmVzc2VzIGEga2V5Ym9hcmQga2V5LlxuICAqIDxicj48Yj5Db2RlIGV4cGxhbmF0aW9uOjwvYj4gSGFuZGxlcyBrZXlzIHRvIG5hdmlnYXRlIHRoZSBpdGVtcyB1cCBvciBkb3duIGFuZCBcbiAgKiB3aGVuIHByZXNzZWQgJ0VudGVyJywgdGhlIHNlbGVjdGVkIGl0ZW0gd2lsbCBiZSBhZGRlZCB0byB0aGUgdGV4dGJveC5cbiAgKiBAY29uc3RydWN0b3JcbiAgKiBAcGFyYW0ge29iamVjdH0gZSAtIHJlcHJlc2VudHMga2V5IHByZXNzZWQgZXZlbnQuXG4gICovXG5cdGZ1bmN0aW9uIGtleU9wZXJhdGlvbnMoZSkge1xuXHRcdHZhciBrZXlDb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XG5cdFx0dmFyIGVsID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdC8vICdVUCcgS2V5IHByZXNzZWRcblx0XHRpZiAoY29kZS51cCA9PSBrZXlDb2RlKSB7XG5cdFx0XHR2YXIgYWN0aXZlID0gJGVsZW0uZmluZChkb3QgKyB2YWx1ZXMuaG92ZXJlZEVsZW1lbnQpO1xuXG5cdFx0XHRpZiAoYWN0aXZlLmxlbmd0aCkge1xuXG5cdFx0XHRcdHZhciBzZWxlY3RhYmxlcyA9ICRlbGVtLmZpbmQoZG90ICsgdmFsdWVzLmxpc3RDbGFzcyk7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3RhYmxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciBzID0gc2VsZWN0YWJsZXMuZXEoaSk7XG5cdFx0XHRcdFx0aWYgKHNbMF0gPT09IGFjdGl2ZVswXSkge1xuXHRcdFx0XHRcdFx0dmFyIGsgPSBpIC0gMTtcblx0XHRcdFx0XHRcdGlmIChrID49IDAgJiYgayA8IHNlbGVjdGFibGVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRzZWxlY3RhYmxlcy5lcShrKS5hZGRDbGFzcyh2YWx1ZXMuaG92ZXJlZEVsZW1lbnQpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0c2VsZWN0YWJsZXMuZXEoc2VsZWN0YWJsZXMubGVuZ3RoIC0gMSkuYWRkQ2xhc3ModmFsdWVzLmhvdmVyZWRFbGVtZW50KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGFjdGl2ZS5yZW1vdmVDbGFzcyh2YWx1ZXMuaG92ZXJlZEVsZW1lbnQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGVsZW0uZmluZChkb3QgKyB2YWx1ZXMubGlzdENsYXNzKS5sYXN0KCkuYWRkQ2xhc3ModmFsdWVzLmhvdmVyZWRFbGVtZW50KTtcblx0XHRcdH1cblx0XHRcdHNob3dBY3RpdmVJdGVtVG9wKCk7XG5cdFx0fVxuXHRcdC8vICdET1dOJyBrZXkgcHJlc3NlZFxuXHRcdGVsc2UgaWYgKGNvZGUuZG93biA9PT0ga2V5Q29kZSkge1xuXHRcdFx0dmFyIGFjdGl2ZSA9ICRlbGVtLmZpbmQoZG90ICsgdmFsdWVzLmhvdmVyZWRFbGVtZW50KTtcblxuXHRcdFx0aWYgKGFjdGl2ZS5sZW5ndGgpIHtcblxuXHRcdFx0XHR2YXIgc2VsZWN0YWJsZXMgPSAkZWxlbS5maW5kKGRvdCArIHZhbHVlcy5saXN0Q2xhc3MpO1xuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZWN0YWJsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgcyA9IHNlbGVjdGFibGVzLmVxKGkpO1xuXHRcdFx0XHRcdGlmIChzWzBdID09PSBhY3RpdmVbMF0pIHtcblx0XHRcdFx0XHRcdHZhciBrID0gaSArIDE7XG5cdFx0XHRcdFx0XHRpZiAoayA+PSBzZWxlY3RhYmxlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0c2VsZWN0YWJsZXMuZXEoMCkuYWRkQ2xhc3ModmFsdWVzLmhvdmVyZWRFbGVtZW50KTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHNlbGVjdGFibGVzLmVxKGspLmFkZENsYXNzKHZhbHVlcy5ob3ZlcmVkRWxlbWVudCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhY3RpdmUucmVtb3ZlQ2xhc3ModmFsdWVzLmhvdmVyZWRFbGVtZW50KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRlbGVtLmZpbmQoZG90ICsgdmFsdWVzLmxpc3RDbGFzcykuZmlyc3QoKS5hZGRDbGFzcyh2YWx1ZXMuaG92ZXJlZEVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdFx0c2hvd0FjdGl2ZUl0ZW1Eb3duKCk7XG5cdFx0fVxuXHRcdC8vICdFTlRFUicgS2V5IHByZXNzZWRcblx0XHRlbHNlIGlmIChjb2RlLmVudGVyID09PSBrZXlDb2RlKSB7XG5cdFx0XHR2YXIgJGFjdGl2ZSA9ICRlbGVtLmZpbmQoZG90ICsgdmFsdWVzLmxpc3RDbGFzcyArIGRvdCArIHZhbHVlcy5ob3ZlcmVkRWxlbWVudCk7XG5cdFx0XHRpZiAoJGFjdGl2ZS5sZW5ndGggJiYgJGFjdGl2ZS5pcyhcIjp2aXNpYmxlXCIpKSB7XG5cdFx0XHRcdGluc2VydERhdGEoJGFjdGl2ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzaG93U3VnZ2VzdGlvbnMoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gRm9yIG90aGVyIGtleSBwcmVzc2VkLCBqdXN0IGZpbHRlciB0aGUgc3VnZ2VzdGlvbnMuXG5cdFx0ZWxzZSB7XG5cdFx0XHRmaWx0ZXJTdWdnZXN0aW9ucyhlbCk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHNob3dBY3RpdmVJdGVtVG9wKCkge1xuXHRcdHZhciAkYWN0aXZlSXRlbSA9ICRlbGVtLmZpbmQoZG90ICsgdmFsdWVzLmhvdmVyZWRFbGVtZW50KTtcblx0XHR2YXIgJHN1Z2dlc3Rpb25zQ29udGFpbmVyID0gJGVsZW0uZmluZChkb3QgKyB2YWx1ZXMuc3VnZ2VzdGlvbnNDb250YWluZXIpO1xuXHRcdHZhciB0b3AgPSAkYWN0aXZlSXRlbS5wb3NpdGlvbigpLnRvcDtcblx0XHR2YXIgYWN0dWFsVG9wID0gdG9wICsgJHN1Z2dlc3Rpb25zQ29udGFpbmVyLnNjcm9sbFRvcCgpO1xuXHRcdCRzdWdnZXN0aW9uc0NvbnRhaW5lci5zY3JvbGxUb3AoYWN0dWFsVG9wKTtcblx0fVxuXHRmdW5jdGlvbiBzaG93QWN0aXZlSXRlbURvd24oKSB7XG5cdFx0dmFyICRhY3RpdmVJdGVtID0gJGVsZW0uZmluZChkb3QgKyB2YWx1ZXMuaG92ZXJlZEVsZW1lbnQpO1xuXHRcdHZhciAkc3VnZ2VzdGlvbnNDb250YWluZXIgPSAkZWxlbS5maW5kKGRvdCArIHZhbHVlcy5zdWdnZXN0aW9uc0NvbnRhaW5lcik7XG5cdFx0dmFyIHRvcCA9ICRhY3RpdmVJdGVtLnBvc2l0aW9uKCkudG9wO1xuXHRcdHZhciBhY3R1YWxUb3AgPSB0b3AgKyAkc3VnZ2VzdGlvbnNDb250YWluZXIuc2Nyb2xsVG9wKCk7XG5cdFx0aWYgKGFjdHVhbFRvcCA9PT0gMCkge1xuXHRcdFx0JHN1Z2dlc3Rpb25zQ29udGFpbmVyLnNjcm9sbFRvcCgwKTtcblx0XHR9IGVsc2UgaWYgKGFjdHVhbFRvcCA+PSAkc3VnZ2VzdGlvbnNDb250YWluZXIuaGVpZ2h0KCkpIHtcblx0XHRcdCRzdWdnZXN0aW9uc0NvbnRhaW5lci5zY3JvbGxUb3AoJGFjdGl2ZUl0ZW0ub3V0ZXJIZWlnaHQoKSArICRzdWdnZXN0aW9uc0NvbnRhaW5lci5zY3JvbGxUb3AoKSk7XG5cdFx0fVxuXHR9XG5cdC8qXG4gICogU3R5bGVzIHRoZSBob3ZlcmVkIGl0ZW0gKHBhcmVudCBvciBjaGlsZCkuXG4gICogQGNvbnN0cnVjdG9yXG4gICogQHBhcmFtOiAnZScgcmVwcmVzZW50cyB0aGUgTW91c2UgaG92ZXJlZCBldmVudFxuICAqL1xuXHRmdW5jdGlvbiBtYWtlQWN0aXZlKGUpIHtcblx0XHR2YXIgZWwgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0JGVsZW0uZmluZChkb3QgKyB2YWx1ZXMuaG92ZXJlZEVsZW1lbnQpLnJlbW92ZUNsYXNzKHZhbHVlcy5ob3ZlcmVkRWxlbWVudCk7XG5cdFx0ZWwuYWRkQ2xhc3ModmFsdWVzLmhvdmVyZWRFbGVtZW50KTtcblx0fVxuXG5cdC8qKlxuICAqIEZpbHRlcnMgdGhlIHN1Z2dlc3Rpb25zIGJhc2VkIG9uIHRoZSBlbnRlcmVkIHRleHQgaW4gdGV4dGJveC5cbiAgKiA8YnI+PGI+Q29kZSBleHBsYW5hdGlvbjo8L2I+ICdxdWVyeScgcmVwcmVzZW50cyB0ZXh0Ym94IHZhbHVlICh3aXRoIG5vIGNvbG9uKVxuICAqICdxdWVyeVN0cmluZycgcmVwcmVzZW50cyBwYXJlbnQgaXRlbSB0ZXh0Ym94IHZhbHVlIChiZWZvcmUgY29sb24pXG4gICogJ3N1YlF1ZXJ5JyByZXByZXNlbnRzIGNoaWxkIGl0ZW0ncyB0ZXh0Ym94IHZhbHVlIChhZnRlciBjb2xvbilcbiAgKiBAY29uc3RydWN0b3JcbiAgKiBAcGFyYW0ge29iamVjdH0gZWwgLSByZXByZXNlbnQganF1ZXJ5IGRvbSBlbGVtZW50IG9iamVjdC5cbiAgKi9cblx0ZnVuY3Rpb24gZmlsdGVyU3VnZ2VzdGlvbnMoZWwsIGJsblN1Z2dlc3Rpb25zKSB7XG5cdFx0aWYgKCFibG5TdWdnZXN0aW9ucykge1xuXHRcdFx0c2hvd1N1Z2dlc3Rpb25zKCk7XG5cdFx0fVxuXHRcdHZhciBxdWVyeSA9IGVsLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBfdGhpcy5zdWdnZXN0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHAgPSBfdGhpcy5zdWdnZXN0aW9uc1tpXTtcblx0XHRcdGlmIChwLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5KSA8IDApIHtcblx0XHRcdFx0cC5leGNsdWRlUGFyZW50ID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHAuZXhjbHVkZVBhcmVudCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyByZW5kZXJTdWdnZXN0aW9ucyhlbGVtLCBfdGhpcy5zdWdnZXN0aW9ucywgZWwuZ2V0KDApKTtcblx0XHRyZW5kZXJTdWdnZXN0aW9ucyhlbGVtLCBfdGhpcy5zdWdnZXN0aW9ucyk7XG5cblx0XHQvLyBQcmVwYXJpbmcgY2hhbmdlIGV2ZW50IGNhbGxcblx0XHR2YXIgJHNlbGVjdGVkcyA9ICRlbGVtLmZpbmQoXCIuc2VsZWN0YWJsZVwiKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHF1ZXJ5ID09PSB0aGlzLmlubmVySFRNTC50b0xvd2VyQ2FzZSgpO1xuXHRcdH0pO1xuXHRcdC8vIENhbGxpbmcgY2hhbmdlIGV2ZW50XG5cdFx0aWYgKF90aGlzLm9uY2hhbmdlKSB7XG5cdFx0XHRfdGhpcy5vbmNoYW5nZShlbCwgJHNlbGVjdGVkcywgISEkc2VsZWN0ZWRzLmxlbmd0aCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICogUmVuZGVycyB0aGUgc3VnZ2VzdGlvbnMgZHluYW1pY2FsbHkgd2hlbiB1c2VyIHNob3dzL2hpZGVzIHRoZSBjaGlsZCBpdGVtc1xuICAqIG9yIHdoZW4gdXNlciBwcmVzcyBhbnkga2V5IChieSBmb2N1c3Npbmcgb24gaW5wdXQgdGV4dGJveCkuXG4gICogJ2xpc3QnIHJlcHJlc2VudHMgdGhlIG9iamVjdCBkYXRhIGhvbGRpbmcgYWxsIHBhcmVudCBpdGVtcyBhbmQgY2hpbGQgaXRlbXMgd2l0aCBpbml0aWFsaXplZCBmbGFnczpcbiAgKiAnZXhjbHVkZVBhcmVudCcsICdleGNsdWRlQ2hpbGRyZW4nIGFuZCAnZXhjbHVkZUNoaWxkJyBmbGFncy5cbiAgKiBAY29uc3RydWN0b3JcbiAgKiBAcGFyYW0ge29iamVjdH0gZWwgLSByZXByZXNlbnRzIHRoZSBlbGVtZW50IGluIHdoaWNoIHRoZSBzdWdnZXN0aW9ucyBhcmUgdG8gYmUgcmVuZGVyZWQuXG4gICovXG5cdGZ1bmN0aW9uIHJlbmRlclN1Z2dlc3Rpb25zKGVsLCBsaXN0KSB7XG5cdFx0aWYgKCFlbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR2YXIgdGV4dEJveCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XG5cdFx0dmFyIGNvbWJvYm94V3JhcHBlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5jb21ib2JveC13cmFwcGVyJyk7XG5cblxuXHRcdHZhciAkc3VnZ2VzdGlvbnNWaWV3ZXIgPSAkZWxlbS5maW5kKFwiLnN1Z2dlc3Rpb25zLXZpZXdlclwiKTtcblx0XHR2YXIgbmV3TGlzdCA9IF8uY2xvbmVEZWVwKGxpc3QpO1xuXHRcdGlmICgkc3VnZ2VzdGlvbnNWaWV3ZXIubGVuZ3RoKSB7XG5cdFx0XHQkc3VnZ2VzdGlvbnNWaWV3ZXIuZmluZChcIi5zdi1pdGVtXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG5ld0xpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAobmV3TGlzdFtpXS5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0XHRcdFx0bmV3TGlzdC5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0aWYgKG5ld0xpc3QpIHtcblx0XHRcdHZhciB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBuZXdMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBwcm9qZWN0ID0gbmV3TGlzdFtpXTtcblx0XHRcdFx0aWYgKCFwcm9qZWN0LmV4Y2x1ZGVQYXJlbnQpIHtcblx0XHRcdFx0XHR2YXIgcHJvamVjdEhlYWRpbmdXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuXHRcdFx0XHRcdHByb2plY3RIZWFkaW5nV3JhcHBlci5jbGFzc05hbWUgPSB2YWx1ZXMubGlzdENsYXNzO1xuXHRcdFx0XHRcdHByb2plY3RIZWFkaW5nV3JhcHBlci5vbm1vdXNlb3ZlciA9IG1ha2VBY3RpdmU7XG5cblx0XHRcdFx0XHRwcm9qZWN0SGVhZGluZ1dyYXBwZXIuaW5uZXJIVE1MID0gcHJvamVjdC5uYW1lO1xuXG5cdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIHByb2plY3QpIHtcblx0XHRcdFx0XHRcdGlmIChrZXkgIT09IFwibmFtZVwiKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChrZXkgPT09IFwiZGF0ZVwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0cHJvamVjdFtrZXldID0gc2IudGltZUZvcm1hdChwcm9qZWN0W2tleV0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHByb2plY3RIZWFkaW5nV3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsga2V5LCBwcm9qZWN0W2tleV0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBwcm9qZWN0SGVhZGluZ1dyYXBwZXIuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgcHJvamVjdC5pZCk7XG5cblx0XHRcdFx0XHRwcm9qZWN0SGVhZGluZ1dyYXBwZXIub25jbGljayA9IGluc2VydERhdGE7XG5cdFx0XHRcdFx0cHJvamVjdEhlYWRpbmdXcmFwcGVyLm5hbWUgPSBwcm9qZWN0LmlkO1xuXG5cdFx0XHRcdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXHRcdFx0XHRcdGxpLmFwcGVuZENoaWxkKHByb2plY3RIZWFkaW5nV3JhcHBlcik7XG5cblx0XHRcdFx0XHR1bC5hcHBlbmRDaGlsZChsaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIGlmICghdGV4dEJveCkge1xuXHRcdFx0aWYgKCEkc3VnZ2VzdGlvbnNWaWV3ZXIubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBzdWdnZXN0aW9uc1ZpZXdlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdC8vIHZhciBjb21ib2JveFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHR2YXIgc3VnZ2VzdGlvbnNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHRzdWdnZXN0aW9uc1ZpZXdlci5jbGFzc05hbWUgPSBcInN1Z2dlc3Rpb25zLXZpZXdlclwiO1xuXHRcdFx0XHRzdWdnZXN0aW9uc0NvbnRhaW5lci5jbGFzc05hbWUgPSB2YWx1ZXMuc3VnZ2VzdGlvbnNDb250YWluZXI7XG5cdFx0XHRcdC8vIGNvbWJvYm94V3JhcHBlci5jbGFzc05hbWUgPSBcImNvbWJvYm94LXdyYXBwZXJcIjtcblx0XHRcdFx0Ly8gdGV4dEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0XHRcdFx0Ly8gdGV4dEJveC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcblx0XHRcdFx0aWYgKHZhbHVlcy5kaXNhYmxlZCkge1xuXHRcdFx0XHRcdHRleHRCb3guc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly9ldmVudFxuXHRcdFx0XHRjb21ib2JveFdyYXBwZXIub25jbGljayA9IHRvZ2dsZVN1Z2dlc3Rpb25zO1xuXHRcdFx0XHR0ZXh0Qm94Lm9ua2V5dXAgPSBrZXlPcGVyYXRpb25zO1xuXHRcdFx0XHRzdWdnZXN0aW9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh1bCk7XG5cdFx0XHRcdC8vIGNvbWJvYm94V3JhcHBlci5hcHBlbmRDaGlsZCh0ZXh0Qm94KTtcblx0XHRcdFx0Y29tYm9ib3hXcmFwcGVyLmFwcGVuZENoaWxkKHN1Z2dlc3Rpb25zQ29udGFpbmVyKTtcblx0XHRcdFx0aWYgKHZhbHVlcy5zdWdnZXN0aW9uc1ZpZXdlckFsaWduICYmIHZhbHVlcy5zdWdnZXN0aW9uc1ZpZXdlckFsaWduID09IFwidG9wXCIpIHtcblx0XHRcdFx0XHQvLyBlbC5hcHBlbmRDaGlsZChzdWdnZXN0aW9uc1ZpZXdlcik7XG5cdFx0XHRcdFx0ZWwuaW5zZXJ0QmVmb3JlKHN1Z2dlc3Rpb25zVmlld2VyLCBjb21ib2JveFdyYXBwZXIpO1xuXHRcdFx0XHRcdC8vIGVsLmFwcGVuZENoaWxkKGNvbWJvYm94V3JhcHBlcik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gZWwuYXBwZW5kQ2hpbGQoY29tYm9ib3hXcmFwcGVyKTtcblx0XHRcdFx0XHRlbC5hcHBlbmRDaGlsZChzdWdnZXN0aW9uc1ZpZXdlcik7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGV4dEJveC52YWx1ZSA9IHRleHRCb3gudmFsdWUgfHwgdmFsdWVzLnZhbHVlIHx8IFwiXCI7XG5cdFx0XHRcdHBsYWNlU3VnZ2VzdGlvbnMoJGVsZW0pO1xuXHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cGxhY2VTdWdnZXN0aW9ucygkZWxlbSk7XG5cdFx0XHRcdH0sIHRydWUpO1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0dmFyICRzZWxmID0gJChlLnRhcmdldCk7XG5cdFx0XHRcdFx0aWYgKCRzZWxmLmhhc0NsYXNzKFwic3VnZ2VzdGlvbnNDb250YWluZXJcIikpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cGxhY2VTdWdnZXN0aW9ucygkZWxlbSwgJHNlbGYpO1xuXHRcdFx0XHR9LCB0cnVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRlbGVtLmZpbmQoZG90ICsgdmFsdWVzLnN1Z2dlc3Rpb25zQ29udGFpbmVyKS5odG1sKFwiXCIpO1xuXHRcdFx0XHQkZWxlbS5maW5kKGRvdCArIHZhbHVlcy5zdWdnZXN0aW9uc0NvbnRhaW5lcikuZ2V0KDApLmFwcGVuZENoaWxkKHVsKTtcblx0XHRcdH1cblx0XHRcdC8vIHRleHRCb3gudmFsdWUgPSB0eHRWYWx1ZTtcblx0XHRcdGlmICghbmV3TGlzdC5sZW5ndGgpIHtcblx0XHRcdFx0dGV4dEJveC5wbGFjZWhvbGRlciA9IHZhbHVlcy5ub3BsYWNlaG9sZGVyIHx8IFwiTm8gaXRlbXMgdG8gY2hvb3NlXCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0ZXh0Qm94LnBsYWNlaG9sZGVyID0gdGV4dEJveC5wbGFjZWhvbGRlciB8fCB2YWx1ZXMucGxhY2Vob2xkZXI7XG5cdFx0XHR9XG5cdFx0XHQvLyB0ZXh0Qm94LmZvY3VzKCk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHNldFN1Z2dlc3Rpb25WaWV3ZXJJdGVtKHMpIHtcblx0XHRpZiAocy5uYW1lKSB7XG5cdFx0XHR2YXIgc3ZJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdHN2SXRlbS5jbGFzc05hbWUgPSBcInN2LWl0ZW1cIjtcblx0XHRcdHZhciBzdk5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0c3ZOYW1lLmlubmVySFRNTCA9IHMubmFtZTtcblx0XHRcdHN2TmFtZS5jbGFzc05hbWUgPSBcInN2LW5hbWVcIjtcblx0XHRcdGZvciAodmFyIGtleSBpbiBzKSB7XG5cdFx0XHRcdGlmIChrZXkgIT09IFwibmFtZVwiKSBzdk5hbWUuc2V0QXR0cmlidXRlKGtleSwgc1trZXldKTtcblx0XHRcdH1cblx0XHRcdHZhciBzdkNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdHN2Q2xvc2UuY2xhc3NOYW1lID0gXCJzdi1jbG9zZVwiO1xuXHRcdFx0c3ZDbG9zZS5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0dmFyIGVsID0gZS5jdXJyZW50VGFyZ2V0O1xuXHRcdFx0XHQkKGVsLnBhcmVudEVsZW1lbnQpLnJlbW92ZSgpO1xuXHRcdFx0fTtcblx0XHRcdHN2SXRlbS5hcHBlbmRDaGlsZChzdk5hbWUpO1xuXHRcdFx0c3ZJdGVtLmFwcGVuZENoaWxkKHN2Q2xvc2UpO1xuXHRcdFx0JGVsZW0uZmluZChcIi5zdWdnZXN0aW9ucy12aWV3ZXJcIikuYXBwZW5kKCQoc3ZJdGVtKSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gcmVuZGVyU2VsZWN0ZWRJdGVtcygpIHtcblx0XHR2YXIga2V5ID0gJGVsZW0ucGFyZW50KCkuZGF0YShcIm5hbWVcIik7XG5cdFx0aWYgKGtleSkge1xuXHRcdFx0dmFyIHNlbGVjdGVkSXRlbXMgPSBLZW5zZW8ucG9wdXAuZGF0YVtrZXldO1xuXHRcdFx0aWYgKHNlbGVjdGVkSXRlbXMpIHtcblx0XHRcdFx0dmFyICRzdWdnZXN0aW9uc1ZpZXdlciA9ICRlbGVtLmZpbmQoXCIuc3VnZ2VzdGlvbnMtdmlld2VyXCIpO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRzZXRTdWdnZXN0aW9uVmlld2VySXRlbShzZWxlY3RlZEl0ZW1zW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlclNlbGVjdGVkSXRlbXMoKTtcblxuXHQvKipcbiAgKiB3aGVuIHdlIHdhbnQgdG8gY2hhbmdlIHRoZSBzdWdnZXN0aW9ucyBvciB1cGRhdGUgdGhlIHN1Z2dlc3Rpb24gaW4gdGhlIGNvbWJvYm94XG4gICogd2UgY2FuIHVzZSB0aGlzIG1ldGhvZCB0byB1cGRhdGUgdGhlbVxuICAqL1xuXHRfdGhpcy5zZXRTdWdnZXN0aW9ucyA9IGZ1bmN0aW9uIChuZXdTdWdnZXN0aW9ucykge1xuXHRcdF90aGlzLnN1Z2dlc3Rpb25zID0gbmV3U3VnZ2VzdGlvbnM7XG5cdFx0cmVuZGVyU3VnZ2VzdGlvbnMoZWxlbSwgX3RoaXMuc3VnZ2VzdGlvbnMpO1xuXHR9O1xufTsiXX0=