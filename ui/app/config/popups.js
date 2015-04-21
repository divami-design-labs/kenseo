Kenseo.popups = (function(){
	var popups = {
	    "add-artefact": [
	        {
	            "page_name": "artefact-one",
	            "title": "Add Artefact",
	            "buttons": [{
	            	"label": "Cancel",
	            	"cls": "lnk-btn"
	            },
	            {
	            	"label": "Proceed",
	            	"cls": "main-btn",
	            	"disabled": true
	            }],
	            "callbackfunc": function(){
	            	sb.loadFiles({
		                'models': ['Projects'],
		                'collections': ['Projects']
		            }, function(){
		            	var userid = Kenseo.cookie.userid();
		            	sb.renderTemplate('dropdown', $('.dropdown'), new Kenseo.collections.Projects(), function(){
		                    Kenseo.popup['project_name'] = $('.dropdown').val();
		                }, {userid: userid});
		                
		                $('.dropdown').on('change', function(){
		                    if(this.selectedIndex){
		                        Kenseo.popup['project_name'] = this.value;
		                        Kenseo.popup['project_id'] = this.selectedOptions[0].getAttribute('name');                     
		                        $('.main-btn').prop('disabled', false);
		                    }
		                    else{
		                        $('.main-btn').prop('disabled', true);
		                    }
		                });
		            });
	            }
	        },
	        {
	            "page_name": "artefact-two",
	            "title": "Add Artefact",
	            "show_coming_soon": true,
	            "buttons": [{
	            	"label": "Back",
	            	"cls": "lnk-btn"
	            },{
	            	"label": "Cancel",
	            	"cls": "lnk-btn"
	            },
	            {
	            	"label": "Proceed",
	            	"cls": "main-btn",
	            	"disabled": true
	            }],
	            "callbackfunc": function(){
	        		$('.upload-files-input').change(function(){
	        			$('.files-list').html(this.value);

	        			Kenseo.popup.fileName = this.value;
	        			$('.main-btn').prop('disabled', false);
	        		});

	        		sb.loadFiles({
	        			'collections': ['Artefacts'],
	        			'models': ['Artefacts']
	        		},function(){
	        			sb.renderTemplate('dropdown', $('.existing-files-dropdown'), new Kenseo.collections.Artefacts(), null, { userid: 3, projectid:Kenseo.popup['project_id'], sharepermission: true});
	        			$('.dropdown').on('change', function(){
		                    if(this.selectedIndex){
		                        $('.main-btn').prop('disabled', false);
		                    }
		                    else{
		                        $('.main-btn').prop('disabled', true);
		                    }
		                });

		                $('.existing-files-chk').change(function(){
		                	$('.existing-files-dropdown').prop('disabled', !this.checked);
		                });
	        		});
	            }
	        },
	        {
	            "page_name": "artefact-three",
	            "buttons": [{
	            	"label": "Cancel",
	            	"cls": "lnk-btn"
	            },
	            {
	            	"label": "Done",
	            	"cls": "main-btn",
	            	"disabled": true
	            }],
	            "callbackfunc": function(){
	            	sb.loadFiles({
	            		'collections': ['References', 'Tags'],
	            		'models': ['Artefacts']
	            	}, function(){
	            		sb.ajaxCall(
    						{ 
    							'collection': new Kenseo.collections.References(),
    							'data': {userid: Kenseo.cookie.userid(), ignore: 0, projectid: Kenseo.popup.project_id},
    							'success': function(response){
    								var objResponse = JSON.parse(response);
				            		$('.reference-files-text').on('keyup', function(){
				            			var self = this;
				            			var filteredData = _.filter(objResponse.data, function(item){
				            				if(self.value.length){
					            				var re = new RegExp("^" + self.value, "i");
					            				return re.test(item.name);
					            			}
					            			else{
					            				return false;
					            			}
				            			});
				            			sb.renderTemplateOff('reference-items', $(this).parent().next('.reference-files-holder'), {data: filteredData});
				            		});
    							}
    						}
						);
	            	});
	            }
	        }
	    ],
	    "share-artefact": [
	        {
	            "page_name": "artefact-one",
	            "title": "Share Artefact",
	        },
	        {
	        	"page_name": "artefact-two",
	            "title": "Share Artefact",
	            "show_coming_soon": false	
	        },
	        {
	            "page_name": "artefact-three",
	        },
	        {
	        	"page_name": "artefact-four"
	        }
	    ]
	};

	return {
		getPopupsInfo: function(val){
			return popups[val];
		}
	}
})();