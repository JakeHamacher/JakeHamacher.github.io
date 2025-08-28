<?php
session_start();
session_destroy();
// Clear the login cookie
setcookie('is_logged_in', '', time() - 3600, '/');
header('Location: index.html');
exit();
?>
