// Thread = Bunch of comments
// Comment = A comment in a thread
Kenseo.views.Threads = Backbone.View.extend({
    // This view holds all the threads related to a document (artefact)
    initialize: function(payload){
        this.payload = payload;
        return this;
    },
    render: function(){
        var _this   = this;
        var payload = _this.payload;
        // var data    = _this.model.toJSON();
        var templateName = this.payload.templateName;
        var currentArtefactId   = payload.currentArtefactId;
        var $pdfDocContainer    = annotator.getDocContainer(currentArtefactId);

        if(!$pdfDocContainer.length){
        	sb.log("pdfDocContainer is missing");
        	return;
        }
        var $textLayers = $pdfDocContainer.find('.page');
        if(!$textLayers.length){
        	sb.log("textLayers are missing");
        	return;
    	}
    	// if(!data){
    	// 	// Artefact has no data
    	// 	sb.log("artefact has no data");
    	// 	return;
    	// }

        _this.collection.each(function(model, modelId, models){
            var d = model.toJSON();
            // Initializing
            var $el = null;
            //var templateName = null;
            if(payload.isCommentViewers){
                $el = $pdfDocContainer.find('.comments-view-holder .cv-comments-section');
                //templateName = "comment";
            }
            else{
                $el = $textLayers.eq(+d.page_no-1).find('.new-textlayer');
                //templateName = "comment";
            }
            if($el.length){
                var threadView = new Kenseo.views.Thread({
                    "$el": $el,
                    parentScope: _this,
                    "model": model,
                    "thread_id": d['comment_thread_id'],
                    "version_id": currentArtefactId,
                    templateName: templateName
                });

                $el.append(threadView.render().$el);
                // @TODO: Insert the above created thread view in document
            }
        });
    }
});

Kenseo.views.Thread = Backbone.View.extend({
    tagName: 'div',
    className: 'comment-container',
    template: function(data){
        return sb.setTemplate(this.payload.templateName, {data: data});
    },
    initialize: function(payload){
        this.payload = payload;
        return this;
    },
    render: function(){
        var _this = this;
        var payload = _this.payload;
        var templateName = this.payload.templateName;
        // Sometimes the current wrapper's jquery element is provided or we need to extract from passed event variable 'e'
		var $el = payload.$el || $(payload.e.currentTarget);
        // payload.model will be available when already entered comments are being rendered
        var data = payload.model? 
                    payload.model.toJSON(): // existing comment
                    {'newComment': true};   // assuming to be new comment

        var $commentContainer = _this.$el; //$(document.createElement('div'));
        $commentContainer.addClass('comment-container');
        // Adding the comment section template (should be done before applying styles to move the section)
        var threadElement = document.createDocumentFragment();
        threadElement.appendChild(sb.fragmentFromString(sb.setTemplate(templateName, {data: data})));
        var commentsSection = threadElement.querySelector('.comment-sec-wrapper');

        var commentsView = new Kenseo.views.Comments({
            collection: new Kenseo.collections.Comment(
                _.values(data.comments)   // converting object to an array
            )
        });

        commentsView.render();

        commentsSection.appendChild(commentsView.el);

        $commentContainer.children().remove();
        $commentContainer.get(0).appendChild(threadElement);

        if(data.isNewComment){
			// Deleting the previous comment section which wasn't saved
			if(annotator.$previousCommentSection){
				// If the previous comment section isn't saved then remove it
				if(!annotator.$previousCommentSection.hasClass('isSaved')){
					annotator.$previousCommentSection.remove();
				}
			}

            var e = payload.e;
            var posx = ($el.scrollLeft() + e.pageX - $el.offset().left)/($el.outerWidth())  * 100;
            var posy = ($el.scrollTop()  + e.pageY - $el.offset().top )/($el.outerHeight()) * 100;
            $commentContainer.css({
                left: posx + "%",
                top:  posy + "%"
            });


			// Bring the new comment to front
			annotator.bringCommentToFront($commentContainer);
			// Adding a dummy comment id to newly added comment for further manipulations
			$commentContainer.attr('data-k-comment_thread_id', "-1");

			// get current page number
			var $currentPage     = $el.parents('.page');
			var currentPageIndex = $currentPage.index() + 1;
			// console.log(currentPageIndex);
			// Add this new comments data inside the stored data
			var currentVersionId = annotator.getCurrentVersionId($el);
			var data = sb.getCurrentDocumentData(currentVersionId);
			sb.setCurrentThreadData(currentVersionId, '-1',  {
				posx: posx,
				posy: posy,
				page_no: currentPageIndex,
				// making flag dontHide as true. So that when page is rendered, the comment section should not hide surprisingly
				dontHide: true
			});
			// Kenseo.document[]
		    
		    // attach page_no
		    $commentContainer.attr('data-k-page_no', currentPageIndex);
		    $commentContainer.attr('data-k-posx', posx);
		    $commentContainer.attr('data-k-posy', posy);
        }
        else{
        	// Existing comment manipulations
        	$commentContainer.attr('data-k-comment_thread_id', payload['thread_id']);
	        $commentContainer.css({
	            left: data.posx + "%",
	            top:  data.posy + "%",
	        });
            // Keeping the comment section hidden if the flag "dontHide" is false
            if(!data.dontHide){
	            $commentContainer.children('.shape').addClass('hide-comment-section');
	        }

	        // Add "isSaved" class as a flag to the comment section
	        // This flag will be used to identify whether the comment section is saved or not
	        $commentContainer.addClass('isSaved');

	        // Kenseo.document[]

	        // attach page_no
		    $commentContainer.attr('data-k-page_no', data.page_no);
		    $commentContainer.attr('data-k-posx', data.posx);
		    $commentContainer.attr('data-k-posy', data.posy);
	    }
	    // attach version id
	    $commentContainer.attr('data-k-artefact_ver_id', payload['version_id']);
	    // set flag to say that the content of this comment
	    $commentContainer.addClass('isStoredLocally');
        // $commentContainer.append($shape);
        // $el.append($commentContainer);

        // After inserting the comment on the document, the current comment section will become previous comment section
        annotator.$previousCommentSection = $commentContainer;

        return _this;
    },
    events: {
        "click .drpdwn-item":       "handleDropdownItemClick",
        "click .cancel-btn":        "handleThreadCancel",
        "click .shape":             "handleToggleShape",
        'click .main-btn':          "handlePostThread",
        'change .private-chk':      "handleTogglePrivate",
        "keyup .write-comment":     "handleWriteComment",
        "click .comment-section":   "handleBringToFront",
        "click":                    "handleNormalize"
    },
    handleNormalize: function(e){
        var $target = $(e.target);
        if(!$target.hasClass('cv-comment-detail')){
            this.$el.find('.cv-comment-detail').prop('contenteditable', false);
        }
    },
    handleBringToFront: function(e){
        annotator.bringCommentToFront(this.$el);
    },
    handleWriteComment: function(e){
        // write comment event attachment
        // - Temporary fix: The main aim of this function is to run validation on whether to enable the post button or not
        // - Currently, there is already a function which does this i.e commentValidations
        // - In future, when edit and delete functionality is included, improve this function or try to make it similar to other change events.
        var el = e.currentTarget;
        var $self = $(el);
        var value = el.value;
        var $currentCommentSection = $self.parents('.comment-container');
        var $postBtn = $currentCommentSection.find('.main-btn');
        
        if($.trim(value).length){
            $postBtn.removeAttr('disabled');
        }
        else{
            commentValidations($self);
        }
    },
    // private message checkbox event
	handleTogglePrivate: function(e){
        var el = e.currentTarget;
        var $self = $(el);
        if(el.checked){
            $self.attr('data-k-is_private','1');
        }
        else{
            $self.attr('data-k-is_private','0');	
        }
        // Do validations
        annotator.commentValidations($self);
    },

    handlePostThread: function(e){
        var _this = this;
        var $self = $(e.currentTarget);
        var $commentSection = $self.parents('.comment-container');
        var versionId = $commentSection.attr('data-k-artefact_ver_id');
        var threadId = $commentSection.attr('data-k-comment_thread_id');

        var newData = sb.getCommentThreadDumpObject($commentSection);

        this.model.set(newData);

        sb.ajaxCall({
            url: sb.getRelativePath('createComment'),
            data: newData,
            container: _this.$el.find('.comment-section'),
            excludeDump: true,
            type: 'POST',
            plainData: true,
            //contentType: 'application/json',
            //dataType: 'json',
            success: function(response){
                var data = response.data || {};
                var params = response.params;
                // new comment thread id and old comment thread id will differ when the comment is being saved for the first time
                var newCommentThreadId = Object.keys(data)[0];
                var oldCommentThreadId = params.comment_thread_id;
                sb.setCurrentThreadData(params.artefact_ver_id, newCommentThreadId, data[newCommentThreadId]);

                // re-render the thread section
                // Deleting the old comment thread id section
                var $pdfDocContainer = annotator.getDocContainer(params.artefact_ver_id);
                var $commentSection = $('[data-k-comment_thread_id="' + oldCommentThreadId + '"].comment-container');
                // $commentSection.hide();

                // Dont hide flag
                data[newCommentThreadId].dontHide = false;
                _this.model.set(data[newCommentThreadId]);
                // Make sure that the newly rendering thread section is not a new one
                _this.model.set({'isNewComment': false});
                _this.render();
                // insertCommentWrapper(params.artefact_ver_id, data);
                // var threadsView = new Kenseo.views.Threads({
                //     currentArtefactId: params.artefact_ver_id,
                //     model: new Kenseo.models.Threads(data)
                // });

                // threadsView.render();
            }
        });
    },
    handleToggleShape: function(e){
        var $self = $(e.currentTarget);
        var $commentContainer = $self.parents('.comment-container');
        var versionId = $commentContainer.attr('data-k-artefact_ver_id');
        var threadId = $commentContainer.attr('data-k-comment_thread_id');
        var threadData = Kenseo.document[versionId][threadId];
        threadData.dontHide = $self.hasClass('hide-comment-section');
        $self.toggleClass('hide-comment-section');
        annotator.bringCommentToFront($commentContainer);
    },
    handleThreadCancel: function(e){
        var _this = this;
        var $commentContainer = $(e.currentTarget).parents('.comment-container');
        if($commentContainer.hasClass('isSaved')){
            // if the comment is already saved, then just hide it
            $commentContainer.children('.shape').addClass('hide-comment-section');
        }
        else{  // newly added comment
            var versionId = $commentContainer.attr('data-k-artefact_ver_id');;
            var threadId = $commentContainer.attr('data-k-comment_thread_id');
            // Remove the comment container completely if the comment is not yet saved
            $commentContainer.remove();
            // Remove also from local object
            sb.setCurrentThreadData(versionId, threadId, null);
            _this.model.collection.remove(_this.model);
            console.dir(_this.model.collection);
        }
    },
    handleDropdownItemClick: function(e){
        var $self = $(e.currentTarget);
        var $selectedText = $self.parents('.drpdwn').find('.drpdwn-selected-text');
        var value = $self.attr('data-value');
        if($selectedText.length){
            // normal dropdown functionality
            $selectedText.html($self.text());

            var $dropdown = $self.parents('.drpdwn');
        }
        else{
            // severity check dropdown functionality
            var colorCode = $self.data('value');
            // var $shape = $self.parents('.comment-container').find('.shape');
            // $shape.attr('data-k-color', colorCode);
            var $dropdown = $self.parents('.drpdwn').prev();
        }
        var dataType = $dropdown.attr('data-type');
        $dropdown.attr('data-k-' + dataType, value);
        annotator.commentValidations($self);
    }
});

Kenseo.models.Thread = Backbone.Model.extend({
    defaults: {

    }
});

Kenseo.collections.Threads = Backbone.Collection.extend({
    model: Kenseo.models.Thread
});