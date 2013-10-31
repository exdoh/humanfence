<?php
/**
 * Location เป็นคลาสเพื่อแปลงค่า จาก Facebook id เป็น  Freehap id หรือ แปลง Freehap id เป็น Facebook id
 * @access public
 * @author Mr.GRITSAKORN  VULLIYAMATEE <raider_ex@live.com>
 * @copyright Copyright (c) 2011, Freehap CO.,LTD.
 * @package Service Freehap
 * @property string $db_options option of Pear database connection
 */

Class Location{
     
	 /**	 
	 * เพิ่มข้อมูลการเข้าใช้งานระบบ
	 * @param string $fhid รหัส  fhid,int $visitcount จำนวนการเข้าใช้ระบบ;
	 * @return -
	 * @access public
	 */	
	 function getPlaceLatLng($fbid){
	 	    require_once "dbi.class.php";
			$db = new dbi();
			
			$arr = array();
			$i = 0;
			
			$db->clear();
			$db->addfield("profile.fbid");
			$db->addfield("profile.name");
			$db->addfield("post.message");
			$db->addfield("post.pin");
		    $db->addfield("post.lat");
			$db->addfield("post.lng");
	
		    $db->table="profile";
			$db->addjoin("profile", "hfid", "post", "hfid", "INNER");
			//$db->addlimit(0, 2);
			//echo $db->query2();exit();
			if ($db->query()) {
	             while ($row = $db->getrow()) {
	             	 $arr[$i] = array(
	             	 	 'fbid'=>$row["fbid"],
	             	 	 'name'=>$row["name"],
	             	 	 'message'=>$row["message"],
					     'pin'=>$row["pin"],
					     'lat'=>$row["lat"],
					     'lng'=>$row["lng"]
					 );
					 $i++;
	             }
			}
			
			echo '{"location":'.json_encode($arr).'}';	
	 }
	 
	 /**	 
	 * เพิ่มข้อมูลการเข้าใช้งานระบบ
	 * @param string $fhid รหัส  fhid,int $visitcount จำนวนการเข้าใช้ระบบ;
	 * @return -
	 * @access public
	 */	
	 function getLastLatLng(){
	 	    require_once "dbi.class.php";
			$db = new dbi();
			
			$arr = array();
			
			$db->clear();
			$db->addfield("pin");
			$db->addfield("num");
		    $db->addfield("lat");
			$db->addfield("lng");
	
		    $db->table="post";
			$db->order = "hfid desc";
			
			$db->addlimit(0, 1);
			//echo $db->query2();exit();
			if ($db->query()) {
	             if ($row = $db->getrow()) {
	             	 $arr[0] = array(
					     'pin'=>$row["pin"],
					     'num'=>$row["num"],
					     'lat'=>$row["lat"],
					     'lng'=>$row["lng"]
					 );
	             }
			}
			
			echo '{"location":'.json_encode($arr).'}';	
	 }
	 
	 /**	 
	 * เพิ่มข้อมูลการเข้าใช้งานระบบ
	 * @param string $fhid รหัส  fhid,int $visitcount จำนวนการเข้าใช้ระบบ;
	 * @return -
	 * @access public
	 */	
	 function getUserData($fbid){
	 	    require_once "dbi.class.php";
			$db = new dbi();
			
			$arr = array();
			
			$db->clear();
			$db->addfield("profile.name");
			$db->addfield("post.message");
			$db->addfield("post.pin");
		    $db->addfield("post.lat");
			$db->addfield("post.lng");
	
		    $db->table="profile";
			$db->addjoin("profile", "hfid", "post", "hfid", "INNER");
			$db->addcon("profile.fbid", "=", $fbid);
			//echo $db->query2();exit();
			if ($db->query()) {
	             if ($row = $db->getrow()) {
	             	 $arr[0] = array(
	             	 	 'name'=>$row["name"],
	             	 	 'message'=>$row["message"],
					     'pin'=>$row["pin"],
					     'lat'=>$row["lat"],
					     'lng'=>$row["lng"]
					 );
	             }
			}
			
			echo '{"location":'.json_encode($arr).'}';	
	 }
}
?>
