<?php
    class Image{
        public function getImage($path){
            // if jpg
            return imagecreatefromjpeg($path);
        }

        public function resizeImage($image, $attributes){
            // Create rectangle base for holding image
            $img_base = imagecreatetruecolor($attributes['rs_width'], $attributes['rs_height']);

            // paint the image with new resized dimensions in to the above created base image
            imagecopyresized(
                $img_base,                  // destination image base
                $image,                     // source image
                0,                          // destination x coordinate
                0,                          // destination y coordinate
                0,                          // source x coordinate
                0,                          // source y coordinate
                $attributes['rs_width'],    // resizing width
                $attributes['rs_height'],   // resizing height
                $attributes['actual_width'],// actual width
                $attributes['actual_height']// actual height
            );

            return $img_base;
        }

        public function getBase64Image($image, $mime){
            // $image = imagecreatefromstring($file);
            if(!$mime) $mime = "image/png";   // set default to png extension

            // start buffering
            ob_start();
            imagepng($image);
            $contents =  ob_get_contents();
            ob_end_clean();
            imagedestroy($image);

            return 'data:'. $mime . ';base64,' . base64_encode($contents);

        }
    }
?>
