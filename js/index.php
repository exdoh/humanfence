<?php require_once "controllers/config.php";?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico">
        <title>Human Fence</title>
        <link rel="stylesheet" type="text/css" href="css/HumanFenceCSS.css" />
        
        <script type="text/javascript">
		 	var service_path = '<?php echo $url_path;?>' + 'freehap.com/humanfence/controllers';
		 	//var service_path = '/humanfence/controllers';
		</script>
		
        <script src="js/jquery-1.6.3.min.js"></script>
        <script src="js/common.js"></script>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=true&language=th"></script>
        <script src="js/human_fence.js"></script>
        
        <script type="text/javascript">
        	var humanfence = new humanfence();
        	
        	$(document).ready(function(){
        		humanfence.reset();
        	});
        </script>
        	
    </head>
    <body onload="">
    	<div id="fb-root"></div>
        <script>
            // Load the SDK Asynchronously
            (function(d){
                var js, id = 'facebook-jssdk';
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement('script');
                js.id = id;
                js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";
                d.getElementsByTagName('head')[0].appendChild(js);
            }(document));
        </script>
        <div id="content" class="main_content" style="display:none">
        	<!-- Blursheet -->
            <div id="blursheet" style="display:none"></div>
            <!-- Alert Box -->
            <div id="box_alert" style="display:none">
                <div id="box_alert_msg" class="msg"></div>
                <div id="button_ok_alert" class="button"></div>
            </div>
            
            <div id="loading" class="loading"></div>
            
        	<!--Intro-->
        	<div id="story" class="story">
        		<div id="frame_story" class="frame_story"></div>
        	</div>
        	<!--Intro-->
        	                   
            <!--Map Plugin-->
            <div id="box_map" class="box_map" style="display:none">
            	
            	<div id="frame_mapcanvas"></div>
            </div>
            
            <div id="num_post" class="num_post" style="display:none"></div>
            
            <div id="button_sign" class="button_sign" style="display:none">&nbsp;</div>
            <div id="button_invite" class="button_invite" style="display:none">&nbsp;</div>
            <div id="button_info" class="button_info" style="display:none">&nbsp;</div>
            <!--Map Plugin-->
            
            <!--info-->
        	<div id="info" class="info" style="display:none"></div>
        	<div id="button_back" class="button_back" style="display:none"></div>
        	<!--info-->
        	
            <!--Character-->
        	<div id="character" class="character" style="display:none"> </div>
        	<div id="text_character" class="text_character" style="display:none">&nbsp;</div>
        	<!--Character-->
        	
        	<!--Post-->
        	<div id="box_post" class="box_post" style="display:none"> 
        		<div class="slide_post_holder">
        			<div class="box_post_show">
        				<div id="col-left_post" class="col-left_post">
        					<div class="textbox_data">
        						<div id="text_name" class="text_name" >&nbsp;</div>
        						<input type="text" id="firstname" name="firstname">
        					</div>
        					
        					<div class="textlist_data">
        						<div id="text_message" class="text_message" >&nbsp;</div>
        						<select id="list_message" class="list_message">
								 
								</select> 
								<div id="show_message_1" class="show_message_1" style="display:none"></div>
								<div id="show_message_2" class="show_message_2" style="display:none"></div>
        					</div>
        					
        					<div id="ps_message" class="ps_message"></div>
        					
        					<div id="button_ok" class="button_ok">&nbsp;</div>
        				</div>
        				<div id="col-right_post" class="col-right_post">
        					
        				</div>
        			</div>
        		</div>
        	</div>
        	<!--Post-->
            
            <!--invite-->
        	<div id="invite" class="invite" style="display:none"> 
        		<input type="text" id="search_box" name="search_box" maxlength="20">
        		<div id="list_friend" class="list_friend"></div>
        	</div>
        	
        	<div id="button_invite_cancel" class="button_invite_cancel" style="display:none"></div>
        	<!--invite-->
        	
        </div>      
           
    </body>
</html>