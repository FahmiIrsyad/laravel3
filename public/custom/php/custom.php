<?php
include_once(__DIR__."/../../../Connections/exsite_admin_custom.php");


if (!function_exists("tag")) {

	function tag($code) {

        if (isset($_GET['tr']) && $_GET['tr']==1){
            

            if (isset($_SESSION['admin_lang_name']) && ($_SESSION['admin_lang_name']!="")){
                $lang_name = $_SESSION['admin_lang_name'];
                $lang_id = $_SESSION['admin_lang_id'];
            } else {
                $lang_name = $_SESSION['lang_name'];
                $lang_id = $_SESSION['lang_id'];
            }

           //  20230325 NAF :: Init Translation Feature from Microsoft
           if (isset($code) && ($code!="")){
                if(!isset($_SESSION['tr'][$code])) { // not found with current tag. try all lower case
                    // translate and insert in xs_tag
                    //error_log('Missing translation for code: ' . $code. '('.$_SESSION['admin_lang_name'].')');
                    $what = "Missing translation for code: ".$code;
                    $who = "Cik Maya";
                    $module = "Tag";
                    audit_trail($what,$who,$module);

                    $translated_tag = tag_translate($code, $lang_name);

                    if ($translated_tag!=""){
                        if (strtolower($translated_tag) == strtolower($code)) { // if the translated text is the same, dont create new tag
                            $what = "Tag Not translated for : ".$code." == ".$translated_tag;
                            audit_trail($what,$who,$module);
                        } else {
                            create_new_tag($code, $translated_tag, $lang_id);
                            $what = "Tag translated for : ".$code." -> ".$translated_tag;
                            audit_trail($what,$who,$module);
                        }

                    }
                    return $translated_tag;
                } else {
                    return $_SESSION['tr'][$code] ?? ucwords(str_replace('_', ' ', (string) $code));
                }
           } else {
               return $code;
           }

           /* if (isset($_SESSION['tr'][$code]) && ($_SESSION['tr'][$code]!="")){
                return $_SESSION['tr'][$code] ?? $code;
            } else {
                return "<a href=define_tag('".$code."',".$_SESSION['admin_lang_id'].")>Please define</a>";
            }*/
        } else {

            //return $_SESSION['tr'][$code] ?? ucwords(str_replace('_', ' ', $code));
            return $_SESSION['tr'][$code] ?? ucwords(str_replace('_', ' ', (string) $code));
        }

   }
}
if (!function_exists("create_new_tag")) {
	function create_new_tag($code, $translated_tag, $lang_id){
		
		include(__DIR__."/../../../Connections/exsite_admin_custom.php");
		mysqli_select_db($exsite,$database_exsite);
		$query_get_lang_code = sprintf("SELECT * FROM xs_tag  WHERE tag_code = %s ",
						GetSQLValueString($code,"text"));//echo $query_get_lang_code;
		$get_lang_code = executeQuery($exsite, $query_get_lang_code) or die(mysqli_error($exsite));
		$row_get_lang_code = mysqli_fetch_assoc($get_lang_code);
		$totalRows_get_lang_code = mysqli_num_rows($get_lang_code);


        if ($totalRows_get_lang_code==0){ // no translation exist
        	mysqli_select_db( $exsite, $database_exsite);
        	$query_create_new_tag = sprintf("INSERT INTO xs_tag (tag_name, tag_lang_id, tag_code) VALUES (%s, %s, %s)", GetSQLValueString($translated_tag,"text"), GetSQLValueString($lang_id,"int"), GetSQLValueString($code,"text"));  
            //error_log($query_create_new_tag);
        	$r_create_new_tag = executeQuery( $exsite, $query_create_new_tag) or die(mysqli_error($exsite));
        } else { // check for tag name. make sure it exists

        	$tag_name = ['tag_name'];

        	if ($tag_name == ''){
        		mysqli_select_db( $exsite, $database_exsite);
        		$query_update_old_tag = sprintf("UPDATE xs_tag  SET tag_name = %s WHERE tag_lang_id = %s  AND tag_code = %s ", GetSQLValueString($translated_tag,"text"), GetSQLValueString($lang_id,"int"), GetSQLValueString($code,"text"));  
                //error_log($query_update_old_tag);
        		$r_update_old_tag = executeQuery( $exsite, $query_update_old_tag) or die(mysqli_error($exsite));
        	}
        }
        load_translations($lang_id);
        
        

    }
}
if (!function_exists("tag_translate")) {
	function tag_translate($what,$to_lang){


		$subscription_key = "fe53f08cd8ea4784ba7c2186c9654c6b";
		$endpoint = "https://api-apc.cognitive.microsofttranslator.com";
		$path = "/translate?api-version=3.0";

		$params = "&to=".$to_lang;

		$text = $what;

		$requestBody = array (
			array (
				'Text' => $text,
			),
		);
		$content = json_encode($requestBody);

		$result = Translate ($endpoint, $path, $subscription_key, $params, $content);

        // Note: We convert result, which is JSON, to and from an object so we can pretty-print it.
        // We want to avoid escaping any Unicode characters that result contains. See:
        // http://php.net/manual/en/function.json-encode.php
		$json = json_decode($result, true);
        //print_r($json);
        //$data = ($json);
		return $json[0]["translations"][0]["text"];

	}
}

if (!function_exists('com_create_guid')) {
	function com_create_guid() {
		return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
			mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),
			mt_rand( 0, 0xffff ),
			mt_rand( 0, 0x0fff ) | 0x4000,
			mt_rand( 0, 0x3fff ) | 0x8000,
			mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
		);
	}
}   

if (!function_exists("Translate")) {    
	function Translate ($host, $path, $key, $params, $content) {

		$headers = "Content-type: application/json\r\n" .
		"Content-length: " . strlen($content) . "\r\n" .
		"Ocp-Apim-Subscription-Key: $key\r\n" .
		"Ocp-Apim-Subscription-Region: southeastasia\r\n" .
		"X-ClientTraceId: " . com_create_guid() . "\r\n";

        // NOTE: Use the key 'http' even if you are making an HTTPS request. See:
        // http://php.net/manual/en/function.stream-context-create.php
		$options = array (
			'http' => array (
				'header' => $headers,
				'method' => 'POST',
				'content' => $content
			)
		);
		$context  = stream_context_create ($options);
		$result = file_get_contents ($host . $path . $params, false, $context);
        //$result = curl_get_file_contents ($host . $path . $params);
		return $result;
	}

}
if (!function_exists("curl_get_file_contents")) {
	function curl_get_file_contents($url)  {
		$agent = "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)";
		$ch=curl_init();
		curl_setopt($ch, CURLOPT_URL,$url );
		curl_setopt($ch, CURLOPT_USERAGENT, $agent);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_VERBOSE,false);
		curl_setopt($ch, CURLOPT_TIMEOUT, 5);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSLVERSION,3);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

		$contents = curl_exec($ch);
		curl_close($ch);

		if ($contents) return $contents;
		else return FALSE;
	}
}
if (!function_exists("GetSQLValueString")) {
    function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") {

        switch ($theType) {
            case "text":
                $theValue = ($theValue != "") ? "'" . ($theValue) . "'" : "NULL";
                break;
            case "long":
            case "int":
                $theValue = ($theValue != "") ? floatval($theValue) : "NULL";
                break;
            case "double":
                $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
                break;
            case "date":
                $theValue = ($theValue != "") ? "'" . ($theValue) . "'" : "NULL";
                break;
            case "defined":
                $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
                break;
        }

        return $theValue;
    }
}


if (!function_exists("status_selesai")) {
    function status_selesai($what, $id_rekod) {
        
        if ($what == - 1 ) {
            return "Aduan Belum Selesai";
        } else {
            // Assuming you have a global database connection
            global $exsite;

            // Fetch data_aduan_baharu from data_aduan table using id_rekod
            $query_baharu = "SELECT data_aduan_baharu FROM data_aduan WHERE id_rekod = ?";
            $stmt_baharu = $exsite->prepare($query_baharu);
            $data_aduan_baharu = 0; // Default value

            if ($stmt_baharu) {
                // Bind the parameter and execute the statement
                $stmt_baharu->bind_param('i', $id_rekod);
                $stmt_baharu->execute();

                // Fetch the result
                $stmt_baharu->bind_result($data_aduan_baharu);
                $stmt_baharu->fetch();

                // Close the statement
                $stmt_baharu->close();
            } else {
                // Return an error message if the statement fails
                return "Error: Unable to prepare the statement for data_aduan.";
            }

            // Determine the query based on the value of data_aduan_baharu
            if ($data_aduan_baharu == 0) {
                $query = "SELECT status_selesai_html FROM status_selesai WHERE id_status_selesai = ?";
            } else {
                $query = "SELECT status_selesai_html FROM status_selesai WHERE status_selesai_id = ?";
            }

            // Initialize the prepared statement for status_selesai
            $stmt = $exsite->prepare($query);
            if ($stmt) {
                // Bind the parameter and execute the statement
                $stmt->bind_param('i', $what);
                $stmt->execute();

                // Fetch the result
                $stmt->bind_result($status_text);
                $stmt->fetch();

                // Close the statement
                $stmt->close();

                // Return the fetched status text or a default message if not found
                return $status_text ? $status_text : "Menunggu Tindakan Pegawai";
            } else {
                // Return an error message if the statement fails
                return "Error: Unable to prepare the statement for status_selesai.";
            }
        }
    }
}

if (!function_exists("status_tindakan")) {
    function status_tindakan($what, $id_rekod) {
        // Assuming you have a global database connection
        global $exsite;

        // Fetch data_aduan_baharu from data_aduan table using id_rekod
        $query_baharu = "SELECT data_aduan_baharu FROM data_aduan WHERE id_rekod = ?";
        $stmt_baharu = $exsite->prepare($query_baharu);
        $data_aduan_baharu = 0; // Default value
        
        if ($stmt_baharu) {
            // Bind the parameter and execute the statement
            $stmt_baharu->bind_param('i', $id_rekod);
            $stmt_baharu->execute();
            
            // Fetch the result
            $stmt_baharu->bind_result($data_aduan_baharu);
            $stmt_baharu->fetch();
            
            // Close the statement
            $stmt_baharu->close();
        } else {
            // Return an error message if the statement fails
            return "Error: Unable to prepare the statement for data_aduan.";
        }

        // Determine the query based on the value of data_aduan_baharu
        if ($data_aduan_baharu == 0) {
            $query = "SELECT xs_status_tindakan_text FROM xs_status_tindakan WHERE idxs_status_tindakan = ?";
        } else {
            $query = "SELECT xs_status_tindakan_text FROM xs_status_tindakan WHERE xs_status_tindakan_id = ?";
        }
        //echo $query;
        // Initialize the prepared statement for status_selesai
        $stmt = $exsite->prepare($query);
        if ($stmt) {
            // Bind the parameter and execute the statement
            $stmt->bind_param('i', $what);
            $stmt->execute();
            
            // Fetch the result
            $stmt->bind_result($status_text);
            $stmt->fetch();
            
            // Close the statement
            $stmt->close();

            // Return the fetched status text or a default message if not found
            return $status_text ? $status_text : "Menunggu Tindakan Pegawai";
        } else {
            // Return an error message if the statement fails
            return "Error: Unable to prepare the statement for status_selesai.";
        }
    }
}


if (!function_exists("sumber_aduan")) {
    function sumber_aduan($what,$old=0) {
        // Assuming you have a global database connection
        global $exsite;


        $query = "SELECT sumber_aduan_text FROM sumber_aduan WHERE id_sumber = ?";  

        
        // Initialize the prepared statement
        $stmt = $exsite->prepare($query);
        if ($stmt) {
            // Bind the parameter and execute the statement
            $stmt->bind_param('i', $what);
            $stmt->execute();
            
            // Fetch the result
            $stmt->bind_result($status_text);
            $stmt->fetch();
            
            // Close the statement
            $stmt->close();

            // Return the fetched status text or a default message if not found
            return $status_text ? $status_text : "Status not found";
        } else {
            // Return an error message if the statement fails
            return "Error: Unable to prepare the statement.";
        }
    }
}


if (!function_exists("status_berasas")) {
    function status_berasas($what) {
        // Assuming you have a global database connection
        global $exsite;
        $query = "SELECT status_berasas_text FROM status_berasas WHERE id_status = ?";  


        
        // Initialize the prepared statement
        $stmt = $exsite->prepare($query);
        if ($stmt) {
            // Bind the parameter and execute the statement
            $stmt->bind_param('i', $what);
            $stmt->execute();
            
            // Fetch the result
            $stmt->bind_result($status_text);
            $stmt->fetch();
            
            // Close the statement
            $stmt->close();

            // Return the fetched status text or a default message if not found
            return $status_text ? $status_text : "<div><span class='badge bg-danger text-white' style='font-size:0.7rem'>Belum Disemak</span><div><div><span class='badge bg-warning text-dark flash animated infinite' style='font-size:0.7rem'>Aduan Baharu</span><div>";
        } else {
            // Return an error message if the statement fails
            return "Error: Unable to prepare the statement.";
        }
    }
}
if (!function_exists('tempoh_dari_tarikh_aduan')) {
    function tempoh_dari_tarikh_aduan($tarikh_aduan) {
        // Convert the input date to a DateTime object
        $aduanDate = DateTime::createFromFormat('Y-m-d', $tarikh_aduan);
        
        // Check if the date conversion was successful
        if (!$aduanDate) {
            return 0;
        }
        
        // Get the current date
        $currentDate = new DateTime();

        // Calculate the difference between the dates (including today)
        $interval = $aduanDate->diff($currentDate);

        // Add 1 to include today in the count
        $days = $interval->days + 1;

        return $days;
    }
}

if (!class_exists('AdminUser')) {
    class AdminUser {
        private $idadmin_user;
        private $fullname;
        private $email;
        private $nohp;
        
        // Constructor to initialize the user based on idadmin_user
        public function __construct($idadmin_user) {
            global $exsite;
            $this->idadmin_user = $idadmin_user;

            // Query to fetch user details
            $query = "SELECT fullname, email, nohp FROM aduan_admin WHERE idadmin_user = ?";
            $stmt = $exsite->prepare($query);
            if ($stmt) {
                $stmt->bind_param('i', $this->idadmin_user);
                $stmt->execute();
                $stmt->bind_result($fullname, $email, $nohp);
                if ($stmt->fetch()) {
                    // Set the properties
                    $this->fullname = $fullname;
                    $this->email = $email;
                    $this->nohp = $nohp;
                } else {
                    // Set default values if the user is not found
                    $this->fullname = "Nama tidak ditemui";
                    $this->email = "Tidak ditemui";
                    $this->nohp = "Tidak ditemui";
                }
                $stmt->close();
            } else {
                // Handle query preparation error
                $this->fullname = "Error: Unable to prepare the statement.";
                $this->email = "";
                $this->nohp = "";
            }
        }

        // Getter methods
        public function getFullname() {
            return $this->fullname;
        }

        public function getEmail() {
            return $this->email;
        }

        public function getPhone() {
            return $this->nohp;
        }
    }
}
if (!function_exists('buildFlexibleSearchCondition')) {
function buildFlexibleSearchCondition($keywords, $columns) {
    $conditions = [];

    // Loop through each keyword
    foreach ($keywords as $keyword) {
        $keyword = trim($keyword); // Trim spaces
        if ($keyword === '') {
            continue;
        }

        // Create conditions for each column with LIKE matching for the keyword
        $columnConditions = [];
        foreach ($columns as $column) {
            $columnConditions[] = "$column LIKE '%$keyword%'";
        }

        // Combine conditions for each keyword with OR (e.g., "col1 LIKE '%keyword%' OR col2 LIKE '%keyword%'")
        $conditions[] = '(' . implode(' OR ', $columnConditions) . ')';
    }

    // Combine all keyword conditions with AND (to match all keywords)
    return implode(' AND ', $conditions);
}
}

if (!function_exists("township")) {
    function township($what) {
        // Assuming you have a global database connection
        global $exsite;

        // Fetch aduan_lokasi_text from aduan_lokasi table using aduan_lokasi_id
        $query_township = "SELECT aduan_lokasi_text FROM aduan_lokasi WHERE aduan_lokasi_id = ?";
        $stmt_township = $exsite->prepare($query_township);
        $data_township = null; // Default value to return if no data is found

        if ($stmt_township) {
            // Bind the parameter and execute the statement
            $stmt_township->bind_param('i', $what);
            $stmt_township->execute();
            
            // Bind the result
            $stmt_township->bind_result($data_township);
            $stmt_township->fetch();

            // Close the statement
            $stmt_township->close();
            
            // Return the fetched value
            return $data_township;
        } else {
            // Return an error message if the statement fails
            return "Error: Unable to prepare the statement for data_aduan.";
        }
    }
}
if (!function_exists("audit_trail")) {
    function audit_trail($what,$where,$who) {
        
        include(__DIR__."/../../../Connections/conn_audit.php");
        $query = "INSERT INTO audit_trail (audit_trail_text, audit_trail_moddate, audit_trail_module) VALUES (?, ?, ?)";echo $query;
        $stmt = $exsite_audit->prepare($query);
        
        $time = time();
        $stmt->bind_param('sis', $what, $time, $where);
        $stmt->execute();
    }
}

if (!function_exists("email_log")) {
function email_log($aduan_id, $user_id, $email_to, $email_text, $debug = false) {
    global $exsite; // Use the global $exsite variable for the database connection

    // SQL query for inserting email log
    $email_log_date = time();
    $email_log_type_id = 1;
    $query_email_log = "INSERT INTO xs_email_log (email_log_date, email_log_type_id, aduan_id, user_id, email_to, email_text) VALUES (?, ?, ?, ?, ?, ?)";

    // Prepare the statement
    $stmt = $exsite->prepare($query_email_log);
    if ($stmt) {
        // Bind the parameters
        $stmt->bind_param('iiiiss', $email_log_date, $email_log_type_id, $aduan_id, $user_id, $email_to, $email_text);

        // Debugging: Reconstruct the SQL query
        if ($debug) {
            reconstructAndLogQuery($query_email_log, 'iiiiss', [
                $email_log_date,
                $email_log_type_id,
                $aduan_id,
                $user_id,
                $email_to,
                $email_text
            ]);
        }

        // Execute the statement
        if ($stmt->execute()) {
            if ($debug) {
                error_log("Email log inserted successfully for aduan_id: $aduan_id");
            }
            $stmt->close();
            return true;
        } else {
            error_log("Failed to insert email log: " . $stmt->error);
            $stmt->close();
            return false;
        }
    } else {
        error_log("Prepare failed for email log: (" . $exsite->errno . ") " . $exsite->error);
        return false;
    }
}
}

/**
 * Helper function to reconstruct and log SQL query for debugging.
 */
if (!function_exists("reconstructAndLogQuery")) {
    function reconstructAndLogQuery($query, $types, $params) {
        global $exsite; // Use the global $exsite variable for escaping

        // Function to escape and quote parameters
        function escapeParam($conn, $type, $value) {
            if ($type === 'i') {
                return intval($value);
            } elseif ($type === 'd') {
                return floatval($value);
            } else { // 's' and others
                return "'" . mysqli_real_escape_string($conn, $value) . "'";
            }
        }

        // Validate $types
        if (is_string($types) && !is_null($types)) {
            $types_array = str_split($types);
            $values = [];
            foreach ($types_array as $index => $type) {
                if (isset($params[$index])) {
                    $escaped = escapeParam($exsite, $type, $params[$index]);
                    $values[] = $escaped;
                } else {
                    // Handle unexpected missing parameter
                    $values[] = "'MISSING_PARAM'";
                }
            }

            // Replace the placeholders with actual values
            $debug_query = $query;
            foreach ($values as $escaped_value) {
                $debug_query = preg_replace('/\?/', $escaped_value, $debug_query, 1);
            }

            // Log the reconstructed query
            error_log("Built SQL query: " . $debug_query);
        } else {
            error_log("Cannot reconstruct SQL query: \$types is NULL or not a string.");
        }
    }
}

if (!function_exists("selesai_aduan")) {
    function selesai_aduan($id_rekod) {
        global $exsite; // Use the global database connection

        // Get today's date in Y-m-d format
        $tarikh_selesai = date('Y-m-d');

        // Query to retrieve the tarikh_aduan for the given id_rekod
        $query_get_tarikh = "SELECT tarikh_aduan FROM data_aduan WHERE id_rekod = ?";
        $stmt_get = $exsite->prepare($query_get_tarikh);

        if ($stmt_get) {
            $stmt_get->bind_param('i', $id_rekod);
            $stmt_get->execute();
            $stmt_get->bind_result($tarikh_aduan);

            if ($stmt_get->fetch()) {
                $stmt_get->close();

                // Calculate the number of days between tarikh_aduan and today's date
                $date1 = new DateTime($tarikh_aduan);
                $date2 = new DateTime($tarikh_selesai);
                $tempoh = $date1->diff($date2)->days;

                // Update the data_aduan table
                $query_update = "UPDATE data_aduan SET status_selesai = 1, tarikh_selesai = ?, tempoh = ? WHERE id_rekod = ?";
                $stmt_update = $exsite->prepare($query_update);

                if ($stmt_update) {
                    $stmt_update->bind_param('sii', $tarikh_selesai, $tempoh, $id_rekod);
                    if ($stmt_update->execute()) {
                        $stmt_update->close();
                        return [
                            'success' => true,
                            'message' => "Aduan with id_rekod $id_rekod marked as completed successfully."
                        ];
                    } else {
                        $stmt_update->close();
                        return [
                            'success' => false,
                            'message' => "Failed to update aduan: " . $stmt_update->error
                        ];
                    }
                } else {
                    return [
                        'success' => false,
                        'message' => "Failed to prepare update statement: " . $exsite->error
                    ];
                }
            } else {
                $stmt_get->close();
                return [
                    'success' => false,
                    'message' => "No record found for id_rekod $id_rekod."
                ];
            }
        } else {
            return [
                'success' => false,
                'message' => "Failed to prepare select statement: " . $exsite->error
            ];
        }
    }

}
