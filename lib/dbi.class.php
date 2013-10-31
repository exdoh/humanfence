<?php

class dbi {
    private $host;
    private $uid;
    private $pwd;
    private $dbn;
    private $mysqli;
    public $errmsg;

    public $table;
    public $field;
    public $condition;
    public $order;
    public $groupby;
    public $limit;
    public $dict;

    function __construct() {
        $this->host = "freehapdb.clkpxvvhqb7t.us-west-2.rds.amazonaws.com";
        $this->dbn="human_fence";
        $this->uid="freehap";
        $this->pwd="howarewe";
        $this->clear();
    }

    public function close() {
        $this->mysqli->close();
    }

    public function clear() {
        $this->errmsg="";
        $this->table="";
        $this->field = "";
        $this->condition = "";
        $this->order = "";
        $this->groupby = "";
        $this->dict = array();
    }

    public function geninsert() {
        $fl = "";
        $vl = "";

        foreach ($this->dict as $key => $value) {
            if ($fl != "") { $fl = $fl.","; }
            if ($vl != "") { $vl = $vl.","; }

            $fl = $fl.$key;
            $vl = $vl.$this->pf($value);
        }

        $sql1 = "INSERT INTO ".$this->table." (".$fl.") VALUES (".$vl.")";

        return $sql1;
    }

    public function gendelete() {
        $sql1 = "";
        if ($this->condition != "") {
        $sql1 = "DELETE FROM ".$this->table." WHERE ".$this->condition;
        }
        return $sql1;
    }

    public function genupdate() {
        $sql1 = "";
        $pair = "";

        foreach ($this->dict as $key => $value) {
            if ($pair != "") {$pair = $pair.","; }

            $pair = $pair.$key."=".$this->pf($value);
        }

        $sql1 = "UPDATE ".$this->table." SET ".$pair;
        if ($this->condition != "") { $sql1 = $sql1." WHERE ".$this->condition; }
        return $sql1;
    }

    public function genselect() {
        $sql1 = "Select ".$this->field." from ".$this->table;
        if ($this->condition != "") {
            $sql1 = $sql1." where ".$this->condition;
        }
        if ($this->groupby != "") {
           $sql1 = $sql1." group by ".$this->groupby;
        }
        if ($this->order != "") {
            $sql1 = $sql1." order by ".$this->order;
        }
        if ($this->limit != "") {
            $sql1 = $sql1." limit ".$this->limit;
        }
        
        return  $sql1;
    }

    public function addlimit($start,$length) {
        $this->limit = $start.",".$length;
    }

    public function addfield($fl) {
        if ($this->field != "") {
            $this->field = $this->field.",";
        }
        $this->field = $this->field.$fl;
    }

    public function addjoin($tbla,$fla,$tblb,$flb,$join) {
        if ($this->table == "") {
            $this->table = $tbla;
        }
        $this->table = $this->table." ".$join." JOIN ".$tblb." ON ";
        $this->table = $this->table.$tbla.".".$fla." = ".$tblb.".".$flb." ";
    }

    // Add condition
    public function addcon($fl,$com,$vl,$oper = "and") {

        if ($this->condition != "" && $this->condition != " ( ") {
            $this->condition = $this->condition." ".$oper." ";
        }
        $this->condition = $this->condition.$fl." ".$com." ".$this->pf($vl);
    }
    public function addconbycon($fl,$com,$vl,$oper = "and") {

        if ($this->condition != "" ) {
            $this->condition = $this->condition." ".$oper." ";
        }
        $this->condition = $this->condition.$fl." ".$com." ".$vl;
    }
    public function addentry($x) {
            $this->condition = $this->condition." ".$x." ";
    }

    public function pf($vl) {
        if (is_int($vl)) { return strval($vl); }
        if (is_float($vl)) { return strval($vl); }
        if (is_string($vl)) {
            // check special charecter
            // double quote have a problem
            $vl =  str_replace(chr(92),chr(92).chr(92),$vl);
            $vl =  str_replace(chr(39),chr(92).chr(39),$vl);
            $vl =  str_replace(chr(34),chr(92).chr(34),$vl);

            return "'".$vl."'";
        }
        if (is_object($vl)) { return "'".$vl->getpf()."'"; }
    }

    // Insert
    public function insert() {
        $result = true;
        $this->mysqli = new mysqli($this->host, $this->uid, $this->pwd, $this->dbn);

        if ($this->mysqli->connect_error) {
            $result = false;
        }

        if (mysqli_connect_error()) {
            $result = false;
        }

        if ($result) {
            $sql = $this->geninsert();
            $sql = strip_tags($sql);
            $query = $this->mysqli->query("SET NAMES 'utf8'");
            $this->result = $this->mysqli->query($sql);
        }

        return $result;
        //return $sql;
    }
    
	// Insert
    public function insert2() {
        $result = true;
        $this->mysqli = new mysqli($this->host, $this->uid, $this->pwd, $this->dbn);

        if ($this->mysqli->connect_error) {
            $result = false;
        }

        if (mysqli_connect_error()) {
            $result = false;
        }

        if ($result) {
            $sql = $this->geninsert();
            $sql = strip_tags($sql);
            $query = $this->mysqli->query("SET NAMES 'utf8'");
            $this->result = $this->mysqli->query($sql);
        }

        //return $result;
        return $sql;
    }
	
    public function insertiden() {
        $result = true;
        $this->mysqli = new mysqli($this->host, $this->uid, $this->pwd, $this->dbn);

        if ($this->mysqli->connect_error) {
            $result = false;
        }

        if (mysqli_connect_error()) {
            $result = false;
        }

        if ($result) {
            $sql = $this->geninsert();
            $sql = strip_tags($sql);
            $query = $this->mysqli->query("SET NAMES 'utf8'");
            $this->result = $this->mysqli->query($sql);
            $result = $this->mysqli->insert_id;
        }

        return $result;
        //return $sql;
    }
    
	public function insertiden2() {
        $result = true;
        $this->mysqli = new mysqli($this->host, $this->uid, $this->pwd, $this->dbn);

        if ($this->mysqli->connect_error) {
            $result = false;
        }

        if (mysqli_connect_error()) {
            $result = false;
        }

        if ($result) {
            $sql = $this->geninsert();
            $sql = strip_tags($sql);
            $query = $this->mysqli->query("SET NAMES 'utf8'");
            $this->result = $this->mysqli->query($sql);
            $result = $this->mysqli->insert_id;
        }

        //return $result;
        return $sql;
    }

    // Update
    public function update() {
        $result = true;
        $this->mysqli = new mysqli($this->host, $this->uid, $this->pwd, $this->dbn);

        if ($this->mysqli->connect_error) {
            $result = false;
        }

        if (mysqli_connect_error()) {
            $result = false;
        }

        if ($result) {
            $sql = $this->genupdate();
            $sql = strip_tags($sql);
            $query = $this->mysqli->query("SET NAMES 'utf8'");
            $this->result = $this->mysqli->query($sql);
        }

        return $result;
        //return $sql;
    }

    public function update2() {
        $result = true;
        $this->mysqli = new mysqli($this->host, $this->uid, $this->pwd, $this->dbn);

        if ($this->mysqli->connect_error) {
            $result = false;
        }

        if (mysqli_connect_error()) {
            $result = false;
        }

        if ($result) {
            $sql = $this->genupdate();
            $sql = strip_tags($sql);
            $query = $this->mysqli->query("SET NAMES 'utf8'");
            $this->result = $this->mysqli->query($sql);
        }

        //return $result;
        return $sql;
    }

    //Delete
    public function delete() {
        $result = true;
        $this->mysqli = new mysqli($this->host, $this->uid, $this->pwd, $this->dbn);

        if ($this->mysqli->connect_error) {
            $result = false;
        }

        if (mysqli_connect_error()) {
            $result = false;
        }

        if ($result) {
            $sql = $this->gendelete();
            $sql = strip_tags($sql);
            $query = $this->mysqli->query("SET NAMES 'utf8'");
            $this->result = $this->mysqli->query($sql);
        }

        return $result;
        //return $sql;
    }
    
	//Delete
    public function delete2() {
        $result = true;
        $this->mysqli = new mysqli($this->host, $this->uid, $this->pwd, $this->dbn);

        if ($this->mysqli->connect_error) {
            $result = false;
        }

        if (mysqli_connect_error()) {
            $result = false;
        }

        if ($result) {
            $sql = $this->gendelete();
            $sql = strip_tags($sql);
            $query = $this->mysqli->query("SET NAMES 'utf8'");
            $this->result = $this->mysqli->query($sql);
        }

        //return $result;
        return $sql;
    }
	
    //Exist
    public function exist() {
        $result = true;
        $this->mysqli = new mysqli($this->host, $this->uid, $this->pwd, $this->dbn);

        if ($this->mysqli->connect_error) {
            $result = false;
        }

        if (mysqli_connect_error()) {
            $result = false;
        }

        if ($result) {
            $result = false;
            $sql = $this->genselect();
            $query = $this->mysqli->query("SET NAMES 'utf8'");
            $this->result = $this->mysqli->query($sql);

            while ($row = $this->getrow()) {
                $result = true;
            }
            $this->close();
        }

        return $result;
    }

    // get rows data from Query
    public function getrow() {
        return $this->result->fetch_assoc();
    }

    public function query() {
        $result = true;
        $this->mysqli = new mysqli($this->host, $this->uid, $this->pwd, $this->dbn);

        if ($this->mysqli->connect_error) {
            //die('Connect Error (' . $mysqli->connect_errno . ') '. $mysqli->connect_error);
            $result = false;
        }

        if (mysqli_connect_error()) {
            //die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
            $result = false;
        }

        if ($result) {
            $sql = $this->genselect();
            $query = $this->mysqli->query("SET NAMES 'utf8'");
            $this->result = $this->mysqli->query($sql);
        }
        return $result;
        //return $sql;
    }
        public function query2() {
        $result = true;
        $this->mysqli = new mysqli($this->host, $this->uid, $this->pwd, $this->dbn);

        if ($this->mysqli->connect_error) {
            //die('Connect Error (' . $mysqli->connect_errno . ') '. $mysqli->connect_error);
            $result = false;
        }

        if (mysqli_connect_error()) {
            //die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
            $result = false;
        }

        if ($result) {
            $sql = $this->genselect();
            $query = $this->mysqli->query("SET NAMES 'utf8'");
            $this->result = $this->mysqli->query($sql);
        }
        //return $result;
        return $sql;
    }

}


?>