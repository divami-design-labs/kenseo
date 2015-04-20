Kenseo.popups = (function(){
	var popups = {
	    "add-artefact": [
	        {
	            "page_name": "artefact-one",
	            "title": "Add Artefact",
	            "callbackfunc": function(){
	            	sb.loadFiles({
		                'models': ['Projects'],
		                'collections': ['Projects']
		            }, function(){
		            	var userid = Kenseo.cookie.userid;
		            	sb.renderTemplate('dropdown', $('.dropdown'), new Kenseo.collections.Projects(), function(){
		                    Kenseo.popup['project_name'] = $('.dropdown').val();
		                }, {userid: userid});
		                
		                $('.dropdown').on('change', function(){
		                    if(this.selectedIndex){
		                        Kenseo.popup['project_name'] = this.value;                        
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
	            "callbackfunc": function(){
	        		$('.upload-files-input').change(function(){
	        			$('.files-list').html(this.value);
	        		});

	        		sb.loadFiles({
	        			'collections': ['Artefacts'],
	        			'models': ['Artefacts']
	        		},function(){
	        			sb.renderTemplate('dropdown', $('.existing-files-dropdown'), new Kenseo.collections.Artefacts(), null, { userid: 3, projectid: 2, sharepermission: true});
	        			$('.dropdown').on('change', function(){
		                    if(this.selectedIndex){
		                        Kenseo.popup['project_name'] = this.value;                        
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
	            "page_name": "artefact-three"
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