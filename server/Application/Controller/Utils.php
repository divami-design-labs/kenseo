<?php
Class Utils{
    public function getRandomNumber($artefactId, $artefactLatestVersionId){
        return getRandomString(12) . $artefactId . $artefactLatestVersionId
    }
}