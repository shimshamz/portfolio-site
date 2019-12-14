<?php
$directory = getcwd() . "/portfolio-thumbnails/";
$filecount = 0;
$files = glob($directory . "*");
if ($files){
    $filecount = count($files);
}

$target = "portfolio-thumbnails/img" . ($filecount + 1) . ".JPG";
echo $target;
//move_uploaded_file($_FILES['image']['tmp_name'], $target);