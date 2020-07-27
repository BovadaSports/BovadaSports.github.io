(function($){
	dom = {
			
		//ini
		ini:{
			stat:['initializing table'],
			sel:undefined,
			table:undefined,
			pos:[],	
			current_pos:0,	
			total_w:undefined,
			w:undefined,
			menu:undefined,
			speed:500,
			sticky_fix:false,
			d_reset:false,
			debug:true
		},		
			
		//setup msg box
		msg_box:function(txt){
				
			//check if msg is up already
			var msg_check = jQuery('.rlp-msg').length;
				
			//no msg box up yet	
			if(msg_check == 0){
					
				//setup msg box
				var box = "<div class='rlp-msg'>"+ txt +"</div>";	
				jQuery(dom.ini.sel).parent().append(box);				
					
			}else{
					
				//place copy
				jQuery('.rlp-msg').html(txt)
					
			}
				
			//now animate
			dom.msg_animated(txt);
				
		},	
			
		//animate msg
		msg_animated:function(txt){
				
			//check if we have msg box
			var msg_count = jQuery('.rlp-msg').length;
				
			//animate 
			if(msg_count > 0){
					
				//animate it
				jQuery('.rlp-msg').fadeIn(0, function(){

					//add dot
					jQuery(this).html(txt + ".");
					
					//animate it
					jQuery('.rlp-msg').delay(250).fadeIn(0, function(){

						//add dot
						jQuery(this).html(txt + "..");
						
						//animate it
						jQuery('.rlp-msg').delay(250).fadeIn(0, function(){

							//add dot
							jQuery(this).html(txt + "...");
							
							
							jQuery('.rlp-msg').delay(250).fadeIn(0, function(){
									dom.msg_animated(txt);
							});
						
						});
						
					
					});
					
				
				});
					
			}
				
		},
			
		//make buttons work
		ui:function(){
				
			//ini
			var menu_btn_length = jQuery('.rpl-btn').length,
				mobile_btn_length = jQuery('.mobile_btn').length,
				desktop_nav = jQuery('.rlp-nav-btn').length,
				mobile_badge = jQuery('.rlp-mobile-nav'),
				total_cols = (dom.ini.pos.length - 2),
				d_clicked = false,
				clicked = false;
					
			//init dot position
			jQuery('.rlp-dots li').removeClass('current_dots');
			jQuery('.rlp-dots li').eq(dom.ini.current_pos).addClass('current_dots');	
				
			// ---------------------------------------------- //
			//DESKTOP BTNS ---------------------------------- //
			// ---------------------------------------------- //
			if(desktop_nav >= 0){
					
				//go left	
				jQuery('.rlp-nav-left').on('click', function(){
						
					//check switch
					if(d_clicked == false){
							
						//set off switch
						d_clicked = true;
							
						//position	
						dom.ini.current_pos = (dom.ini.current_pos <= 0) ? 0 : --dom.ini.current_pos;
							
						//setup x	
						var desktop_x = jQuery(dom.ini.table).find('.rlp-stage-li').eq(dom.ini.current_pos).position().left * -1;	
							
						//move stage left	
						jQuery(dom.ini.table).find('.rlp-stage').stop(true, true).animate({
							'left':desktop_x
						}, dom.ini.speed, function(){
								
							//set switch
							d_clicked = false;
								
						});	
							
						//debug	
						if(dom.ini.debug === true){
							console.log('clicked desktop button left...');
						};
							
					}	
						
				});
					
				//go right
				jQuery('.rlp-nav-right').on('click', function(){
						
					//check switch
					if(d_clicked == false){
							
						//set off switch
						d_clicked = true;	
						
						//ini	
						var parent_w = jQuery(dom.ini.table).parent().outerWidth(),
							click_stage = jQuery(dom.ini.table).find('.rlp-stage'),
							nav_w = jQuery(dom.ini.sel).find('.rlp-left-col').outerWidth(),
							allowed_w = (parent_w - nav_w),
							temp_position = (dom.ini.current_pos + 1),
							click_col_w = jQuery(dom.ini.table).find('.rlp-stage-li').outerWidth(),
							temp_w = (((dom.ini.pos.length) - temp_position) * click_col_w),
							desktop_x;
							
							//position		
							dom.ini.current_pos = (dom.ini.current_pos < total_cols) ? ++dom.ini.current_pos : total_cols;	
								
							//check if we can keep going right
							if(allowed_w <= (temp_w - click_col_w)){
									
								//setup x	
								desktop_x = jQuery(dom.ini.table).find('.rlp-stage-li').eq(dom.ini.current_pos).position().left * -1;	
									
								//move stage left	
								click_stage.stop(true, true).animate({
									'left':desktop_x
								}, dom.ini.speed, function(){
										
									//set switch
									d_clicked = false;
										
								});
									
							//snap to last item
							}else{
									
								//ini	
								var go_to_end = ((click_stage.width() + click_stage.position().left) - allowed_w);
									
								//position stage
								click_stage.stop(true, true).animate({
									'left':'-=' + go_to_end
								}, dom.ini.speed, function(){
										
									//fix gap issue
									dom.ini.current_pos--;		
										
									//set switch
									d_clicked = false;
										
								});
									
							}
								
						//debug	
						if(dom.ini.debug === true){
							console.log('clicked desktop button right...');
						};
							
					}	
						
				});	
					
				//desktop btns	hover over effect
				jQuery(dom.ini.table + ", .rlp-nav-btn").mouseenter(function(){
					jQuery('.rlp-nav-btn').fadeIn(0);	
				}).mouseleave(function() {
					jQuery('.rlp-nav-btn').fadeOut(0);	
				});
					
			}		
				
			// ---------------------------------------------- //
			//MOBILE BTNS ----------------------------------- //
			// ---------------------------------------------- //
			if(menu_btn_length >= 0){
					
				//dot click
				jQuery('.rlp-dots li').on('click', function(){
						
					//check switch
					if(clicked == false){
							
						//set off switch
						clicked = true;						
							
						//click index
						var this_index = jQuery(this).index(),
							current_x = jQuery(dom.ini.table).find('.rlp-stage-li').eq(this_index).position().left * -1,
							current_badge_x = mobile_badge.children('li').eq(this_index).position().left * -1;
								
						//update current position	
						dom.ini.current_pos = this_index;
							
						//MOBILE badge
						mobile_badge.stop(true, true).animate({
							'left':current_badge_x
						}, dom.ini.speed);
							
						//STAGE: go to col spot
						jQuery(dom.ini.table).find('.rlp-stage').stop(true, true).animate({
							'left':current_x
						}, dom.ini.speed, function(){
								
							//update nav buttons
							jQuery('.rlp-dots li').removeClass('current_dots');
							jQuery('.rlp-dots li').eq(dom.ini.current_pos).addClass('current_dots');							
								
							//switch	
							clicked = false;
								
						});	
							
						//debug	
						if(dom.ini.debug === true){
							console.log('clicked dot button...');
						};						
							
					}	
						
				});
					
				//go left
				jQuery('.rlp-mobile-nav-right').on('click', function(){
						
					//check switch
					if(clicked == false){
							
						//set off switch
						clicked = true;	
							
						//increment current position and set limit
						dom.ini.current_pos = (dom.ini.current_pos < total_cols) ? ++dom.ini.current_pos : total_cols;
							
						//calulate position
						var current_x = jQuery(dom.ini.table).find('.rlp-stage-li').eq(dom.ini.current_pos).position().left * -1,
							current_badge_x = mobile_badge.children('li').eq(dom.ini.current_pos).position().left * -1;
								
						//MOBILE badge
						mobile_badge.stop(true, true).animate({
							'left':current_badge_x
						}, dom.ini.speed);					
							
						//go to col spot
						jQuery(dom.ini.table).find('.rlp-stage').stop(true, true).animate({
							'left':current_x
						}, dom.ini.speed, function(){
								
							//update nav buttons
							jQuery('.rlp-dots li').removeClass('current_dots');
							jQuery('.rlp-dots li').eq(dom.ini.current_pos).addClass('current_dots');							
								
							//switch	
							clicked = false;
								
						});
							
						//debug	
						if(dom.ini.debug === true){
							console.log('clicked mobile button right...');
						};
							
					}	
						
				});
					
				//go right
				jQuery('.rlp-mobile-nav-left').on('click', function(){						
						
					//check switch
					if(clicked == false){
							
						//set off switch
						clicked = true;								
							
						//increment current position and set limit
						dom.ini.current_pos = (dom.ini.current_pos <= 0) ? 0 : --dom.ini.current_pos;					
							
						//calulate position
						var current_x = jQuery(dom.ini.table).find('.rlp-stage-li').eq(dom.ini.current_pos).position().left * -1,
							current_badge_x = mobile_badge.children('li').eq(dom.ini.current_pos).position().left * -1;
								
						//MOBILE badge
						mobile_badge.stop(true, true).animate({
							'left':current_badge_x
						}, dom.ini.speed);						
							
						//go to col spot
						jQuery(dom.ini.table).find('.rlp-stage').stop(true, true).animate({
							'left':current_x
						}, dom.ini.speed, function(){
								
							//update nav buttons
							jQuery('.rlp-dots li').removeClass('current_dots');
							jQuery('.rlp-dots li').eq(dom.ini.current_pos).addClass('current_dots');
								
							//switch	
							clicked = false;	
								
						});
							
						//debug	
						if(dom.ini.debug === true){
							console.log('clicked mobile button left...');
						};						
							
					}	
						
				});
					
			}
				
		},
			
		//find closest num
		snap:function(num){
				
			//ini
			var sizes = dom.ini.pos,
				size_len = sizes.length,
				output = Math.max.apply(null, sizes),
				i = 0;
					
			//loop thru
			for(i; i < size_len; i++){
				if((sizes[i] > num)&&(sizes[i] < output)){
					output = sizes[i];
				}
			}
				
			//return
			return output;
				
		},
			
		//reset/update cols and stage
		update:function(num){
				
			//update stage
			jQuery(dom.ini.table).find('.rlp-stage').css({
				'left':((dom.ini.current_pos * num) * -1),
				'width':(num * (dom.ini.pos.length - 1))
			});
				
			//update col width
			jQuery(dom.ini.table).find('.rlp-stage-li').css({
				'width':num
			});		
				
		},
			
		//process everything
		engine:function(){
				
			//ini
			var set_w = dom.ini.w,
				set_len = dom.ini.pos.length,
				set_last = (dom.ini.pos[set_len - 1]);
				
			//grab window size -- offset left nav
			var parent_w = jQuery(dom.ini.table).parent().outerWidth(),
				nav_w = jQuery(dom.ini.sel).find('.rlp-left-col').outerWidth(),
				allowed_w = (parent_w - nav_w);
					
			//if window size is smaller than limit then resiZe	
			if(allowed_w <= set_last){
					
				//setup snap value	
				var snap_to = dom.snap(allowed_w);
					
				//DESKTOP
				//we want to prevent everything from disappearing
				if(snap_to > (dom.ini.pos[1] * 2)){
						
					//reset desktop col reset
					if(dom.ini.d_reset == false){
							
						//fire off once
						dom.ini.d_reset = true;	
							
						//update/reset col stage
						dom.update(set_w);
							
					};					
						
					//remove added classes
					jQuery(dom.ini.sel).find('.rlp-table').removeClass('rlp-table-mobile');
					jQuery(dom.ini.sel).find('.rlp-left-col').removeClass('rlp-left-col-mobile');
					
					//remove mobile menu if its there
					jQuery(dom.ini.sel).find('.rlp-mobile-nav-wrapper').hide();						
						
					//ini
					var col_sel = jQuery(dom.ini.table).find('.rlp-stage-li'),
						present_pos = dom.ini.current_pos,
						local_limit = (set_last - (present_pos * set_w)),
						next_limit = ((local_limit + set_w) <= set_last) ? (local_limit + set_w) : set_last;
							
					//if we exceed the last col and have
					//a bunch of dead space do something	
					if(allowed_w > local_limit){
							
						//stretching until we cant
						if((allowed_w > local_limit) && (allowed_w < next_limit)){
								
							//calculate offset	
							var offset = (allowed_w - local_limit),
								adjust_col_w = (offset/((set_len - 1) - present_pos)),
								final_diff = (dom.ini.pos[1] + adjust_col_w);
								
							//add class for stretching
							col_sel.addClass('rlp-table-stretch');
								
							//manually update columns with off set
							col_sel.css({
								'width':final_diff
							});
								
							//manually update stage width and location -- [fix flicker in IE by adding + 1 to width]
							jQuery(dom.ini.table).find('.rlp-stage').css({
								'left':((present_pos * final_diff) * -1),
								'width':(final_diff * (set_len - 1)) + 1 
							});
								
							//debug	
							if(dom.ini.debug === true){
								console.log('Desktop should be resizing into empty space...???');	
							};
								
						}else{
								
							//remove stretching class
							jQuery(dom.ini.table).removeClass('rlp-table-stretch');
								
							//update position
							dom.ini.current_pos--;								
								
							//update/reset col stage
							dom.update(set_w);	
								
							//debug	
							if(dom.ini.debug === true){
								console.log('Desktop snapped to position!!!');	
							};
								
							//sticky fix
							dom.ini.sticky_fix = false;	
								
						}
							
					//micro adjust to snap end to 
					//left most available space
					}else{
						

						//QUICK FIX
						//update/reset col stage
						//dom.update(set_w);
						
					}
						
					//SHOW DESKTOP NAV BUTTONS
					if(allowed_w < set_last){
							
						//show desktop menu
						jQuery('.rlp-nav-btn-wrapper').show();
							
					//HIDE DESKTOP NAV BUTTONS	
					}else{
							
						//hide desktop menu
						jQuery('.rlp-nav-btn-wrapper').hide();							
							
					}
						
					//debug	
					if(dom.ini.debug === true){
						console.log('[DESKTOP MODE]');	
					};	
						
				//MOBILE
				}else{
						
					//hide desktop menu
					jQuery('.rlp-nav-btn-wrapper').hide();
						
					//add new size to wrappers
					jQuery(dom.ini.sel).find('.rlp-table').addClass('rlp-table-mobile');
					jQuery(dom.ini.sel).find('.rlp-left-col').addClass('rlp-left-col-mobile');
						
					//show menu
					jQuery(dom.ini.sel).find('.rlp-mobile-nav-wrapper').show();
						
					//calulate badge position
					var this_col = jQuery(dom.ini.table).find('.rlp-stage-li'),
						this_pos = dom.ini.current_pos,
						mobile_badge = jQuery('.rlp-mobile-nav'),
						current_badge_x = mobile_badge.children('li').eq(this_pos).position().left * -1;
							
					//MOBILE badge
					mobile_badge.stop(true, true).animate({
						'left':current_badge_x
					}, dom.ini.speed);						
						
						
					//initial dot position
					jQuery('.rlp-dots li').removeClass('current_dots');
					jQuery('.rlp-dots li').eq(this_pos).addClass('current_dots');						
						
					//update/reset col and stage
					dom.update(parent_w - jQuery(dom.ini.sel).find('.rlp-left-col').outerWidth());
						
					//reset desktop col reset
					dom.ini.d_reset = false;
						
					//debug	
					if(dom.ini.debug === true){
						console.log('[MOBILE MODE]');	
					};
						
				}
					
			}
				
			// ----------------------------------------------- //
			// Sticky fix ------------------------------------ //
			// ----------------------------------------------- //
				if(dom.ini.sticky_fix == false){
						
					//fire off once
					dom.ini.sticky_fix = true;			
						
					//call self to fix sticky issue	
					dom.engine();
					
					//fire off once
					dom.ini.sticky_fix = false;
						
					//debug	
					if(dom.ini.debug === true){
						console.log('refired engine again...');	
					};
						
				}
			// ----------------------------------------------- //
			// ----------------------------------------------- //
			// ----------------------------------------------- //			
				
		},
			
		//execut everything
		exe:function(){
				
			//run the engine
			dom.engine();
				
			//on resize
			jQuery(window).resize(function(){
					
				//run the engine	
				dom.engine();
					
			});
				
			//enable ui
			dom.ui();
				
			//remove status msg
			jQuery('.rlp-msg').fadeOut(369, function(){
				jQuery('.rlp-msg').remove();
			});
				
			//show table now
			jQuery(dom.ini.sel).removeClass('rlp-hide');
				
		},
			
		//table	
		setup:function(opts){
				
			//ini options
			dom.ini.sel = ((opts.main != '')&&(typeof opts.main == 'string')) ? opts.main : '';
			dom.ini.table = ((opts.table != '')&&(typeof opts.table == 'string')) ? opts.table : '';
				
			//setup table
			if((dom.ini.sel != '')&&(dom.ini.table != '')){
					
				//hide entire table	
				jQuery(dom.ini.sel).addClass('rlp-hide');
					
				//starting msg
				dom.msg_box(dom.ini.stat[0]);
					
				// -------------------------------- //
				// setup columns ------------------ //
				// -------------------------------- //
						
					//grab column width
					var col = jQuery(dom.ini.table).find('.rlp-stage-li'),
						len = col.length,
						i = 0;
							
					//set col width globally
					dom.ini.w = col.width();
						
					//loop	
					for(i; i <= len; i++){
							
						//set total width
						dom.ini.total_w = (dom.ini.w * i);
							
						//push positions
						dom.ini.pos.push(dom.ini.total_w);
							
					};
						
				// -------------------------------- //
				// -------------------------------- //
				// -------------------------------- //
					
				// -------------------------------- //
				//setup desktop menu -------------- //
				// -------------------------------- //
						
					//ini
					var table_parent = jQuery(dom.ini.table).parent(),
						desktop_btns = "<div class='rlp-nav-btn-wrapper'>";
							desktop_btns += "<div class='rlp-nav-left rlp-nav-btn'>&nbsp;</div>";
							desktop_btns += "<div class='rlp-nav-right rlp-nav-btn'>&nbsp;</div>";
						desktop_btns += "</div>";
							
					//prepend the menu in place
					table_parent.prepend(desktop_btns);
						
				// -------------------------------- //
				//setup mobile menu --------------- //
				// -------------------------------- //
						
					//setup badge items
					var badge = jQuery('.badge-bg'),
						badge_out = "<div class='rlp-mobile-nav-wrapper'>",
						dots = "<ul class='rlp-dots'>";
							
						//add left btn
						badge_out += "<div class='rlp-mobile-nav-left mobile_btn'>&nbsp;</div>";
							
						//start ul wrapper
						badge_out += "<div class='rlp-mobile-nav-center'>";
								
							//start	ul
							badge_out += "<ul class='rlp-mobile-nav'>";
									
								//loop thru each column	
								badge.each(function(index, item){
										
									//ini	
									var this_badge = jQuery(this);
										
									//setup out
									badge_out += "<li>";
										badge_out += "<ul class='" + this_badge.parent().attr('class') + " rlp-mobile-nav-ul'>";
											badge_out += "<li class='" + this_badge.attr('class') + "'>" + this_badge.html() + "</li>";
										badge_out += "</ul>";
									badge_out +="</li>";
										
									//add to dots
									dots += "<li>&nbsp;</li>";								
										
								});
									
							//end ul
							badge_out += "</ul>";
								
							//end dots
							dots += "</ul>";
								
						//start ul wrapper
						badge_out += "</div>";	
							
						//add right btn	
						badge_out += "<div class='rlp-mobile-nav-right mobile_btn'>&nbsp;</div>";	
							
						//add dots		
						badge_out += "<div class='dots-wrapper'>" + dots + "</div>";
							
						//end div
						badge_out += "</div>";
							
					//add mobile menu
					jQuery(dom.ini.sel).prepend(badge_out);
						
				// -------------------------------- //
				// -------------------------------- //
				// -------------------------------- //
					
				//run exe	
				dom.exe();	
					
				//debug	
				if(dom.ini.debug === true){
					console.log('default stage total width: ' + dom.ini.total_w);
					console.log('default max left [x] positions for all columns: ' + dom.ini.pos);
					console.log('starting default column width: ' + dom.ini.w);
					console.log('current starting position: ' + dom.ini.current_pos);
				}
					
			}
			
		}
			
	}
		
	//return
	return dom;
		
})(jQuery);
jQuery(document).ready(function(){
		
	//run it
	dom.setup({
		main:'.rlp-wrapper',
		table:'.rlp-table-wrapper'
	});
		
});

// ------------------------------------------ //
// ------------------------------------------ //
// ------------------------------------------ //
// ------------------------------------------ //

(function($){
		
	//dom obj
	path = {
			
		//ini
		ini:{
			width:5,
			color:'#cc0000',
			papa:undefined,
			main:undefined,
			start:undefined,
			start_offset:[0,0],
			start_bend:[0,0],
			end:undefined,
			end_offset:[0,0],
			end_bend:[0,0],
			id:undefined,
			img:undefined,
			debug:false
		},		
			
		//go to anchor
		gotoAnchor:function(thisLink, goesToThis){
				
			//ini
			var fromThis = jQuery(thisLink),
				scrollSpeed = 1000;
					
			//on click event
			fromThis.on('click', function(e){
					
				//stop default click behavior
				e.preventDefault();
					
				//grab the target y pos	
				var toThis = jQuery(goesToThis),
				targetY = toThis.offset().top;					
					
				//animate movement	
				jQuery('html, body').animate({
				scrollTop:targetY
				}, scrollSpeed);
					
			});
				
		},		
			
		//setup coordinates
		xy:function(start_x, start_y, end_x, end_y, start_curve_x, start_curve_y, curve_end_x, curve_end_y){
				
			//ini
			var dash_spacing = (path.ini.width + 3),
				point_positions = ("M" + start_x + "," + start_y + " C" + start_curve_x  + "," +  start_curve_y  + " " +  curve_end_x  + "," +  curve_end_y + " " + end_x  + "," +  end_y),
				output = document.createElementNS("http://www.w3.org/2000/svg", "path");
					
				//set path output
				if(path.ini.id !== undefined){output.setAttributeNS(null, 'id', path.ini.id);}
				output.setAttributeNS(null, 'stroke-dasharray', dash_spacing + "," + dash_spacing);
				output.setAttributeNS(null, 'd', point_positions);
				output.setAttributeNS(null, 'stroke-width', path.ini.width);
				output.setAttributeNS(null, 'stroke', path.ini.color);
				output.setAttributeNS(null, 'fill', 'transparent');
					
					
			//setup path d attr
			path.ini.main.prepend(output);
			
			//debug
			if(path.ini.debug === true){
				console.log(output);
			};
			
		},
			
		//add images along path
		imgs:function(){
				
			//make sure images exist and we have an id
			if((path.ini.img !== undefined)&&(path.ini.id !== undefined)){
					
				//ini					
				var buffer = 85;
					path_parent = path.ini.main.parent(),
					this_path = document.getElementById(path.ini.id),
					img_len = path.ini.img.length,
					path_length = this_path.getTotalLength(),
					percent = (Math.floor(100/img_len)/100);
					i = 0;
						
				//loop	
				for(i; i < img_len; i++){
						
					//get svg [x,y] pos
					var current_icon = this_path.getPointAtLength((((i + 1) * percent) * path_length) - buffer),
						img_tag = "<img class='rewards-line-icons' style='top:" + current_icon.y + "px; left:" + current_icon.x + "px;' src='" + path.ini.img[i] + "'>";
							
					//append image
					path_parent.append(img_tag);
						
				}
					
			}
				
		},
			
		//process everything
		engine:function(){
				
			//ini
			var path_parent = path.ini.papa,
				parent_offset = path_parent.parent().offset(),
				path_parent_height = path_parent.parent().outerHeight(),
				path_parent_width = path_parent.parent().outerWidth(),
					
				//start and end points
				start_target = jQuery(path.ini.start),
				start_pos = start_target.offset(),
				end_target = jQuery(path.ini.end),
				end_pos = end_target.offset(),
						
				//set first header pos
				x1 = Math.floor(start_pos.left - parent_offset.left) + path.ini.start_offset[0],
				y1 = Math.floor(start_pos.top - parent_offset.top) + path.ini.start_offset[1],
						
					c1a = x1 + path.ini.start_bend[0],
					c1b = y1 + path.ini.start_bend[1],
						
				//set last header pos
				x2 = Math.floor(end_pos.left - parent_offset.left) + path.ini.end_offset[0],
				y2 = Math.floor(end_pos.top - parent_offset.top) + path.ini.end_offset[1],
						
					c2a = x2 + path.ini.end_bend[0],
					c2b = y2 + path.ini.end_bend[1];		
						
			//setup parent demensions
			path_parent.css({
				'height':path_parent_height,
				'width': path_parent_width
			});
				
			//setup path postions and add path
			path.xy(x1, y1, x2, y2, c1a, c1b, c2a, c2b);
				
			//add imgs if we have any
			path.imgs();
				
			//debug
			if(path.ini.debug === true){
				
				//whos your daddy?
				console.log('parent item');					
				console.log(path_parent);		

				console.log('start item [' + x1 + ':' + y1 + ']');					
				console.log(start_target);		

				console.log('end item [' + y1 + ':' + y2 + ']');						
				console.log(end_target);		
					
				//curves
				var curves = "<div style='font-size:16px; line-height:0;position:absolute;top:"+y1+"px; left:"+x1+"px;z-index:99;'>[s]</div>";
					curves += "<div style='font-size:16px; line-height:0;position:absolute;top:"+y2+"px; left:"+x2+"px;z-index:99;'>[e]</div>";
					curves += "<div style='font-size:16px; line-height:0;position:absolute;top:"+c1b+"px; left:"+c1a+"px;z-index:99;'>|c-s|</div>";
					curves += "<div style='font-size:16px; line-height:0;position:absolute;top:"+c2b+"px; left:"+c2a+"px;z-index:99;'>|c-e|</div>";
				
				//add path
				path_parent.prepend(curves);
					
			};			
				
		},
			
		//fire it all off
		exe:function(opts){
					
			//make sure all requirements are met	
			if((opts.svg_parent != undefined)&&(opts.svg != undefined)&&(opts.start != undefined)&&(opts.end != undefined)){			
						
					//check if svg exits	
					if(jQuery(opts.svg).length <= 0){
							
						//svg does not exits lets create one
						var new_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
							svg_class = opts.svg;
								
							//add attributes
							new_svg.setAttributeNS(null, "class", svg_class.replace(/\./g,''));
							new_svg.setAttributeNS(null, "preserveAspectRatio", "none");
								
						//add svg
						jQuery(opts.svg_parent).append(new_svg);
							
						//debug
						if(path.ini.debug === true){
							console.log("WARNING: Had to create an SVG tag...");
						}						
							
					};
					
				//set values
				path.ini.main = jQuery(opts.svg);
				path.ini.papa = jQuery(opts.svg_parent);
				path.ini.start = jQuery(opts.start);
				path.ini.end = jQuery(opts.end);
					
				//now check if image icons were needed and that the SVG id was provided
				if((opts.img != undefined)&&(opts.img.length > 0)&&(opts.id == undefined)){
						
					//debug
					if(path.ini.debug === true){
						console.log("ERROR: It seems you wanted icons to go along the path. You will need to provide an ID name with the path.");
					}
						
				//execute like normal		
				}else{
						
					//set img and id	
					path.ini.img = opts.img;
					path.ini.id = opts.id
						
					//set all offset and curve bend values
					path.ini.start_offset = (opts.start_offset != undefined) ? opts.start_offset : [0,0];
					path.ini.end_offset = (opts.end_offset != undefined) ? opts.end_offset : [0,0];
					path.ini.start_bend = (opts.start_bend != undefined) ? opts.start_bend : [0,0];
					path.ini.end_bend = (opts.end_bend != undefined) ? opts.end_bend : [0,0];
						
					//fire off engine
					path.engine();
						
				}
					
			}else{
					
				//debug
				if(path.ini.debug === true){
					console.log("ERROR: The Parent SVG class or ID name, the SVG class or ID name, the Start target element class or ID name, and the End target element class or ID name are required.");
				}
					
			}
				
		}
	}
		
	//return
	return path;
		
})(jQuery);

//fire it off on load
jQuery(window).load(function(){
(function(){
		
	//setup links	
	path.gotoAnchor('.rewards-yrl', '.redeem-my-points');
	path.gotoAnchor('.rewards-htrp', '.rewards-main-copy');
	path.gotoAnchor('.rewards-cts', '.rlp-main-title');		
		
	//draw lines function -- so i dont rewrite the same thing inside resize	
	function drawLines(){
			
		//grab some target w and height to help with line placement ----- //
		var h2a_w = jQuery('.rewards-have-fun').outerWidth(),
			h2b_w = jQuery('.rewards-get-rewarded').outerWidth(),
			h2b_h = jQuery('.rewards-get-rewarded').outerHeight(),
			h2c_w = jQuery('.rewards-earn-points').outerWidth(),
			icon_1_w = jQuery('.rewards-cash-icon').outerWidth(),
			icon_1_h = jQuery('.rewards-cash-icon').outerHeight(),
			icon_2_w = jQuery('.rewards-cash-back-icon').outerWidth(),
			icon_2_h = jQuery('.rewards-cash-back-icon').outerHeight(),
			icon_3_w = jQuery('.rewards-cash-lvl-icon').outerWidth();
			
		//FIRST PATH -- all option values added [as sample]
		path.exe({
			
			//svg parent element (class or id name)
			svg_parent:'.rewards-svg-wrapper',

			//svg element (class or id name)
			svg:'.rewards-lines-svg',
				
			//start point target element (class or id name)
			start:'.rewards-have-fun',
				
			//end point target element (class or id name)
			end:'.rewards-get-rewarded',
				
			//setup start point poition and any offset you may want to add
			start_offset:[h2a_w + 20, 30],
				
			//bend value for benzier curve [x:y]
			start_bend:[420, -180],
				
			//setup endpoint poition and any offset you may want to add
			end_offset:[(h2b_w - 35), -20],
				
			//bend value for benzier curve [x:y]
			end_bend:[0, 0],
				
			//setup icons -- add img src url into an array -- add as many as you like
			img:['/contents/rewards/sports.png', '/contents/rewards/casino-lg2.png','/contents/rewards/casino.png', '/contents/rewards/poker_0.png', '/contents/rewards/horses.png'],
				
			//if you have images we need to set a path id name
			id:'svg_one'
		});
				
			//icon GetRewarded - 1
			path.exe({
				svg_parent:'.rewards-svg-wrapper',
				svg:'.rewards-lines-svg',
				start:'.rewards-get-rewarded',
				start_offset:[h2b_w - 30, h2b_h + 15],
				end:'.rewards-cash-icon',
				end_offset:[icon_1_w - 30, -25]
			});	
				
			//icon 1 - 2
			path.exe({
				svg_parent:'.rewards-svg-wrapper',
				svg:'.rewards-lines-svg',
				start:'.rewards-cash-icon',
				start_offset:[icon_1_w - 30, icon_1_h + 15],
				end:'.rewards-cash-back-icon',
				end_offset:[icon_2_w - 30, -25]
			});	
				
			//icon 2 - 3
			path.exe({
				svg_parent:'.rewards-svg-wrapper',
				svg:'.rewards-lines-svg',
				start:'.rewards-cash-back-icon',
				start_offset:[icon_2_w - 30, icon_2_h + 15],
				end:'.rewards-cash-lvl-icon',
				end_offset:[icon_3_w - 30, -25]
			});	
					
		//LAST PATH
		path.exe({
			svg_parent:'.rewards-svg-wrapper',
			svg:'.rewards-lines-svg',
			start:'.rewards-cash-lvl-icon',
			start_offset:[60, 80],
			start_bend:[-5, 109],
			end:'.rewards-earn-points',
			end_offset:[h2c_w + 20, 30]
		});	
			
	};
		
	//on load draw lines	
	drawLines();	
		
	//redraw lines on window resize
	jQuery(window).resize(function(){
			
		//ini	
		var win_w = jQuery(window).outerWidth(),
			svg = jQuery('.rewards-lines-svg').parent().parent().outerWidth();
			
		//remove old lines and icons
		jQuery('.rewards-lines-svg').find('path').remove();
		jQuery('.rewards-line-icons').remove();
		
		//only when we have the proper real estate
		//available for the path then redraw paths 
		if(win_w >= svg){
			drawLines();
		}
			
	});
		
})();		
});