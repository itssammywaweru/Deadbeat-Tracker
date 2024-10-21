<?php

$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if image file is a valid image or fake
$check = getimagesize($_FILES["file"]["tmp_name"]);
if ($check !== false) {
    $uploadOk = 1;
} else {
    $uploadOk = 0;
}

// Check file size
if ($_FILES["file"]["size"] > 500000) { // Limit to 500KB
    $uploadOk = 0;
}

// Allow certain file formats
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo json_encode(['message' => 'Sorry, your file was not uploaded.']);
// Try to upload file
} else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo json_encode(['message' => 'File uploaded successfully', 'path' => $target_file]);
    } else {
        echo json_encode(['message' => 'Sorry, there was an error uploading your file.']);
    }
}
?>
