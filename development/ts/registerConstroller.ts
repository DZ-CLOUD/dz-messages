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

    const emailInput = document.getElementById('email') as HTMLInputElement;

    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const usernamePreview = document.getElementById('usernamePreview') as HTMLSpanElement;
    usernameInput.addEventListener('input', () => {
        usernamePreview.textContent = usernameInput.value;
    });

    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;

    submitButton.addEventListener('click', () => {
        switch (true) {
            case emailInput.value === '':
                emailInput.setCustomValidity("Email is required");
                currentStep = 0;
                showStep(currentStep);
                break;
            case usernameInput.value === '':
                usernameInput.setCustomValidity("Username is required");
                currentStep = 1;
                showStep(currentStep);
                break;
            case passwordInput.value !== confirmPasswordInput.value:
                confirmPasswordInput.setCustomValidity("Passwords do not match");
                currentStep = 3;
                showStep(currentStep);
                break;
            default:
                break;
        }
    });

    showStep(currentStep);
});
