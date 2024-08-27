document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll<HTMLElement>('.step');
    const nextButton = document.getElementById('nextButton') as HTMLButtonElement;
    const backButton = document.getElementById('backButton') as HTMLButtonElement;
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    let currentStep = 0;

    function showStep(step: number) {
        steps.forEach((stepElement, index) => {
            stepElement.classList.toggle('active', index === step);
        });

        backButton.disabled = step === 0;
        nextButton.style.display = step === steps.length - 1 ? 'none' : 'inline-block';
        submitButton.style.display = step === steps.length - 1 ? 'inline-block' : 'none';
    }

    nextButton.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    });

    backButton.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const usernamePreview = document.getElementById('usernamePreview') as HTMLSpanElement;
    usernameInput.addEventListener('input', () => {
        usernamePreview.textContent = usernameInput.value;
    });

    const imagePreview = document.getElementById('profilePicturePreview') as HTMLImageElement;
    const profilePicture = document.getElementById('profilePicture') as HTMLInputElement;
    profilePicture.addEventListener('change', () => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target?.result as string;
                imagePreview.classList.replace("d-none", "d-block")
            };
            reader.readAsDataURL(file);
        }
    });

    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('Passwords do not match');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    });



    showStep(currentStep);
});
