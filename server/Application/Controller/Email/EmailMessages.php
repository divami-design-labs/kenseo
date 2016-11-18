<?php
Class EmailMessages{
    public function prepareMessages($data, $db){
        // Expected params
        // @by
        // @recipient_ids
        // @on
        // @type
        // @ref_id
        // @project_id
        // @act_id: could be the referring replace artefact id or newly added version's id 
        // @previous_permission_value
        // @new_permission_value
        // @previous_artefact_title

        $recipients = $data['recipient_ids'];

        $messages = array();

        foreach($recipients as $key => $recipientId){
            $data['recipient_id'] = $recipientId;
            $messages[] = EmailMessages::prepareMessage($data, $db);
        }


        return $messages;
    }

    public function customImplode($array){
        return join(' and ', array_filter(array_merge(array(join(', ', array_slice($array, 0, -1))), array_slice($array, -1)), 'strlen'));
    }

    public function prepareMessage($data, $db){
        $mail = new stdClass();

        // params
        $on         = $data['on'];
        $type       = $data['type'];

        //
        $senderId       = $data['by'];
        $receiverId     = $data['recipient_id'];
        $isSender       = $senderId == $receiverId;
        $otherUserIds   = join(',', array_diff($data['recipient_ids'], array($senderId)));

        if($on == "artefact"){
            if(!empty($otherUserIds)){
                $mailInfo = $db->singleObjectQuery(getQuery('artefactMailQuery', array(
                    'activitydoneuserid'    => $senderId,
                    'artefactversionids'    => $data['ref_ids'],
                    'receiveruserid'        => $receiverId,
                    'projectid'             => $data['project_id'],
                    '@otheruserids'         => $otherUserIds
                )));
            Master::getLogManager()->log(DEBUG, MOD_MAIN, "mailing-info");
            Master::getLogManager()->log(DEBUG, MOD_MAIN, $mailInfo);
            }else {
                $mailInfo = $db->singleObjectQuery(getQuery('artefactMailQueryWithoutUsers', array(
                    'activitydoneuserid'    => $senderId,
                    'artefactversionids'    => $data['ref_ids'],
                    'receiveruserid'        => $receiverId,
                    'projectid'             => $data['project_id'],
                )));
            }
        }
        elseif($on == "project"){
            if(!empty($otherUserIds)){
                $mailInfo = $db->singleObjectQuery(getQuery('projectMailQuery', array(
                    'activitydoneuserid'    => $senderId,
                    'receiveruserid'        => $receiverId,
                    'projectid'             => $data['project_id'],
                    '@otheruserids'         => $otherUserIds
                )));
            }else{
                $mailInfo = $db->singleObjectQuery(getQuery('projectMailQueryWithoutUsers', array(
                    'activitydoneuserid'    => $senderId,
                    'receiveruserid'        => $receiverId,
                    'projectid'             => $data['project_id']
                )));
            }
        }
        elseif($on == "user"){
            if($type == "add"){
                $mailInfo = $db->singleObjectQuery(getQuery('getOtherProjectMembersMailUserAdded', array(
                    "projectid" => $data['project_id'],
                    "userid" => $senderId,
                    "@addeduserids" => join(",", $data['added_user_ids']),
                    "receiveruserid" => $receiverId
                )));
            }elseif ($type == "delete") {

                $mailInfo = $db->singleObjectQuery(getQuery('getOtherProjectMembersMailUserRemoved', array(
                    "projectid" => $data['project_id'],
                    "userid" => $senderId,
                    "removeduserid" => $data['removeduserid'],
                    "receiveruserid" => $receiverId
                )));
            }else{
                $mailInfo = $db->singleObjectQuery(getQuery('getUserPermissionMail', array(
                    "projectid" => $data['project_id'],
                    "userid" => $senderId,
                    "receiveruserid" => $receiverId
                )));
            }

        }

        if(!$mailInfo){
            return false;
        }

        $projectName            = $mailInfo->{'project_name'};
        $artefactTitle          = $mailInfo->{'artefact_title'};
        $senderName             = $mailInfo->{'activity_done_user_name'};
        $userName               = $mailInfo->{'receivers_user_name'};
        $userEmail              = $mailInfo->{'receivers_user_email'};
        $otherUserNames         = EmailMessages::customImplode(explode(", ", $mailInfo->{'other_user_names'}));

        $you                    = $isSender? "you": $senderName;


        $mail = new stdClass();
        $mail->username = $userName;

        if($on == "artefact"){
            if($type == "add"){
                if($isSender){  // is the sender
                    $mail->subject  = "$projectName: An artefact has been added by $you";
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is added by you";
                    if($otherUserNames){
                        $mail->message .= " and has been shared with $otherUserNames";
                    }
                }
                else{  // is receiver
                    // When an artefact is added and there are recipients, 
                    // instead of the mail going as "artefact added" it will go as
                    // "artefact is shared"
                    $mail->subject  = "$projectName: An artefact has been shared with you";
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is shared with you by $senderName";
                }
            }
            elseif ($type == "share"){
                if($isSender){
                    $mail->subject  = "$projectName: An artefact has been shared by you";
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is shared by you with '$otherUserNames'";
                }
                else{
                    $mail->subject  = "$projectName: An artefact has been shared with you";
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is shared with you by $senderName";
                }
            }
            elseif($type == "edit"){
                $mail->subject  = "$projectName: An artefact has been edited by $you";
                if($isSender){
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is edited by you";
                }
                else{
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is edited by $senderName";
                }
            }
            elseif($type == "rename"){
                $renamedArtefactTitle   = $mailInfo->{'artefact_title'};

                $mail->subject  = "$projectName: An artefact has been renamed by $you";
                if($sender){
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is renamed to '$renamedArtefactTitle' by you";
                }
                else{
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is renamed to '$renamedArtefactTitle' by $senderName";
                }
            }
            elseif($type == "delete"){
                $mail->subject  = "$projectName: An artefact has been deleted by $you";
                if($isSender){
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is deleted by you";
                }
                else{
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is deleted by $senderName";
                }
            }
            elseif($type == "archive"){
                $mail->subject  = "$projectName: An artefact has been archived by $you";
                if($isSender){
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is archived by you";
                }
                else{
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is archived by $senderName";
                }
            }
            elseif($type == "replace"){
                $mail->subject  = "$projectName: An artefact has been replaced by $you";
                if($isSender){
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is replaced by you with '$otherArtefactTitle'";
                }
                else{
                    $mail->message  = "Artefact '$artefactTitle' in $projectName is replaced by $senderName with '$otherArtefactTitle'";
                }
            }
            elseif($type == "add version"){
                $mail->subject  = "$projectName: A new version added to an artefact by $you";
                // if($isSender){
                $mail->message  = "Artefact '$artefactTitle' in $projectName has been added a new version '$otherArtefactTitle' by $you";
                // }
                // else{
                //     $mail->message  = "";
                // }
            }
            elseif($type == "submit"){
                $mail->subject  = "$projectName: An artefact has been submitted by $you";
                $mail->message  = "An artefact '$artefactTitle' from project '$projectName' has been submitted by $you";
            }
        }
        elseif($on == "project"){
            if($type == "add"){
                $mail->subject  = "$projectName: A new project has been added by $you";
                if($isSender){
                    $mail->message  = "A new project '$projectName' has been added by you";
                }
                else{
                    $mail->message  = "You have been added to Project '$projectName' by $senderName";
                }
            }
            elseif($type == "delete"){
                $mail->subject  = "$projectName: This project has been deleted by $you";
                $mail->message  = "The project '$projectName' has been deleted by $you";
            }
            elseif($type == "archive"){
                $mail->subject  = "$projectName: This project has been archived by $you";
                $mail->message  = "The project '$projectName' has been archived by $you";
            }
            elseif($type == "unarchive"){
                $mail->subject  = "$projectName: This project has been unarchived by $you";
                $mail->message  = "The project '$projectName' has been unarchived by $you";
            }
            elseif($type == "add cover image"){
                $mail->subject  = "$projectName: Cover image changed by $you";
                $mail->message  = 'The project "$projectName"\'s cover image has been changed by $you';
            }

        }
        elseif($on == "meeting"){

        }
        elseif($on == "user"){
            if($type == "add"){

                // $mailData->to = $info->emails;
                $addedUsers = $mailInfo->{'added_users'};
                $addedUsersCount = count(explode(",", $addedUsers));
                $activityDoneUser = $mailInfo->{'activity_done_user_name'};
                $projectName = $mailInfo->{'project_name'};
                $emails = explode(",", $mailInfo->emails);
                $addedUserEmails = explode(",", $mailInfo->{'added_user_emails'});

                $verb = $addedUsersCount > 1 ? "are" : "is";
                $plural = $addedUsersCount > 1 ? "s" : "";


                if($isSender){
                    $mail->subject  = "$projectName: New User$plural $verb added by you";
                    $mail->message  = "You added '$addedUsers' to project '$projectName'";
                }elseif (in_array($receiverId , $data['added_user_ids'])) {
                    $mail->subject  = "$projectName: New User$plural $verb added by $you";
                    $mail->message  = "You are added to project '$projectName' by $you";
                }else {
                    $mail->subject  = "$projectName: New User$plural $verb added by $you";
                    $mail->message  = "New User$plural '$addedUsers' $verb added to project '$projectName' by $you";
                }
            }
            elseif($type == "delete"){

                $removedUsers = $mailInfo->{'removed_users'};
                $removedUsersArray = explode(",", $removedUsers);
                $removedUsersCount = count($removeUsersArray);
                $activityDoneUser = $mailInfo->{'activity_done_user_name'};
                $projectName = $mailInfo->{'project_name'};
                $emails = explode(",", $mailInfo->emails);
                $removedUserEmails = explode(",", $mailInfo->{'removed_user_emails'});

                $verb = $removedUsersCount > 1 ? "are" : "is";
                $plural = $removedUsersCount > 1 ? "s" : "";

                if($isSender){
                    $mail->subject  = "$projectName: User$plural $verb removed by you";
                    $mail->message  = "You removed '$removedUsers' from project '$projectName'";
                }elseif ($receiverId == $data['removeduserid']) {
                    $mail->subject  = "$projectName: User$plural $verb removed by $you";
                    $mail->message  = "You are removed from project '$projectName' by $you";
                }else {
                    $mail->subject  = "$projectName: User$plural $verb removed by $you";
                    $mail->message  = "User$plural '$removedUsers' $verb removed from project '$projectName' by $you";
                }
            }
            elseif($type == "change permission"){
                // $previousPermission     = $mailInfo;
                // $newPermission          = $mailInfo;
                if($isSender){
                    $mail->subject  = "$projectName: You changed a user's permissions";
                    $mail->message  = "You changed $recipientName's permission from '$previousPermission' to '$newPermission' on project '$projectName'
                    ";
                }
                else{
                    $mail->subject  = "$projectName: Your permissions have been changed";
                    $mail->message  = "Your permissions on project '$projectName' has been changed from '$previousPermission' to '$newPermission'";
                }
            }
            // elseif($type == "delete"){
            //     if($isSender){
            //         $mail->subject  = '';
            //         $mail->message  = '';
            //     }
            //     else{
            //         $mail->subject  = '';
            //         $mail->message  = '';
            //     }
            // }
        }


        $mail->to       =  $userEmail;

        return $mail;

    }
}

?>