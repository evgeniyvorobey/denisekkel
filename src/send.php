<?php

$name = $_POST['name'];
$phone = $_POST['phone'];
$token = "573400169:AAHG-frOs-mj14pDiSNnDkrQVgy9_zdycpk";
$chat_id = "-238405256";
$arr = array(
    'Имя: ' => $name,
    'Телефон: ' => $phone,
);

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");


?>
