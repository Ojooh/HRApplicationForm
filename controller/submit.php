<?php
    use PHPMailer\PHPMailer\PHPMailer; 
    use PHPMailer\PHPMailer\Exception; 
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';



    // var_dump($_SERVER['DOCUMENT_ROOT']);
    $config = parse_ini_file($_SERVER['DOCUMENT_ROOT'].'/HR/controller/HRdbCon.ini');
    $db = mysqli_connect("localhost",$config['username'],$config['password'],$config['db']);
    if(mysqli_connect_errno()){
        echo 'Database connection failed with following errors: '. mysqli_connect_error();
        die();
    } else {
        define('BASEURL', $_SERVER['DOCUMENT_ROOT'].'/HR/');
        function sanitize($dirty){
            $dirty = trim($dirty);
            //$dirty = stripslashes($dirty);
            $dirty = htmlspecialchars($dirty);
            $dirty = htmlentities($dirty,ENT_QUOTES,"UTF-8");
            return $dirty;
        }

        function sendMail ($to, $subject, $body, $paths) { 
            $mail = new PHPMailer;  
            // $mail->SMTPDebug = 3;
            $mail->isSMTP();  
            $mail->Host = 'server266.web-hosting.com'; 
            $mail->SMTPAuth = true;       
            $mail->Username = 'hr@orionrail.construction';
            $mail->Password = '?d#y;phN16IC'; 
            $mail->Port = 587;
            $mail->setFrom('hr@orionrail.construction', 'OrionrailHR'); 
            $mail->addReplyTo('hr@orionrail.construction', 'OrionrailHR'); 
            $mail->smtpConnect(
                array(
                    "ssl" => array(
                        "verify_peer" => false,
                        "verify_peer_name" => false,
                        "allow_self_signed" => true
                    )
                )
            ); 
            $mail->addAddress($to);
            //$mail->addCC('cc@example.com'); 
            //$mail->addBCC('bcc@example.com'); 
            $mail->isHTML(true); 
            $mail->Subject = $subject;
            $mail->Body    = $body;
            foreach ($paths as $path) {
                $mail->addAttachment($path);
            } 
            //SEND MAIL
            if(!$mail->send()) { 
                return 'Message could not be sent. Mailer Error: '.$mail->ErrorInfo; 
            } else { 
                return 'Message has been sent.'; 
            } 
        }

        if(isset($_POST) && !empty($_POST)){
            $allowed    = array('png','jpg','jpeg','gif');
            $photoName  = array();
            $clTmpLoc     = array();
            $cvTmpLoc     = array();
            $clUploadPath  = array();
            $cvUploadPath  = array();
            $first      = sanitize($_POST["first"]);
            $last       = sanitize($_POST["last"]);
            $email      = sanitize($_POST["email"]);
            $phone      = sanitize($_POST["phone"]);
            $dob        = sanitize($_POST["dob"]);
            $address    = sanitize($_POST["address"]);
            $country    = sanitize($_POST["country"]);
            $ad         = sanitize($_POST["ad"]);
            $salary     = sanitize($_POST["salary"]);
            $bodyContent = "<h1>" . $first . " " . $last . "Application for HR Assitant Data</h1>"; 
            $bodyContent .= "<p><b>Name: </b> " . $first . " " . $last . "</p><br>";
            $bodyContent .= "<p><b>Email: </b> " . $email . " </p><br> <p><b>Telephone: </b> " . $phone . "</p><br>"; 
            $bodyContent .= "<p><b>Date of Birth: </b> " . $dob . " </p><br> <p><b>country/state: </b> " . $country . "</p><br>"; 
            $bodyContent .= "<p><b>address: </b> " . $address . " </p><br> <p><b>advertisment: </b> " . $ad . "</p><br>";   
            $bodyContent .= "<p><b>Salary Exepectation: </b> &#8358;"  . number_format($salary, 2) . " </p><br>"; 
            $clPath     = "";
            $cvPath     = "";

            if (!isset($_FILES) || empty($_FILES || count($_FILES) <= 1) ) {
                $error = "Something went wrong, No files were uploaded";
                $data = array("error" => $error);
                echo json_encode($data);
            } else {
                $clName           = $_FILES['cl']['name'];
                $cvName           = $_FILES['cv']['name'];
                $clNameArray      = explode('.',$clName);
                $cvNameArray      = explode('.',$cvName);
                $clFileName       = $clNameArray[0];
                $cvFileName       = $cvNameArray[0];
                $clFileExt        = $clNameArray[1];
                $cvFileExt        = $cvNameArray[1];
                $clTmpLoc[]       = $_FILES['cl']['tmp_name'];
                $cvTmpLoc[]       = $_FILES['cv']['tmp_name'];
                $clFileSize       = $_FILES['cl']['size'];
                $cvFileSize       = $_FILES['cv']['size'];
                $clUploadName     = md5(microtime()).'.'.$clFileExt;
                $cvUploadName     = md5(microtime()).'.'.$cvFileExt;
                $clUploadPath[]   = BASEURL.'Docs/CoverLetter/'.$clUploadName;
                $cvUploadPath[]   = BASEURL.'Docs/Resume/'.$cvUploadName;
                if(($clFileSize != 0 && $_FILES['cl']['error'] == 0) && ($cvFileSize != 0 && $_FILES['cv']['error'] == 0)){
                    move_uploaded_file($clTmpLoc[0],$clUploadPath[0]);
                    move_uploaded_file($cvTmpLoc[0],$cvUploadPath[0]);
                    $clPath = '/Docs/CoverLetter/'.$clUploadName;
                    $cvPath = '/Docs/Resume/'.$cvUploadName;
                } else {
                    $clPath     = "";
                    $cvPath     = "";
                }
                $to = "hr@orionrail.construction";
                $subject1 = $last . " " . $first . " Application for HR Assistant";
                $subject2 = "Application for HR Assitant received successfully";
                $body = "Your application has been submitted successfully, please hold on as we receive a large volume of applications, we would go through yours and get back to you as soon as possible";
                $paths = array($clUploadPath[0], $cvUploadPath[0]);
                $SQLquery = "INSERT INTO applicants (`fname`, `lname`, `email`, `phone`, `dob`, `address`, `country`, `ad`, `salary`, `cl`, `cv`) VALUES 
                            ('" .$first . "', '". $last. "', '" .$email. "', '". $phone. "', '" . $dob . "', '" . $address . "', '" . $country . "', '" . $ad . "', '". $salary ."', '". $clPath . "' , '" . $cvPath . "')";
                // var_dump($SQLquery);
                $result = $db->query($SQLquery);
                // var_dump($result);
                if($result) {
                    $success = "Application Submitted Succesfully.";
                    $data = array("success" => $success);
                    sendMail ($to, $subject1, $bodyContent, $paths);
                    sendMail($email, $subject2, $body, []);
                    echo json_encode($data);
                    exit();
                } else {
                    $error = "Something went wrong, Please try again later.";
                    $data = array("error" => $error);
                    echo json_encode($data);
                    exit();
                }

            }
            

        }
    }

?>