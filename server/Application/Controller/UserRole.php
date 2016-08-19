<?php
Class UserRole{
    // variables
    // private $userId = null;
    // private $db     = null;
    // private $params = null;
    // // constructor
    // public __construct($userId, $db, $params){
    //     $this->userId   = $userId;
    //     $this->db       = $db;
    //     $this->params   = $params;
    // }
    //
    // Common functions
    //
    public function isSuperAdmin($userId){
        // This user has all privileges

    }

    public function isJustAMember($userId){
        return !$this->isSuperAdmin($userId);
    }

    public function isEmployee(){
        // The user is employee of the company
        
    }

    public function isOutsider(){
        // the user is client or not employee of the company
    }

    // App related roles
    public function isOwnerOfArtefactVersion(){

    }

    public function isOwnerOfProject(){
        // owner of project is not always supposed to be the super user
        // super user can transfer ownership to non super user (Interaction pending)
    }

    public function isCreatorOfMeetingInvitation(){

    }

    //
    // Action related functions
    //
    public function canAddArtefact(){

    }

    public function canAddArtefactVersion(){
        // super users, users in project and owner
    }

    public function canCreateArtefact(){

    }

    public function canReplaceArtefact(){
        // super users, users in project and owner
    }

    public function canShareArtefact(){
        // super users, users in project and owner
        // based on shared permissions
    }

    public function canArchiveArtefact(){
        // super users, users in project and owner
    }

    public function canUnArchiveArtefact(){
        // super users, users in project and owner
    }

    public function canAddCommentOnArtefact(){
        // super users, users in project and owner
        // Depends on comment permissions

    }

    public function canAddProject(){

    }

    public function canAddNotesToMeetingInvitation(){

    }

    public function canAddPeople(){
        // super users and project owner
    }

    public function canRemovePeople(){
        // super users and project owner
    }

    public function canManageArtefactPermissions(){
        // users in project
    }

    public function canDownloadArtefact(){

    }

    public function canDownloadProjectArtefacts(){

    }
}
