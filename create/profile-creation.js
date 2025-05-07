document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const form = document.getElementById('profileForm');
    const sections = document.querySelectorAll('.form-section');
    const steps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const submitButton = document.querySelector('.submit-btn');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    const transcriptInput = document.getElementById('transcript');
    const filePreview = document.getElementById('filePreview');
    const fileName = filePreview.querySelector('.file-name');
    const fileSize = filePreview.querySelector('.file-size');
    const removeFile = filePreview.querySelector('.remove-file');
    const fileError = document.getElementById('fileError');
    const interestCards = document.querySelectorAll('.interest-card');

    // Current section tracking
    let currentSection = 0;

    // Initialize form
    function initForm() {
        showSection(currentSection);
        updateSteps();
    }

    // Show current section
    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.toggle('active', i === index);
        });
    }

    // Update progress steps
    function updateSteps() {
        steps.forEach((step, i) => {
            if (i < currentSection) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (i === currentSection) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }

    // Next button click handler
    nextButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (validateSection(currentSection)) {
                currentSection++;
                showSection(currentSection);
                updateSteps();
                scrollToTop();
            }
        });
    });

    // Previous button click handler
    prevButtons.forEach(button => {
        button.addEventListener('click', function () {
            currentSection--;
            showSection(currentSection);
            updateSteps();
            scrollToTop();
        });
    });

    // Validate current section
    function validateSection(index) {
        let isValid = true;
        const currentSectionElement = sections[index];
        const inputs = currentSectionElement.querySelectorAll('input[required], select[required]');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;

                // Add error message
                if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message visible';
                    errorMsg.textContent = 'This field is required';
                    input.parentNode.insertBefore(errorMsg, input.nextSibling);
                }
            } else {
                input.classList.remove('error');
                if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                    input.nextElementSibling.remove();
                }
            }
        });

        // Validate interests
        if (index === 2) {
            const checkedInterests = document.querySelectorAll('input[name="interests"]:checked');
            if (checkedInterests.length < 2) {
                fileError.textContent = 'Please select at least 2 interests';
                fileError.classList.add('visible');
                isValid = false;
            } else {
                fileError.classList.remove('visible');
            }
        }

        return isValid;
    }

    // Scroll to top of form
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Toggle password visibility
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="far fa-eye"></i>' : '<i class="far fa-eye-slash"></i>';
    });

    // Handle file upload
    transcriptInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        fileError.textContent = '';
        fileError.classList.remove('visible');

        if (file) {
            if (file.type !== 'application/pdf') {
                fileError.textContent = 'Only PDF files are allowed';
                fileError.classList.add('visible');
                resetFileInput();
                return;
            }

            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                fileError.textContent = 'File size exceeds 5MB limit';
                fileError.classList.add('visible');
                resetFileInput();
                return;
            }

            fileName.textContent = file.name;
            fileSize.textContent = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
            filePreview.classList.add('has-file');
        }
    });

    // Remove file
    removeFile.addEventListener('click', function (e) {
        e.stopPropagation();
        resetFileInput();
    });

    // Reset file input
    function resetFileInput() {
        transcriptInput.value = '';
        fileName.textContent = 'No file selected';
        fileSize.textContent = '';
        filePreview.classList.remove('has-file');
    }

    // Interest card selection
    interestCards.forEach(card => {
        card.addEventListener('click', function () {
            const checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            this.classList.toggle('selected', checkbox.checked);
        });
    });

    // ✅ Show toast
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = '#28a745';
        toast.style.color = '#fff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
        toast.style.fontSize = '16px';
        toast.style.zIndex = '10000';
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 2000);
    }

    // ✅ Form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateSection(currentSection)) return;

        const formData = new FormData(form);
        const profileData = {};

        formData.forEach((value, key) => {
            if (key === 'interests') {
                if (!profileData.interests) profileData.interests = [];
                profileData.interests.push(value);
            } else {
                profileData[key] = value;
            }
        });

        const transcriptFile = transcriptInput.files[0];
        if (transcriptFile) {
            profileData.transcript = {
                name: transcriptFile.name,
                size: transcriptFile.size,
                type: transcriptFile.type
            };
        }

        console.log('Submitted profile data:', profileData);

        // ✅ Show toast and redirect after delay
        showToast('Profile completed successfully!');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    });

    // Initialize
    initForm();
});
