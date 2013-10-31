<?php 

require_once "config.php";
require_once LIB_BASE."post.class.php";

$p = new Post();
/*****test*****/
//$mode = 'display_post';
//$fhid = '3';
//$lat = '13.8569991624617';
//$long = '100.6189623206482';
//$fbplaceid = 132901770097049;
/*****test*****/

$mode = $_POST["mode"];

switch($mode){
	case "add" : {
		$fbid = $_POST["fbid"];		
		$name = $_POST["name"];	
		$email = $_POST["email"];
		$message = $_POST["message"];
		$pin = $_POST["pin"];
		$num = $_POST["num"];
		$lat = $_POST["lat"];
		$lng = $_POST["lng"];
		
		$p->addData($fbid,$name,$email,$message,$pin,$num,$lat,$lng);
	}
	break;
	
	case "get" : {
		
		$p->getNumPost();
	}
	break;
}
	
	
?>