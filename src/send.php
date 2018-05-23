<?php

if(isset($_POST['name'])){$name = $_POST['name'];}

if(isset($_POST['tel'])){$tel = $_POST['tel'];}

$to = "<адрес почты для получения заявок с сайта>"  ; 
$subject = "Заявка на заказ звонка менеджера"; 

$msg = "Тип заявки: {$subject}\nИмя: {$name}\nТелефон: {$tel}";

$token='573400169:AAHG-frOs-mj14pDiSNnDkrQVgy9_zdycpk';
$query = [
    'chat_id' => -238405256,
    'parse_mode' => 'HTML',
    'text' => $msg
];

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/plain; charset=utf-8\r\n";
$headers .= "From: mail@mail.com\r\n";

if($name and $tel){
	
	mail($to, $subject, $msg, $headers);
					
	file_get_contents(sprintf('https://api.telegram.org/bot%s/sendMessage?%s', $token, http_build_query($query)
	));
	
}
?>