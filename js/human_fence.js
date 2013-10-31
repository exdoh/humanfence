var map;
var infowindow = new google.maps.InfoWindow({maxWidth: 500});
  
function humanfence()
{
   //////////FB//////////
   this.appID = 512802425417266;
   this.scope_arr = ["publish_stream","email"];
   this.scope_string = 'publish_stream,email';
   this.accessToken = '';
   
    this.fbfriend = [];
    this.share_fbid = 0;
    //////////FB//////////
   
   this.lang = 'en';
   
   this.frame_story = ["title","frame02","frame03","frame04","frame05"];
   this.page_story = 1;
   
   this.center = new google.maps.LatLng(8.870337,99.900473);
   
   this.start_pin = 1;
   this.end_pin = 4;
   
   this.num_character = 0;
   this.user_name = 0;
   
   this.get_lat = 0;
   this.get_lng = 0;
		    
   this.list_text_th = ["กรุณาเลือก","ปลาคือชีวิตของเรา","อย่ามาทำให้ทะเลสกปรก","นี่คือแหล่งอาหารของเรา","ช่วยกันปกป้องอ่าวทองคำ",
   					 "ไม่สนับสนุนนิคมอุตสาหกรรมปิโตเคมี","ใครรักทะเล ยกมือขึ้น","หยุดทำร้ายทะเล","ประกาศ! นี่คือเขตอนุรักษ์ของพวกเรา",
   					 "ปลาที่เรากินจะสกปรก ถ้าเราไม่ร่วมกันปกป้อง","ไม่มีชาวประมง แล้วใครหาปลาให้เรากิน","จับมือกันไว้นะ อย่าปล่อย",
   					 "อย่าเข้ามานะ","ข้ามศพเราไปก่อน","ไปตามคนมาเพิ่มอีกเร็ว","ที่นี่ไม่ใช่ทะเลร้าง","มามะ มาจอยกัน"," ทำอะไรถามคนพื้นที่เขาก่อน",
   					 "ร่วมเป็นรั้วมนุษย์ ปกป้องอ่าวทองคำ","อุตสาหกรรมพลังงานสกปรกห้ามเข้า","เขตนี้ไว้ให้ลูกหลาน"];
   
   this.list_text_en = ["Please choose","Fish is life for us","Don’t pollute our sea","This is our food source","Let’s protect Golden Bay",
   					 "Say No to petrochemical industry","If you love the sea raise your hands up","Stop hurting our sea","Attention! This is our protected zone",
   					 "Without protection, the fish you eat will be contaminated","When there are no fishermen, there’ll be no seafood","Join hands and never let go",
   					 "No trespassing","Over my dead body!","Quick, join the human fence","This is NOT an abandoned sea","C’mon, join us","Ask the locals before you do anything",
   					 "Let’s form a Human Fence to protect the Golden Bay","No dirty energy industry here","This sea is for our children’s children"];
   
   this.user_fbid = 0;
   this.user_fbname = 0;
   this.choose_message = '';
   this.user_email = '';
   
   this.num_at = '';
}

////////////////////////FB//////////////////////////
window.fbAsyncInit = function() {
    FB.init({
        appId  : humanfence.appID,
        status : true, // check login status
        cookie : true, // enable cookies to allow the server to access the session
        xfbml  : true, // parse XFBML
        //channelUrl  : 'http://www.yourdomain.com/channel.html', // Custom channel URL
        oauth : true // enables OAuth 2.0
    });
                    
    FB.getLoginStatus(function(response) {
        
        if (response.authResponse) {
            FB.api('/me/permissions', function (response_check_perm) {
                var need_more_perm = false;
                for(var i=0; i<humanfence.scope_arr.length; i++){
                    if( ! response_check_perm['data'][0][humanfence.scope_arr[i]]){
                        need_more_perm = true;
                        break;
                    }
                }
                     
                if(need_more_perm){
                    var path = 'https://www.facebook.com/dialog/oauth?';
                    var queryParams = ['client_id=' + humanfence.appID,
                    'redirect_uri=' + 'http://apps.facebook.com/humanfence/',//window.location,
                    'scope=' + humanfence.scope_string,
                    'response_type=token'];
                    var query = queryParams.join('&');
                    var url = path + query;
                    top.location.href = url;
                }
                else{
                	
                    humanfence.accessToken = response.authResponse.accessToken;
                    FB.api('/me',humanfence.get_data_fb);
                }
            });
        } 
        else {
        	  
            // no user session available, someone you dont know
            var path = 'https://www.facebook.com/dialog/oauth?';
            var queryParams = ['client_id=' + humanfence.appID,
            'redirect_uri=' + 'http://apps.facebook.com/humanfence/',
            'scope=' + humanfence.scope_string,
            'response_type=token'];
            var query = queryParams.join('&');
            var url = path + query;
            top.location.href = url;
        }
    });
}

humanfence.prototype.get_data_fb = function(user){
   humanfence.user_fbid = user.id;
   humanfence.user_fbname = user.name;
   humanfence.user_email = user.email;
  
   $(document).ready(function(){
   		ajax("https://graph.facebook.com/me/friends?access_token="+humanfence.accessToken, '', 'jsonp', '', humanfence.fb_save_friends);
   		humanfence.reset();
   });
}

humanfence.prototype.fb_save_friends = function(response){
	if(response.data)
    {
    	humanfence.fbfriend = response.data;
    } 
}
////////////////////////FB//////////////////////////

humanfence.prototype.reset = function(){
	$('#button_eng').attr('onclick',"humanfence.click_choose_lang('en')");
	$('#button_thai').attr('onclick',"humanfence.click_choose_lang('th')");
	
	$('.main_content').css('background-image','url("images/language_page.jpg")');
	$('#content').show();
	
	$('#button_sign').attr('onclick','humanfence.click_button_sign()');
	$('#list_message').attr('onchange','humanfence.click_listbox(this)');
	$('#show_message_1').attr('onclick','humanfence.click_change_message()');
	$('#button_info').attr('onclick','humanfence.click_button_info()');
	$('#button_back').attr('onclick','humanfence.click_button_back()');
	
	$('#button_invite').attr('onclick','humanfence.click_button_invite()');
	$('#search_box').attr('onkeyup','humanfence.render_search_friend_list()');
	
	$('#button_invite_cancel').attr('onclick','humanfence.click_button_invite_cancel()');
	
	$('#button_ok').attr('onclick','humanfence.click_button_ok()');
	$('#button_ok_alert').attr('onclick','humanfence.click_button_ok_alert()');
	
}

humanfence.prototype.click_choose_lang = function(lang){
	this.lang = lang;
	
	humanfence.render_list_box();
	
	$('.button_sign').css('background-image','url("images/button_sign_' + this.lang + '.png")');
	$('.button_invite').css('background-image','url("images/button_invite_' + this.lang + '.png")');
	$('.button_info').css('background-image','url("images/button_info_' + this.lang + '.png")');
	$('.button_back').css('background-image','url("images/button_back_' + this.lang + '.png")');
	$('.button_ok').css('background-image','url("images/button_ok_' + this.lang + '.png")');
	$('.text_name').css('background-image','url("images/text_name_' + this.lang + '.png")');
	$('.text_message').css('background-image','url("images/text_message_' + this.lang + '.png")');
	$('.ps_message').css('background-image','url("images/ps_' + this.lang + '.png")');
	
	$('#box_alert .button').css('background-image','url("images/button_ok_' + this.lang + '.png")');
	
	if(this.lang == 'en')
	{
		$('#info_header').html('Fish For Life');
	} else {
		$('#info_header').html('ปลาคือชีวิต');	
	}
	
	$('#button_eng').hide();
	$('#button_thai').hide();
	$('.main_content').css('background-image','url("images/title_' + this.lang + '.jpg")');
	$('#loading').show();
	
	$(document).ready(function(){
            setTimeout("humanfence.render_frame()",5000);
    });
}


humanfence.prototype.render_frame = function(){
	$('#loading').hide();
	$('.main_content').css('background-image','url("images/title.jpg")');
	var content = '<img src="images/' + this.frame_story[this.page_story] + '_' + this.lang + '.jpg">';    
	    
	    if(this.page_story != 5)
	    {
	    	content += '<div id="arrow" class="arrow">';
	    		content += '<div id="right_arrow_page_' + this.page_story + '" class="right_arrow_page_' + this.page_story + '" onclick="humanfence.click_right_arrow()">.....</div>';
	    	content += '</div>';
	    } 
	    
	$('#frame_story').html(content);
}

humanfence.prototype.click_right_arrow = function(){	
	this.page_story++;
	
	if(this.page_story == 5)
	{
		$(document).ready(function(){
           	humanfence.get_num_post();		
		});
		
		$('.main_content').css('background-image','url("images/background_' + this.lang + '.jpg")');
			
		$('#story').hide();	
		
		$('#button_invite').hide();
    	$('#button_sign').show();
		$('#button_info').show();	
			
		humanfence.initialize();
		
		$('#box_map').show();	
		//$('#num_post').css('margin-top','-90px');
		$('#num_post').show();
		
		$('embed').remove();
		$('body').append('<embed src="sound/sea.mp3" autostart="true" hidden="true" loop="true" id="sound_sea" class="sound_sea">');
		
	} else {
		humanfence.render_frame();
	}
	
}

//////////////////////Map////////////////////////
humanfence.prototype.initialize = function(){
    var mapDiv = document.getElementById('frame_mapcanvas');
    map = new google.maps.Map(mapDiv, {
      center: this.center,
      zoom: 13,
      maxZoom: 13,
      minZoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
	
	var flightPlanCoordinates = [
	    new google.maps.LatLng(8.870337,99.900473),
	    new google.maps.LatLng(8.870337,100.050473),
	    new google.maps.LatLng(8.585337,100.050473),
	    new google.maps.LatLng(8.585337,99.900473),
	    new google.maps.LatLng(8.870337,99.900473)
    ];
    
    var lineSymbol = {
	  path: 'M 0,-1 0,1',
	  strokeOpacity: 1,
	  scale: 3
	};
	var flightPath = new google.maps.Polyline({
	    path: flightPlanCoordinates,
	    strokeColor: "#000",
	    strokeOpacity: 0,
	    strokeWeight: 1,
	     icons: [{
		    icon: lineSymbol,
		    offset: '0',
		    repeat: '20px'
		  }],
	});

    flightPath.setMap(map);
    
    google.maps.event.addListenerOnce(map, 'tilesloaded', humanfence.addPin);
    google.maps.event.addListenerOnce(map, 'tilesloaded', humanfence.addFishJump);
}

humanfence.prototype.addPin = function(){
	var param = {
    	mode: 'pin',
    	fbid: humanfence.user_fbid
    };
    
	ajax(service_path+'/location.php', param, 'text', '', function(data){     
            
            var locate = JSON.parse(data).location;
           
            
            for(var i = 0 ; i < locate.length ; i++)
            {
			    
			    var iconPin = "images/pin/25/" + locate[i].pin + ".png";
			  
			    var latLng = new google.maps.LatLng(locate[i].lat,locate[i].lng);
			  
			    var marker = new google.maps.Marker({
			      position: latLng,
				  map: map,
				  icon: iconPin,
				  optimized: false
			    });
			    
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						infowindow.close();
						
						var content = '<div id="bubble" class="bubble"><div>' + locate[i].message + '</div><div id=bubble_name>' + locate[i].name + '</div>' + '</div>';
						infowindow = new google.maps.InfoWindow({
						    content: content,
						    maxWidth: 500
						});  
						
						var myLatlng = new google.maps.LatLng(locate[i].lat, locate[i].lng);
						map.panTo(myLatlng);
          			    infowindow.open(map, marker);
				  	}
				})(marker, i));
				
			    if(humanfence.user_fbid == locate[i].fbid)
			    {
			    	center_lat = locate[i].lat;
            		center_lng = locate[i].lng;
            
			    	marker.setAnimation(google.maps.Animation.BOUNCE);
			    	
			    	var content = '<div id="bubble" class="bubble"><div>' + locate[i].message + '</div><div id=bubble_name>' + locate[i].name + '</div>' + '</div>';
					infowindow = new google.maps.InfoWindow({
					    content: content
					});  
			    	infowindow.open(map,marker);
			    	
			    	$('#button_sign').hide();
					$('#button_info').hide();
			    	$('#button_invite').show();
			    	
			    } else {
			    	if(locate.length - i == 1)
			    	{
			    		center_lat = locate[i].lat;
            			center_lng = locate[i].lng;
            		}
			    }
			}
			
			map.setZoom(13);
			
			var myLatlng = new google.maps.LatLng(center_lat, center_lng);
			map.panTo(myLatlng);
    });
}

humanfence.prototype.addFishJump = function(){
    var iconFish = "images/sign.gif";       
    var latLng = new google.maps.LatLng(8.695895,99.993599);
    var marker = new google.maps.Marker({
      position: latLng,
	  map: map,
	  icon: iconFish,
	  optimized: false
    });
    
    var iconFish = "images/fish4jump.gif";       
    var latLng = new google.maps.LatLng(8.595173,100.068137);
    var marker = new google.maps.Marker({
      position: latLng,
	  map: map,
	  icon: iconFish,
	  optimized: false
    }); 
    
    var iconFish = "images/4dolblue.gif";       
    var latLng = new google.maps.LatLng(8.847757,99.997456);
    var marker = new google.maps.Marker({
      position: latLng,
	  map: map,
	  icon: iconFish,
	  optimized: false
    }); 
    
    var iconFish = "images/orcs.gif";       
    var latLng = new google.maps.LatLng(8.758282,100.245521);
    var marker = new google.maps.Marker({
      position: latLng,
	  map: map,
	  icon: iconFish,
	  optimized: false
    }); 
}

humanfence.prototype.dropPin = function(){
		
		var param = {
	    	mode: 'get_user_data',
	    	fbid: humanfence.user_fbid
	    };
	    
		ajax(service_path+'/location.php', param, 'text', '', function(data){ 
			  
			  var locate = JSON.parse(data).location;
			  
			  //map.setZoom(10);
	        
		      var image = "images/pin/25/" + locate[0].pin + ".png";
	   
		      marker = new google.maps.Marker({
		    	  position: new google.maps.LatLng(locate[0].lat, locate[0].lng),
		          map: map,
		          icon: image,
		          draggable: false,
				  animation: google.maps.Animation.DROP
		      });
		    
		      marker.setAnimation(google.maps.Animation.BOUNCE);
		
			  map.setZoom(13);
		
			  var myLatlng = new google.maps.LatLng(locate[0].lat, locate[0].lng);
			  map.panTo(myLatlng);
			  
			  var content = '<div id="bubble" class="bubble"><div>' + locate[0].message + '</div><div><b>' + locate[0].name + '</b></div>' + '</div>';
			  infowindow = new google.maps.InfoWindow({
			      content: content
			  });  
			
			  google.maps.event.addListener(marker, 'click', function() {
			     infowindow.open(map,marker);
			  });
			  infowindow.open(map,marker);		  
		});
}
//////////////////////Map////////////////////////

/////////////////////Character///////////////////////
humanfence.prototype.click_button_sign = function(){
	$('.main_content').css('background-image','url("images/background_select_' + this.lang + '.jpg")');
	
	$('#box_map').hide();
	$('#num_post').hide;	
	$('#button_sign').hide();
	$('#button_info').hide();

	humanfence.render_character();
	
	$('#character').show();
}

humanfence.prototype.render_character = function(){
	var content = '<div id="previous" class="previous"><img src="images/button_previous.png" onclick="humanfence.click_previous()"></div>';
		var j = 1;
		for(var i = this.start_pin;i <= this.end_pin ; i++)
		{
			content += '<div id="cha_center" class="cha_center"><div class="col' + j + '"><img src="images/pin/100/' + i + '.png" onclick="humanfence.choose_character(' + i + ')"></div></div>';
			j++;
		}
		
		content += '<div id="next" class="next"><img src="images/button_next.png" onclick="humanfence.click_next()"></div>';
	
	$('#character').html(content);
}

humanfence.prototype.click_previous = function(){
	if(this.start_pin == 1)
	{
		this.start_pin = 37;	
	} else {
		this.start_pin -= 4;
	}
	
	if(this.end_pin == 4)
	{
		this.end_pin = 40;	
	} else {
		this.end_pin -= 4;
	}
	
	humanfence.render_character();
}

humanfence.prototype.click_next = function(){
	if(this.start_pin == 37)
	{
		this.start_pin = 1;	
	} else {
		this.start_pin += 4;
	}
	
	if(this.end_pin == 40)
	{
		this.end_pin = 4;	
	} else {
		this.end_pin += 4;
	}
	
	humanfence.render_character();
}

humanfence.prototype.choose_character = function(num){
    
    this.num_character = num;
    
    humanfence.render_box_post();
	
}
/////////////////////Character///////////////////////

/////////////////////Post///////////////////////
humanfence.prototype.render_list_box = function(){
	var content = '';
	
	if(this.lang == 'en')
	{
		for(var i = 0 ; i < this.list_text_en.length ; i++)
		{
			content += '<option value="' + i + '">' + this.list_text_en[i] + '</option>';
		}
	} else {
		for(var i = 0 ; i < this.list_text_th.length ; i++)
		{
			content += '<option value="' + i + '">' + this.list_text_th[i] + '</option>';
		}
	}
	
	$('#list_message').html(content);
}

humanfence.prototype.render_box_post = function(){
	var content = '<img src="images/pin/100/' + this.num_character + '.png" onclick="humanfence.click_button_change()" style="cursor:pointer">';
	$('#col-right_post').html(content);
	
	$('#character').hide();
	$('#box_post').show();	
}

humanfence.prototype.click_button_info = function(){
	var content = '';
	var FILE_URL = '../humanfence/file/xxx_' + this.lang + '.txt';
	
	jQuery.get(FILE_URL, function(data) {
	   //alert(data);
	   $('#info_content').val(data);
	   //process text file line by line
	   //$('#div').html(data.replace('\n','<br>'));
	});

	$('#num_post').hide();
	$('#box_map').hide();
	$('#button_sign').hide();
	$('#button_info').hide();
	
	$('.main_content').css('background-image','url("images/info_backgound_' + this.lang + '.jpg")');
	
	$('#info').show();
	$('#button_back').show();
}

humanfence.prototype.click_button_back = function(){
	$('#button_back').hide();
	$('#info').hide();
	
	$('.main_content').css('background-image','url("images/background_' + this.lang + '.jpg")');
	
	$('#num_post').show();
	$('#box_map').show();
	$('#button_sign').show();
	$('#button_info').show();
}

humanfence.prototype.click_listbox = function(){
	if(jQuery('#list_message').val() != 0)
	{
		if(this.lang == 'en')
		{
			this.choose_message = this.list_text_en[jQuery('#list_message').val()];
		} else {
			this.choose_message = this.list_text_th[jQuery('#list_message').val()];
		}
		
		$('#show_message_1').html('  ' + this.choose_message);	
	
		$('#list_message').hide();	
		$('#show_message_1').show();	
		$('#show_message_2').show();	
	}
	
	
	
}

humanfence.prototype.click_change_message = function(){
	this.choose_message = '';	
	
	$('#show_message_1').hide();	
	$('#show_message_2').hide();
	$('#list_message').show();	
	
}

humanfence.prototype.click_button_change = function(){
	$('#box_post').hide();	

	humanfence.render_character();
	
	$('#character').show();
}

humanfence.prototype.click_button_ok = function(){
	
	if(jQuery('#firstname').val() == '' || this.choose_message == '')
	{
		if(this.lang == 'en')
		{
			alert('Please fill in all required information  !!!');
		} else {
			alert('กรุณากรอกข้อมูลให้ครบ  !!!');
		}
	} else {
		   
	    var param = {
	    	mode: 'last_latlng'
	    }
	    
	    ajax(service_path+'/location.php', param, 'text', '', function(data){ 
		    
		    var locate = JSON.parse(data).location;
		    
		    var num = 0;
		    //////////////edit/////////////
		    if(locate.length != 0)
		    {
		    	 num = locate[0].num;
		    	 
		    	 if(num == 918){
			    	num = 0;
			     }
			    
			     num++;
		    	 
		    	 if(num == 1) {
		    	 	this.get_lat =  8.870337;
					this.get_lng = 99.900473;
		    	 } else if(num <= 51) {
			    	if(locate[0].lng <= 100.050473)
			    	{
			    		this.get_lat =  8.870337;
						this.get_lng = (parseFloat(locate[0].lng) + 0.003);
					}
			    } else if(num > 51 && num <= 147) {
			    	if(locate[0].lat >= 8.585337)
			    	{
			    		this.get_lat = (parseFloat(locate[0].lat) - 0.003);
						this.get_lng = 100.050473;
					}
			    } else if(num > 147 && num <= 196) {
			    	if(locate[0].lng >= 99.900473)
			    	{
			    		this.get_lat = 8.585337;
						this.get_lng = (parseFloat(locate[0].lng) - 0.003);
					}
			    } else if(num > 196 && num <= 290) {
			    	if(locate[0].lat <= 8.867337)
			    	{
			    		this.get_lat = (parseFloat(locate[0].lat) + 0.003);
						this.get_lng = 99.900473;
					}
			    } 
			    
			    else if(num == 291) {
			    	this.get_lat = 8.876337;	
		    		this.get_lng = 99.894473;
			    } else if(num <= 345) {
			    	if(locate[0].lng <= 100.056473)
			    	{
			    		this.get_lat =  8.876337;
						this.get_lng = (parseFloat(locate[0].lng) + 0.003);
					}
			    } else if(num > 345 && num <= 444) {
			    	if(locate[0].lat >= 8.579337)
			    	{
			    		this.get_lat = (parseFloat(locate[0].lat) - 0.003);
						this.get_lng = 100.056473;
					}
			    } else if(num > 444 && num <= 498) {
			    	if(locate[0].lng >= 99.894473)
			    	{
			    		this.get_lat = 8.579337;
						this.get_lng = (parseFloat(locate[0].lng) - 0.003);
					}
			    } else if(num > 498 && num <= 596) {
			    	if(locate[0].lat <= 8.873337)
			    	{
			    		this.get_lat = (parseFloat(locate[0].lat) + 0.003);
						this.get_lng = 99.894473;
					}
			    }
			    
			     else if(num == 597) {
			    	this.get_lat = 8.882337;	
		    		this.get_lng = 99.888473;
			    } else if(num <= 655) {
			    	if(locate[0].lng <= 100.062473)
			    	{
			    		this.get_lat =  8.882337;
						this.get_lng = (parseFloat(locate[0].lng) + 0.003);
					}
			    } else if(num > 655 && num <= 758) {
			    	if(locate[0].lat >= 8.573337)
			    	{
			    		this.get_lat = (parseFloat(locate[0].lat) - 0.003);
						this.get_lng = 100.062473;
					}
			    } else if(num > 758 && num <= 816) {
			    	if(locate[0].lng >= 99.888473)
			    	{
			    		this.get_lat = 8.573337;
						this.get_lng = (parseFloat(locate[0].lng) - 0.003);
					}
			    } else if(num > 816 && num <= 918) {
			    	if(locate[0].lat <= 8.882337)
			    	{
			    		this.get_lat = (parseFloat(locate[0].lat) + 0.003);
						this.get_lng = 99.888473;
					}
			    }
			    
				humanfence.num_at = num;
			} else {
				humanfence.num_at = 1;
				this.get_lat = 8.870337;
				this.get_lng = 99.900473;
			}
			//////////////edit/////////////
			
			humanfence.user_name = jQuery('#firstname').val();
			
		    var param = {
		    	mode: 'add',
		    	fbid: humanfence.user_fbid,
		        name: humanfence.user_name,
		        email: humanfence.user_email,
		        message: humanfence.choose_message,
		        pin: humanfence.num_character,
		        num: humanfence.num_at,
		        lat: this.get_lat,
		        lng: this.get_lng
		    };
		   
			ajax(service_path+'/post.php', param, 'text', '', function(data){     
		            
		            var locate = JSON.parse(data).location;
		            
		            $(document).ready(function(){
			           	humanfence.get_num_post();	
			           	$('#num_post').show();	
					});
					
					$('.main_content').css('background-image','url("images/background_' + humanfence.lang + '.jpg")');
					
		            $('#box_post').hide();
		    	
				    $('#box_map').show();
				    //$('#num_post').css('margin-top','-90px');
				    $('#button_invite').show();
				    
				    if(humanfence.lang == 'en')
				    {
				    	$('#box_alert_msg').html('<div id="box_alert_msg_1">' + jQuery('#firstname').val() + ' <br>you’re now at ' + locate[0].lat + ' North, ' + locate[0].lng + ' East.</div><div id="box_alert_msg_2">Thank you for joining Human Fence to protect the Golden Bay.</div>');
				    } else {
				    	$('#box_alert_msg').html('<div id="box_alert_msg_1">ขณะนี้คุณ ' + jQuery('#firstname').val() + ' <br>อยู่ที่ละติจูด ' + locate[0].lat + ' ลองติจูด ' + locate[0].lng + '</div><div id="box_alert_msg_2">ขอบคุณที่ร่วมเป็นรั้วมนุษย์ปกป้องอ่าวทองคำ</div>');
				    }	
				    		    
				    $('#blursheet').show();
				    $('#box_alert').show();

					humanfence.postFacebook(locate[0].lat,locate[0].lng);
					
					this.start_pin = 1;
				    this.end_pin = 4;
				   
				    this.num_character = 0;
		    });
		});	
	}
}

humanfence.prototype.click_button_ok_alert = function(){
	  $('#box_alert').hide();
	  $('#blursheet').hide();
	  
	  humanfence.dropPin();
}

humanfence.prototype.get_num_post = function(){
		var param = {
	    	mode: 'get'
	    };
	    
		ajax(service_path+'/post.php', param, 'text', '', function(data){ 
			
			  var num_post = JSON.parse(data).post;
			  
			  $('#num_post').html(num_post[0].num);
			  
		});
}
/////////////////////Post///////////////////////

humanfence.prototype.postFacebook = function(lat,lng){
	  var mes = '';
	  var name = '';
	  var cap = '';
	  var des = '';
	  
	  if(humanfence.lang == 'en')
	  {
	  	 mes = humanfence.user_name + ' has joined the Human Fence at ' + lat + ' north, ' + lng + ' east';
	  	 name = 'Please help us form a Human Fence';
	  	 cap = 'to help protect the Golden Bay of Tha Sala, Nakhon Sri Thammarat from dirty energy industry by';
	  	 des = 'declaring it a Food Production Zone';
	  } else {
	  	 mes = 'คุณ '+ humanfence.user_name +' เป็นรั้วมนุษย์ที่ ละติจูด  ' + lat +' ลองจิจูด  '+lng;
	  	 name = 'Human fence ร่วมเป็นรั้วมนุษย์เพื่อปกป้องอ่าวทองคำ';
	  	 cap = 'มาร่วมกับชาวบ้าน ท่าศาลา จ.นครศรีธรรมราช ต่อต้านอุตสาหกรรมพลังงานสกปรก';
	  	 des = 'ด้วยการประกาศอาณาเขตอ่าวทองคำเป็นพื้นที่คุ้มครองแหล่งผลิตอาหาร';
	  }
	  
	FB.api('/me/feed', 'post', {
		  message: mes,
		  link:'http://apps.facebook.com/humanfence/',
		  picture:'http://freehap.com/humanfence/images/facebook/'+humanfence.num_character+'.jpg',
		  name: name, 
		  caption: cap,
		  description: des
	 },function(data) {
		 console.log("response... "+data);
	 });
 }

/////////////////////Invite///////////////////////
humanfence.prototype.click_button_invite = function(){
	/*$('#num_post').hide();
	$('#box_map').hide();
	$('#button_invite').hide();
	
	$('.main_content').css('background-image','url("images/invite_friends_page_' + this.lang + '.jpg")');
	
	humanfence.render_search_friend_list();
	
	$('#invite').show();
	$('#button_invite_cancel').show();*/
	
	FB.ui({method: 'apprequests',
	    message: 'Human Fence',
	    filters: ['app_non_users']
	}, humanfence.callback_invite);
}

humanfence.prototype.render_search_friend_list = function(){
	
	var text_search = jQuery("#search_box").val();
	
	if(text_search.length > 0)
    {  	
    	var name_list = "";
        var search_keyword = new RegExp('^' + text_search,"i");
        var friend_search_count = 0;
        
        name_list += "<div>";
        
        for(var i=0; i<humanfence.fbfriend.length; i++)
        {
        	if(humanfence.fbfriend[i].name.search(search_keyword) == -1)
            {
                continue;
            }
                  
			name_list += '<div class="search_list_item" onclick="humanfence.share_dialog(' + humanfence.fbfriend[i].id + ');">';
		        name_list += '<span id="fb_pic" class="fb_pic"><img src="http://graph.facebook.com/' + humanfence.fbfriend[i].id + '/picture"></span>';
	            name_list += '<span id="fb_name" class="fb_name">   ' + humanfence.fbfriend[i].name + '</span>';
	        name_list += '</div>';
	        
	        friend_search_count++;
	        
	        if(friend_search_count == 5){
	        	break;
	        }
			
        }
        
        if(friend_search_count == 0)
        {
        	
        	name_list += "<div class='search_list_item'>";
            	name_list += '<span class="fb_no_result">no result for&nbsp "' + text_search + '"</span>';
            name_list += "</div>";
            
        }
        
        name_list += "</div>";
        
        $("#list_friend").html(name_list);
    } else {
    	$("#list_friend").html('');
    }
}

humanfence.prototype.click_button_invite_cancel = function(){
	$('#button_invite_cancel').hide();
	$('#invite').hide();
	
	$('.main_content').css('background-image','url("images/background_' + this.lang + '.jpg")');
	
	$('#num_post').show();
	$('#box_map').show();
	$('#button_invite').show();
	
	$('#search_box').val('');
	$('#list_friend').html('');
}
	
humanfence.prototype.share_dialog = function(fbid){
	  $("#search_box").val('');
	  $('#list_friend').html('');
	  
	  var name = '';
	  var cap = '';
	  var des = '';
	  
	  if(humanfence.lang == 'en')
	  {
	  	 name = humanfence.user_fbname + ' has invited you to join the Human Fence';
	  	 cap = 'Please help us form a Human Fence';
	  	 des = 'to help protect the Golden Bay of Tha Sala, Nakhon Sri Thammarat from dirty energy industry by declaring it a Food Production Zone';
	  } else {
	  	 name = 'มาเป็นรั้วมนุษย์กับคุณ ' + humanfence.user_fbname;
	  	 cap = 'Human Fence ร่วมเป็นรั้วมนุษย์เพื่อปกป้องอ่าวทองคำ';
	  	 des = 'เพื่อต่อต้านอุตหกรรมพลังงานสกปรก ช่วยกันแสดงเขต พื้นที่คุ้มครองแหล่งอาหาร ร่วมกับชาวบ้าน ที่ อ.ท่าศาลา จ. นครศรีธรรมราช';
	  }
	  
	  FB.ui({method: 'feed',
          redirect_uri: 'http://apps.facebook.com/humanfence/',
          link: 'http://apps.facebook.com/humanfence/',
          picture: 'http://freehap.com/humanfence/images/facebook/27.jpg',
          name: name,
          caption: cap,
          description: des,
		  to: fbid
	  }, humanfence.callback_invite);
}
humanfence.prototype.callback_invite = function(response)
{
	/*if(response)
	{
		$('#button_invite_cancel').hide();
		$('#invite').hide();
		
		$('.main_content').css('background-image','url("images/background_' + this.lang + '.jpg")');
		
		$('#num_post').show();
		$('#box_map').show();
		$('#button_invite').show();
		
	} else {
		$("#search_box").val('');
		$('#list_friend').html('');
	}*/
	
	if(response != null)
	{
		window.location = 'https://www.facebook.com/' + humanfence.user_fbid;
	} else {
		//window.location = 'https://www.google.com';
	}
}
/////////////////////Invite///////////////////////