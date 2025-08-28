<?php
session_start();
require_once 'config/db.php';
require_once 'models/User.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if (!empty($email) && !empty($password)) {
        $userModel = new User();
        $user = $userModel->findByEmail($email);
        
        if ($user && $userModel->verifyPassword($user, $password)) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['is_admin'] = $user['isAdmin'];
            
            // Redirect to resources page
            header('Location: resources.php');
            exit();
        } else {
            $error = 'Invalid email or password';
        }
    } else {
        $error = 'Please fill in all fields';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Integrity First Home Loans</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
    <div id="header-placeholder"></div>

    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>Admin Login</h1>
                <p class="subtitle">Access the video management system</p>
            </div>
        </div>
    </section>

    <section class="services-overview">
        <div class="container">
            <div class="calculator-card">
                <h2>Login</h2>
                <?php if ($error): ?>
                    <p style="color: red; margin-bottom: 1rem;"><?= htmlspecialchars($error) ?></p>
                <?php endif; ?>
                <form method="POST">
                    <div style="display: flex; flex-direction: column; margin-bottom: 1rem;">
                        <label for="email" style="margin-bottom: 0.5rem; font-weight: 600;">Email</label>
                        <input type="email" id="email" name="email" required style="padding: 0.75rem; border: 1px solid var(--gray-medium); border-radius: var(--border-radius);">
                    </div>
                    <div style="display: flex; flex-direction: column; margin-bottom: 1rem;">
                        <label for="password" style="margin-bottom: 0.5rem; font-weight: 600;">Password</label>
                        <input type="password" id="password" name="password" required style="padding: 0.75rem; border: 1px solid var(--gray-medium); border-radius: var(--border-radius);">
                    </div>
                    <button type="submit" class="btn">Login</button>
                </form>
            </div>
        </div>
    </section>

    <div id="footer-placeholder"></div>

    <script>
        // Load header and footer
        document.addEventListener('DOMContentLoaded', function() {
            fetch('templates/header.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('header-placeholder').innerHTML = data;
                    // Re-initialize mobile menu
                    if (typeof initMobileMenu === 'function') {
                        initMobileMenu();
                    }
                });

            fetch('templates/footer.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('footer-placeholder').innerHTML = data;
                });
        });
    </script>
</body>
</html>
