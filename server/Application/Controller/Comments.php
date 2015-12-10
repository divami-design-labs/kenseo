<?php 
	class Comments {
		public function createComment($interpreter) {
			$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;

			$db = Master::getDBConnectionManager();
		}
	}
?>
