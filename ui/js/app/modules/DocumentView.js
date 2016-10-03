Kenseo.views.DocumentView = Backbone.View.extend({
    tagName: 'div',
    className: 'outerContainer inView',
    initialize: function(payload){
        this.payload = payload.payload;
        this.threads = []; // Initializing

        return this;
    },
    render: function(){
        var _this = this;
        var maskedVersionId = _this.payload.maskedId;

        // setting the model
        _this.model.set('masked_version_id', maskedVersionId);

        // console.log(this);
        var data = _this.model.toJSON();

        _this.$el.attr({
            'rel': 'pdf_' + data.versionId
        });

        // Before painting the new doc lets hide all the existing docs
        $('.outerContainer.inView').removeClass('inView');

        // Before adding the new tabItem un select the existing ones
        $('.tab-item.selectedTab').removeClass('selectedTab');

        var $pdfsContainer = $('.pdfs-container');
        // Before painting the pdf into the viewer we need to add a tab for it.
        // pdf viewer
        if (data.type == 'application/pdf') {
            var str = sb.setTemplate('tab-file', {
                maskedVersionId: maskedVersionId,
                data: data
            });
            // var str = '<a href="#documentview/' + maskedVersionId + '" class="tab-item selectedTab" targetRel="' + data.versionId + '"><div class= "fileTab" ></div></a>';
            $('.dv-tab-panel-section').prepend(str);
            $pdfsContainer.append(this.$el.html(sb.setTemplate('pdf-viewer', {data: data})));

            new paintPdf({
                url: sb.getRelativePath(data.documentPath),
                container: $('.outerContainer.inView').get(0),
                targetId: data.versionId,
                versionId: data.artefactId,
                documentView: this
            });

            //now get the version details of this version and show shared details
            sb.renderTemplate({
                url: sb.getRelativePath('getVersionDetails'),
                data: {
                    // versionId: Kenseo.data.artefact.id
                    versionId: data.versionId
                },
                templateName: 'dv-peoplesection',
                templateHolder: $('.dv-tb-people-section')
            });



            // Store the current artefact version related data in a global variable
            var threads = data.threads || {};
            // flag
            threads.noChangesDetected = true;
            sb.setCurrentDocumentData(data.versionId, threads);
            // annotator.init();
        }
        // Image viewer
        else if(data.type.indexOf('image') > -1){
            var str = sb.setTemplate('tab-img', {
                maskedVersionId: maskedVersionId,
                data: data
            });
            // var str = '<a href="#documentview/' + maskedVersionId + '" class="tab-item selectedTab" targetRel="' + data.versionId + '"><div class= " imageTab" ></div></a>';
            $('.dv-tab-panel-section').prepend(str);
            $pdfsContainer.append(this.$el.html(sb.setTemplate('pdf-toolbar', {data: data})));
            // $('.pdfs-container').append('')
        }
        else{
            // hide the status bar
            $pdfsContainer.parent().find('.dv-status-bar').hide();
            // Say the user that the artefact format is unsupported and provide option to download it
            var noView = new Kenseo.views.Artefact({
                model: this.model,
                templateName: "no-documentview"
            });
            $pdfsContainer.html(noView.render().$el);
        }
        sb.setVersionIdForMaskedId(maskedVersionId, data.versionId);
        var parent = document.querySelector('.outerContainer.inView .viewerContainer.parent');
        // _this.stickToBottom(parent);
    },
    events: {
        "click .new-textlayer":                     "handleDocumentLayerClick",
        "click .dvt-item.toggle-annotations-icon":  "handleToggleAnnotations",
        "click [data-url='private-message']":       "handleGlobalPrivateMessage",
        "click .dvt-item.slider-click":             "handleSliderClick",
        "click [data-url='add-version']":           "handleAddVersion",
        "click [data-url='replace-artefact']":      "handleReplaceArtefact",
        "click [data-url='edit-artefact-info']":    "editArtefactInfo",
        "click [data-url='share-artefact']":        "handleShareArtefact",
        "click [data-url='toggle-all-annotations']":"handleToggleAllAnnotations",
        "click [data-url^='submit-artefact']":       "handleSubmitArtefact"
    },
    handleSubmitArtefact: function(e){
        // handling submit artefact is done globally in popup-click event
        // Here only required objects are prepared
        Kenseo.scope = this;
    },
    handleToggleAllAnnotations: function(e){
        this.$el.find('.comment-container').toggle();
    },
    handleShareArtefact: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this,
            beforeRender: function(){
                Kenseo.popup.info.projectComboboxValueChanged = false;
            }
        });
    },
    handleReplaceArtefact: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this
        });
    },
    handleAddVersion: function(e){
        // @TODO: This code is already available in Artefacts.js. Look for a way to reuse the same code here
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this
        });
    },
    editArtefactInfo: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this
        });
    },
    handleSliderClick: function(e){
        var _this               = this;
        var el 				    = e.currentTarget;
		var $el 				= $(el);
		var $outerContainer 	= $el.parents('.outerContainer');
		var $sliderContainer 	= getSliderContainer();
		var $viewerContainer 	= $outerContainer.find('#viewerContainer');
		var $annotatorWrapper	= $outerContainer.find('.annotate-wrapper');
		// get the action type
		var actionType 			= _.camelCase($el.data('url'));
		var $existingSlider 	= getExistingSlider();
		var scrollTop 			= 0; // Initializing
        var $currentArtefactBar = $outerContainer.find('.current-artefact-info');
        var duration            = 800;

		toggleSlider();
        
		function toggleSlider(){
			var $currentSlider = getCurrentSlider();
			// if no slider is opened, directly open the existing slider
			if(typeof $currentSlider.data('url') === "undefined"){
				renderSlider();
				showSliderContainer();
                $currentArtefactBar.css('left', $existingSlider.outerWidth() + 80);
			} 
			// if the existing slider is already opened, hide it
			else if($currentSlider.data('url') === $existingSlider.data('url')){
				hideSliderContainer();
                setTimeout(function() {
				    hideAllSliders();
                }, duration);
                $currentArtefactBar.css('left', 0);
			}
			// if other slider is opened, hide the current slider and show the existing slider
			else{
                // wait for the closing transition to finish, before running the opening transition
                hideSliderContainer();
                setTimeout(function() {
                    hideAllSliders();
                    renderSlider();  // ajax call
                    showSliderContainer();
                    $currentArtefactBar.css('left', $existingSlider.outerWidth() + 80);
                }, duration);
                $currentArtefactBar.css('left', 0);
			}
		}

		function checkAvailability($elem){
			return $elem.length?$elem:$(null);
		}
		function getCurrentSlider(){
			return checkAvailability($sliderContainer.find('.sliders').filter(':visible'));
		}
		function getSliderContainer(){
			return $outerContainer.find('.slider-container');
		}
		function getExistingSlider(){
			return checkAvailability($sliderContainer.find('.sliders[data-url=' + actionType + ']'));
		}
		function hideSliderContainer(){
			deActivateCurrentButton();
			$sliderContainer.css({
				'width'		: '0',
				'min-width'	: '0'
			});

			scrollTop = $annotatorWrapper.scrollTop();
			// enable scroll of annotate wrapper
			toggleDocumentView('');
		}
		function showSliderContainer(){
			activateCurrentButton();
			$sliderContainer.css({
				'min-width': $existingSlider.outerWidth() + 80
			});
			scrollTop = $viewerContainer.scrollTop();
			// Disable scroll of the document view
			toggleDocumentView('hidden');
		}
		function hideAllSliders(){
			$outerContainer.find('.sliders').css({'display': 'none'});
		}
		function renderSlider(){
			if(!$existingSlider.length){
				// if the existing slider isn't rendered, render it
				sb.navigate('slider', el);
                if(actionType === "commentSummary"){
                    // preparing global data which is useful to render backbone view
                    var data = _this.model.toJSON();
                    Kenseo._globalData_ = {
                        currentArtefactId: data['artefact_ver_id'],
                        documentViewScope: _this
                    }
                }
				// update existing slider variable
				$existingSlider = getExistingSlider();
			}

			$existingSlider.css({'display': 'block'});
		}

		function activateCurrentButton(){
			// make sure other slider click buttons are deactivated
			$outerContainer.find('.slider-click').removeClass('active');
			// Activate button 
			$el.addClass('active');
		}

		function deActivateCurrentButton(){
			// deactivate button 
			$el.removeClass('active');
		}

		function toggleDocumentView(str){
			$annotatorWrapper.css({
				'overflow': str
			}).scrollTop(scrollTop);
			$viewerContainer.css({
				'overflow': str
			}).scrollTop(scrollTop);
		}
    },
    handleGlobalPrivateMessage: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this
        });
    },
    handleToggleAnnotations: function(e){
        var $self = $(e.currentTarget);
        var $outerContainer = $self.parents('.outerContainer');
        if($self.hasClass('active')){
            $outerContainer.find('.shape').addClass('hide-comment-section');
        }
        else{
            $outerContainer.find('.shape').removeClass('hide-comment-section');	
        }
    },
    handleDocumentLayerClick: function(e){
        var $self = $(e.currentTarget);
        var $outerContainer = $self.parents('.outerContainer');
        var $annotateIcon = $outerContainer.find('.dvt-item.add-comment-icon');
        // Do annotate if the annotate icon is active
        if($annotateIcon.hasClass('active')){
            this.annotate(e);
        }
    },
    // stickToBottom: function (parent) {
    //     var bar = parent.querySelector('.bar');
    //     var top = bar.offsetTop;
    //     parent.addEventListener('scroll', function (e) {
    //         var el = e.currentTarget;
    //         bar.style.bottom = -el.scrollTop + "px";
    //         bar.style.left = el.scrollLeft + "px";
    //     });
    // },
    closeTab: function(ele){
      var $el = ele.parents('.each-tab');
      //get the current tab item
      var rel = $el.find('.tab-item').attr('targetRel');
      $('.outerContainer[rel="pdf_' + rel + '"]').remove();
      $el.remove();
    },
    annotate: function(e){
        var $target = $(e.target);
        if(sb.hasInheritClass($target, ['comment-container', 'current-artefact-info'])){
            // bringToFront();
            var $currentCommentContainer = $target.hasClass('comment-container')? $target: $target.parents('.comment-container');
            annotator.bringCommentToFront($currentCommentContainer);
            return;
        }
        var $el = $(e.currentTarget);

        var threadModel = new Kenseo.models.Thread({
            isNewComment: true
        });

        var threadView = new Kenseo.views.Thread({
            "e": e,
            model: threadModel,
            "version_id": annotator.getCurrentVersionId($el),
            templateName: 'comment',
            documentViewScope: this
        });

        this.threads.push(threadView);  // storing new view in record

        // add the model to collection
        this.threadsCollection.add(threadModel);

        $el.append(threadView.render().$el);
    },
    paintExistingAnnotations: function(currentContainerVersionID){
        // Removing all the already painted comment sections
        $('.comment-container.isStoredLocally').remove();
        // Get the current container
        // -- For now, assume the current container as "158"
        // var currentContainerVersionID = 3;
        var currentVersionIdData = sb.getCurrentDocumentData(currentContainerVersionID);
        if(currentVersionIdData && currentVersionIdData.noChangesDetected){
            // if data is present and not changed, don't call for ajax.. use the existing data
            // insertCommentWrapper(currentContainerVersionID, currentVersionIdData);
            // var threadsView = new Kenseo.views.Threads({
            // 	currentArtefactId: currentContainerVersionID,
            // 	model: new Kenseo.models.Threads(currentVersionIdData)
            // });

            this.threadsCollection = new Kenseo.collections.Threads(_.values(currentVersionIdData));

            var threadsView = new Kenseo.views.Threads({
                currentArtefactId: currentContainerVersionID,
                collection: this.threadsCollection,
                documentViewScope: this,
                templateName: 'comment',
            });

            threadsView.render();
        }
        else{
            // get the calling url from paintPdf function
            sb.ajaxCall({
                url: sb.getRelativePath('getArtefactDetails'),
                // flag to say not to store the response data in Kenseo.data global variable
                excludeDump: true,
                data: {
                    artefactVersionId: Kenseo.data.artefact.id,
                    withVersions: true,
                    withComments: true
                },
                success: function(response){
                    var data = response.data;
                    // Store the current artefact version related data in a global variable
                    var threads = data.threads;
                    // flag
                    threads.noChangesDetected = true;
                    sb.setCurrentDocumentData(data.artefactId, threads);


                    insertCommentWrapper(currentArtefactId, data);
                }
            });
            // -- end of ajax call
        }
    }
});

Kenseo.models.DocumentView = Backbone.Model.extend({
    defaults: {

    }
});
