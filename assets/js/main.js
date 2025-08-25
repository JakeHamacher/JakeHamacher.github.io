// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize mobile menu
    const initMobileMenu = () => {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');

        if (mobileMenuToggle && mainNav) {
            // Remove any existing event listeners to prevent duplicates
            const newMobileMenuToggle = mobileMenuToggle.cloneNode(true);
            mobileMenuToggle.parentNode.replaceChild(newMobileMenuToggle, mobileMenuToggle);
            
            // Get the new reference
            const newToggle = document.querySelector('.mobile-menu-toggle');
            
            newToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                mainNav.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (this.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
        }
    };

    // Initialize mobile menu immediately
    initMobileMenu();
    
    // Re-initialize after a short delay to catch any dynamically loaded content
    setTimeout(initMobileMenu, 100);

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
            // Mark current active testimonial as previous
            testimonials[currentIndex].classList.add('prev');
            testimonials[currentIndex].classList.remove('active');
            
            // Update current index
            currentIndex = index;
            
            // Add active class to new testimonial
            setTimeout(() => {
                testimonials.forEach(testimonial => {
                    testimonial.classList.remove('prev');
                });
                testimonials[currentIndex].classList.add('active');
                
                // Update indicators
                document.querySelectorAll('.carousel-indicator').forEach((indicator, i) => {
                    indicator.classList.toggle('active', i === currentIndex);
                });
            }, 50);
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

});
