<?php

    // require '../../thirdparty/PHPMailer/PHPMailerAutoload.php';

    class Email{
        public function getEmailTemplateUrl($emailName){
            return 'email/' . 'dummy-template' . '.html';
        }

        public function sendMail($dump){
            $result = new stdClass();
            //  $from = "sivakumar@gmail.com";
            $from = "venkateshwar@divami.com"; //$dump->from;
            //  $to = "narendra@divami.com";
            $to = $dump->to;
            //  $subject = "Test HTML mail";
            $subject = $dump->subject;

            $headers = "From: $from\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

            $message = $dump->message;
            if(!$message){
                // Get message from the template
                $message = file_get_contents(Email::getEmailTemplateUrl($dump->templateUrl));
            }
            
            // add common things to the body of the mail
            $message = "Hi <br />
            $dump->username <br /><br />

            $message <br />
            <br />
            This is automatically system generated email. <br />
            <a href='//kenseo.divami.com'>kenseo.divami.com</a>
            <br />
            <br />
            Regards, <br />
            Team Kenseo";
            // Caution (Windows only) When PHP is talking to a SMTP server directly,
            // if a full stop is found on the start of a line, it is removed.
            // To counter-act this, replace these occurrences with a double dot.
            // @TODO: make it only for windows
            if($dump->windows){
                $message = str_replace("\n.", "\n..", $message);
            }


            Master::getLogManager()->log(DEBUG, MOD_MAIN, "email data");
            Master::getLogManager()->log(DEBUG, MOD_MAIN, $to);
            Master::getLogManager()->log(DEBUG, MOD_MAIN, $subject);
            Master::getLogManager()->log(DEBUG, MOD_MAIN, $message);

            if (mail($to, $subject, $message, $headers)) {
                $result->status = "success";
                $result->message = "Your message has been sent successfully";
            } else {
                $result->status = "fail";
                $result->message = "Sorry, your message could not be sent";
            }

            return $result;
        }

        public function sendDummyMail($interpreter){
            $dump = new stdClass();

            $dump->from = "kamlekar.venkatesh@gmail.com";
            $dump->to = "venkateshwar@divami.com";
            $dump->subject = "Hello";
            $dump->message = "Hey";

            $this->sendMail($dump);
        }
    }
?>
