<?php
/**
 * Post
 * @access public
 * @author Mr.GRITSAKORN  VULLIYAMATEE <raider_ex@live.com>
 * @copyright Copyright (c) 2012, Freehap CO.,LTD.
 * @package Service Human Fence
 * @property string $db_options option of Pear database connection
 */

Class Post{
     
	 /**	 
	 * เพิ่มข้อมูล
	 * @param string $fhid รหัส  fhid,int $visitcount จำนวนการเข้าใช้ระบบ;
	 * @return -
	 * @access public
	 */	
	 function addData($fbid,$name,$email,$message,$pin,$num,$lat,$lng){
	 	    require_once "dbi.class.php";
			$db = new dbi();
			
			$arr = array();
			
			$db->clear();
			$db->dict["fbid"] = $fbid;
	        $db->dict["name"] = $name;
	        $db->dict["email"] = $email;
			$db->dict["createdate"] = date("Y-m-d H:i:s");
	   
			$db->table = "profile";

        	$hfid = $db->insertiden();
			
			$db->close();
			
			$this->postData($hfid,$message,$pin,$num,$lat,$lng);
			
			$arr[0] = array(
			     'lat'=>$lat,
			     'lng'=>$lng
			);
			
			echo '{"location":'.json_encode($arr).'}';
	 }
	 
	 /**	 
	 * เพิ่มข้อมูล
	 * @param string $fhid รหัส  fhid,int $visitcount จำนวนการเข้าใช้ระบบ;
	 * @return -
	 * @access public
	 */	
	 function postData($hfid,$message,$pin,$num,$lat,$lng){
	 		require_once "dbi.class.php";
			$db = new dbi();
				
	 		$db->clear();
			$db->dict["hfid"] = $hfid;
	        $db->dict["message"] = $message;
			$db->dict["pin"] = $pin;
			$db->dict["num"] = $num;
	        $db->dict["lat"] = $lat;
			$db->dict["lng"] = $lng;
	   
			$db->table = "post";

        	$db->insert();
			
			$db->close();
	 }
	 
	 /**	 
	 * เพิ่มข้อมูล
	 * @param string $fhid รหัส  fhid,int $visitcount จำนวนการเข้าใช้ระบบ;
	 * @return -
	 * @access public
	 */	
	 function getNumPost(){
	 	 require_once "dbi.class.php";
		 $db = new dbi();
		 
		 $db->clear();
		 $db->addfield("count(hfid) as num");
	     
	     $db->table="profile";
		
		 //echo $db->query2();exit();
		 if ($db->query()) {
             if ($row = $db->getrow()) {
             	 
				 $string = '';
				 
				 $s = strval($row["num"]);
				 $num_char = strlen($s);
				 
				 for($i = $num_char ; $i < 7 ; $i++)
				 {
				 	$string .= '0';
				 }
				 
				 $string .= $s;
				 
             	 $arr[0] = array(
				     'num'=> $string
				 );
             }
		}
		
		echo '{"post":'.json_encode($arr).'}';	
	 }
  	 
  	 /**	 
	 * เพิ่มข้อมูล
	 * @param string $fhid รหัส  fhid,int $visitcount จำนวนการเข้าใช้ระบบ;
	 * @return -
	 * @access public
	 */	
  	 function sendMail($email,$name,$subject,$body,$ishtml = true){
		
		require_once "class.phpmailer.php";

		$mail = new PHPMailer(); // การเรียกใช้งานไฟล์พื้นฐานในการส่งอีเมล์ 
		$mail->From = "y_ying_02@hotmail.com"; //อีเมล์แอดเดรสของผู้ส่ง (Sender address) 
		$mail->FromName = "Webmaster@WangkapeeHealthCenter.com"; //ชื่อผู้ส่ง (Sender Name) 
		$mail->Host = "localhost"; //ชื่อของเครื่องเซิร์ฟเวอร์ที่ให้บริการส่งอีเมล์ (SMTP mail server) ให้ระบุเป็น "localhost" 
		$mail->Mailer = "smtp"; //ชื่อวิธีการส่ง ให้ระบุเป็น "smtp"
		$mail->AddAddress($email,$name); //ฟังก์ชัน AddAddress(อีเมล์แอดเดรสของผู้รับ, ชื่อผู้รับ) 
		$mail->Subject = $subject; //ชื่อหัวข้อจดหมาย 
		$mail->Body = $body;

		$mail->IsHTML($ishtml); //กำหนดให้เป็น false ถ้าข้อความที่ต้องการส่งเป็นข้อความธรรมดา $mail->IsHTML(false); 
		//กำหนดให้เป็น true ถ้าข้อความที่ต้องการส่งเป็นเว็บเพจ $mail->IsHTML(true); 

		$mail->SMTPAuth = "true"; 
		$mail->Username = "HealthCenter"; 
		$mail->Password = "ying"; 

	   // คำสั่งในการส่งเมล์ 
		if(!$mail->Send()) 
		{ //กรณีส่งเมล์ไม่สำเร็จ 
		//echo "There was an error sending the message"; 
		} 
		else 
		{ //กรณีส่งเมล์ได้สำเร็จ 
		//echo "There was no error sending the message"; 
		} 

	}
}
?>
