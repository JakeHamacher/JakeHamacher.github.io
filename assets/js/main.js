// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

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

    // Initialize testimonial carousel (placeholder - would use a library like Slick in production)
    // This is a simple implementation for demo purposes
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 1) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        showTestimonial(0);
        
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
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
            e.preventDefault();
            const formData = new FormData(applicationForm);
            console.log('Form data:', Object.fromEntries(formData));
            alert('Application submitted successfully!');
            // Here you would typically send data to server
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
});
