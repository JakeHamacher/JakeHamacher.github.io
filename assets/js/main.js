// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mortgage calculator functionality
    const paymentCalculator = document.getElementById('paymentCalculator');
    if (paymentCalculator) {
        paymentCalculator.addEventListener('submit', function(e) {
            e.preventDefault();
        
            // Get input values
            const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
            const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
            const loanTerm = parseFloat(document.getElementById('loanTerm').value) || 0;
            const propertyTax = parseFloat(document.getElementById('propertyTax').value) || 0;
            const homeInsurance = parseFloat(document.getElementById('homeInsurance').value) || 0;
            const loanType = document.getElementById('loanType').value;
        
            // Validate inputs
            if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
                alert('Please enter valid values for loan amount, interest rate, and loan term.');
                return;
            }
        
            // Calculate monthly payment
            const monthlyRate = interestRate / 100 / 12;
            const termMonths = loanTerm * 12;
            const mortgagePayment = loanAmount * monthlyRate * 
                Math.pow(1 + monthlyRate, termMonths) / 
                (Math.pow(1 + monthlyRate, termMonths) - 1);
        
            // Calculate additional monthly costs
            const monthlyTax = propertyTax / 12;
            const monthlyInsurance = homeInsurance / 12;
            const totalPayment = mortgagePayment + monthlyTax + monthlyInsurance;
        
            // Format and display results
            const resultDiv = document.getElementById('calculatorResult');
            resultDiv.innerHTML = `
                <h3>Estimated Monthly Payment</h3>
                <p class="payment-breakdown">Principal & Interest: <strong>$${mortgagePayment.toFixed(2)}</strong></p>
                <p class="payment-breakdown">Property Tax: <strong>$${monthlyTax.toFixed(2)}</strong></p>
                <p class="payment-breakdown">Home Insurance: <strong>$${monthlyInsurance.toFixed(2)}</strong></p>
                <p class="payment-total">Total Payment: <strong>$${totalPayment.toFixed(2)}</strong></p>
                <p class="loan-type">Loan Type: <strong>${document.querySelector('#loanType option:checked').textContent}</strong></p>
            `;
            resultDiv.style.display = 'block';
            
            // Scroll to results
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // Multi-step form functionality
    const applicationForm = document.querySelector('.application-form');
    if (applicationForm) {
        const steps = document.querySelectorAll('.form-step');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const submitBtn = document.getElementById('submitBtn');
        let currentStep = 0;

        function showStep(index) {
            // Update step visibility
            steps.forEach((step, i) => {
                step.classList.toggle('active', i === index);
            });
            
            // Update button visibility
            prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
            nextBtn.style.display = index === steps.length - 1 ? 'none' : 'inline-block';
            submitBtn.style.display = index === steps.length - 1 ? 'inline-block' : 'none';
            
            // Update progress bar
            const progressPercent = ((index) / (steps.length - 1)) * 100;
            document.querySelector('.progress-fill').style.width = `${progressPercent}%`;
            
            // Update step indicators
            document.querySelectorAll('.step').forEach((step, i) => {
                if (i <= index) {
                    step.classList.add('completed');
                    step.classList.add('active');
                } else {
                    step.classList.remove('completed');
                    step.classList.remove('active');
                }
            });
        }

        // Next button handler
        nextBtn.addEventListener('click', () => {
            const inputs = steps[currentStep].querySelectorAll('input, select');
            const valid = Array.from(inputs).every(input => input.checkValidity());
            
            if (valid) {
                currentStep++;
                showStep(currentStep);
            } else {
                inputs.forEach(input => input.reportValidity());
            }
        });

        // Previous button handler
        prevBtn.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });

        // Form submission
        applicationForm.addEventListener('submit', function(e) {
            // Let the form submit naturally to FormSubmit
            // No need for preventDefault() or manual handling
            console.log('Form submitted to FormSubmit');
        });

        // Initialize form
        showStep(currentStep);

        function validateCurrentStep(step) {
            let isValid = true;
            const currentStepFields = applicationForm.querySelectorAll(`.step-${step} [required]`);
            
            currentStepFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                alert('Please fill in all required fields');
            }

            return isValid;
        }

        function updateFormDisplay() {
            // Hide all steps
            document.querySelectorAll('.form-step').forEach(step => {
                step.classList.remove('active');
            });
            // Show current step
            document.querySelector(`.step-${currentStep}`).classList.add('active');
        }

        function updateProgress() {
            // Update progress bar
            const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
            document.querySelector('.progress-fill').style.width = `${progressPercent}%`;
            
            // Update step indicators
            document.querySelectorAll('.step').forEach((step, index) => {
                if (index < currentStep) {
                    step.classList.add('completed');
                    step.classList.add('active');
                } else {
                    step.classList.remove('completed');
                    step.classList.remove('active');
                }
            });
        }
    }
    // Testimonial Carousel
    const initTestimonialCarousel = () => {
        const testimonials = document.querySelectorAll('.testimonial');
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        if (testimonials.length === 0) return;
        
        // Create indicators
        testimonials.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => setActiveTestimonial(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        let currentIndex = 0;
        
        const setActiveTestimonial = (index) => {
            // Update testimonials
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            testimonials[index].classList.add('active');
            
            // Update indicators
            document.querySelectorAll('.carousel-indicator').forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        };
        
        // Navigation handlers
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = testimonials.length - 1;
            setActiveTestimonial(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            setActiveTestimonial(newIndex);
        });
        
        // Auto-rotate every 5 seconds
        let autoRotateTimer;
        
        const startAutoRotate = () => {
            clearInterval(autoRotateTimer);
            autoRotateTimer = setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            setActiveTestimonial(newIndex);
            }, 9000);
        };

        // Start initial timer
        startAutoRotate();

        // Reset timer on user interaction
        prevBtn.addEventListener('click', startAutoRotate);
        nextBtn.addEventListener('click', startAutoRotate);
        document.querySelectorAll('.carousel-indicator').forEach(indicator => {
            indicator.addEventListener('click', startAutoRotate);
        });
    };

    // Initialize testimonial carousel
    initTestimonialCarousel();

    // Video Management System
    const videoAdminForm = document.getElementById('videoAdminForm');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const videoContainer = document.getElementById('video-container');

    // Check authentication status and update UI
    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/check', {
                credentials: 'include'
            });
            const { isAuthenticated, isAdmin } = await response.json();
            
            // Toggle admin controls
            const adminElements = document.querySelectorAll('.admin-only');
            adminElements.forEach(el => {
                el.style.display = isAuthenticated && isAdmin ? 'block' : 'none';
            });

            // Update login/logout buttons
            if (loginForm) loginForm.style.display = isAuthenticated ? 'none' : 'block';
            if (logoutBtn) logoutBtn.style.display = isAuthenticated ? 'block' : 'none';

            return { isAuthenticated, isAdmin };
        } catch (err) {
            console.error('Auth check failed:', err);
            return { isAuthenticated: false, isAdmin: false };
        }
    };

    // Load and display videos from database
    const loadVideos = async () => {
        try {
            const response = await fetch('/api/videos');
            const videos = await response.json();
            
            videoContainer.innerHTML = '';
            
            const { isAdmin } = await checkAuth();
            
            videos.forEach(video => {
                // Extract YouTube ID from URL if needed
                let videoId = video.youtubeId;
                if (video.youtubeId.includes('youtube.com')) {
                    const url = new URL(video.youtubeId);
                    videoId = url.searchParams.get('v') || video.youtubeId.split('/').pop();
                }

                const videoHTML = `
                    <div class="video-item" data-id="${video._id}">
                        <iframe src="https://www.youtube.com/embed/${videoId}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen></iframe>
                        <div class="video-info">
                            <h3>${video.title}</h3>
                            ${video.description ? `<p>${video.description}</p>` : ''}
                            ${isAdmin ? `<button class="btn btn-small delete-video">Delete</button>` : ''}
                        </div>
                    </div>
                `;
                videoContainer.insertAdjacentHTML('beforeend', videoHTML);
            });
        } catch (err) {
            console.error('Failed to load videos:', err);
            videoContainer.innerHTML = '<p class="error">Failed to load videos. Please try again later.</p>';
        }
    };

    // Handle video form submission
    if (videoAdminForm) {
        videoAdminForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const videoUrl = document.getElementById('videoUrl').value;
            const videoTitle = document.getElementById('videoTitle').value;
            const videoDescription = document.getElementById('videoDescription').value;
            
            if (!videoUrl || !videoTitle) {
                alert('Please provide at least a URL and title');
                return;
            }

            // Extract YouTube video ID
            let videoId;
            try {
                const url = new URL(videoUrl);
                videoId = url.searchParams.get('v');
                if (!videoId) {
                    // Handle youtu.be format
                    videoId = url.pathname.split('/').pop();
                }
            } catch {
                alert('Please enter a valid YouTube URL');
                return;
            }

            if (!videoId) {
                alert('Could not extract video ID from URL');
                return;
            }

            try {
                const response = await fetch('/api/videos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        title: videoTitle,
                        description: videoDescription,
                        youtubeId: videoId
                    })
                });

                if (response.ok) {
                    videoAdminForm.reset();
                    await loadVideos();
                } else {
                    alert('Failed to add video');
                }
            } catch (err) {
                console.error('Error adding video:', err);
                alert('Error adding video');
            }
        });
    }

    // Handle login form
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                
                if (response.ok) {
                    await checkAuth();
                    loginForm.reset();
                    // Hide login modal if exists
                    const loginModal = document.getElementById('loginModal');
                    if (loginModal) loginModal.style.display = 'none';
                } else {
                    alert(data.message || 'Login failed');
                }
            } catch (err) {
                console.error('Login error:', err);
                alert('Login error');
            }
        });
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function() {
            try {
                await fetch('/api/auth/logout', {
                    method: 'POST',
                    credentials: 'include'
                });
                await checkAuth();
            } catch (err) {
                console.error('Logout error:', err);
            }
        });
    }

    // Handle video deletion
    document.addEventListener('click', async function(e) {
        if (e.target.classList.contains('delete-video')) {
            if (confirm('Are you sure you want to delete this video?')) {
                const videoItem = e.target.closest('.video-item');
                const videoId = videoItem.dataset.id;
                
                try {
                    const response = await fetch(`/api/videos/${videoId}`, {
                        method: 'DELETE',
                        credentials: 'include'
                    });

                    if (response.ok) {
                        videoItem.remove();
                    } else {
                        alert('Failed to delete video');
                    }
                } catch (err) {
                    console.error('Error deleting video:', err);
                    alert('Error deleting video');
                }
            }
        }
    });

    // Initialize
    checkAuth();
    loadVideos();
});
