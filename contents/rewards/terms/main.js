//page loaded -- go!
jQuery(document).ready(function(){
		
	//ini	
	var clicked = jQuery('.drop-down');
		
	//toggle	
	clicked.on('click', function(){
			
		//find current li > ul
		jQuery(this).find('ul').toggle(250, function(){
				
			//ini	
			var icon = jQuery(this).parent().find('i'),
				flag = icon.hasClass('point-down');
					
			//add class
			if(flag){
				icon.removeClass('point-down');
			}else{
				icon.addClass('point-down');
			}
				
		});		
		
	});
		
});