<?php 

require_once "config.php";
require_once LIB_BASE."location.class.php";

$locate = new Location();
/*****test*****/
//$mode = 'display_post';
//$fhid = '3';
//$lat = '13.8569991624617';
//$long = '100.6189623206482';
//$fbplaceid = 132901770097049;
/*****test*****/


$mode = $_POST["mode"];		

switch($mode){
	case "pin" : {
		$fbid = $_POST["fbid"];	
		$locate->getPlaceLatLng($fbid);
	}
	break;
	
	case "last_latlng" : {
		
		$locate->getLastLatLng();
	}
	break;
	
	case "get_user_data" : {
		$fbid = $_POST["fbid"];	
		
		$locate->getUserData($fbid);
	}
	break;
}
	
	
?>