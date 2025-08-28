<?php
session_start();
require_once 'config/db.php';
require_once 'models/Video.php';

// Check if user is logged in and is admin
$isAdmin = isset($_SESSION['is_admin']) && $_SESSION['is_admin'] === true;

// Handle form submission (only if admin)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $isAdmin) {
    $title = $_POST['title'] ?? '';
    $youtubeId = $_POST['youtubeId'] ?? '';
    $description = $_POST['description'] ?? '';
    
    if (!empty($title) && !empty($youtubeId)) {
        $video = new Video();
        $video->create($title, $youtubeId, $description);
        // Redirect to prevent form resubmission
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit();
    }
}

// Get all videos
$videoModel = new Video();
$videos = $videoModel->getAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resources - Integrity First Home Loans</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
    <div id="header-placeholder"></div>

    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>Educational Resources</h1>
                <p class="subtitle">Learn more about home loans and the mortgage process</p>
            </div>
        </div>
    </section>

    <section class="services-overview">
        <div class="container">
            <h2>Video Library</h2>
            <div class="videos-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">
                <?php if (!empty($videos)): ?>
                    <?php foreach ($videos as $video): ?>
                        <div class="video-card" style="background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                                <iframe 
                                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                                    src="https://www.youtube.com/embed/<?= htmlspecialchars($video['youtubeId']) ?>" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
                                </iframe>
                            </div>
                            <div style="padding: 1.5rem;">
                                <h3 style="margin-bottom: 0.5rem; color: var(--primary-color);"><?= htmlspecialchars($video['title']) ?></h3>
                                <?php if (!empty($video['description'])): ?>
                                    <p style="color: var(--text-light);"><?= htmlspecialchars($video['description']) ?></p>
                                <?php endif; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <p style="text-align: center; grid-column: 1 / -1; color: var(--text-light);">No videos available yet.</p>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <?php if ($isAdmin): ?>
    <section class="calculator-section" style="background-color: var(--secondary-color);">
        <div class="container">
            <div class="calculator-card">
                <h2>Add New Video</h2>
                <form method="POST" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="display: flex; flex-direction: column;">
                        <label for="title" style="margin-bottom: 0.5rem; font-weight: 600;">Video Title</label>
                        <input type="text" id="title" name="title" required style="padding: 0.75rem; border: 1px solid var(--gray-medium); border-radius: var(--border-radius);">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label for="youtubeId" style="margin-bottom: 0.5rem; font-weight: 600;">YouTube ID</label>
                        <input type="text" id="youtubeId" name="youtubeId" required style="padding: 0.75rem; border: 1px solid var(--gray-medium); border-radius: var(--border-radius);">
                        <small style="color: var(--text-light); margin-top: 0.25rem;">The ID is the part after "v=" in the YouTube URL</small>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label for="description" style="margin-bottom: 0.5rem; font-weight: 600;">Description (Optional)</label>
                        <textarea id="description" name="description" rows="4" style="padding: 0.75rem; border: 1px solid var(--gray-medium); border-radius: var(--border-radius);"></textarea>
                    </div>
                    <button type="submit" class="btn" style="align-self: flex-start;">Add Video</button>
                </form>
            </div>
        </div>
    </section>
    <?php endif; ?>

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
