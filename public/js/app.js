var MESSAGE_TYPE;
(function (MESSAGE_TYPE) {
    MESSAGE_TYPE[MESSAGE_TYPE["TEXT"] = 0] = "TEXT";
    MESSAGE_TYPE[MESSAGE_TYPE["ATTACHMENT"] = 1] = "ATTACHMENT";
    MESSAGE_TYPE[MESSAGE_TYPE["POLL"] = 2] = "POLL";
    MESSAGE_TYPE[MESSAGE_TYPE["EMBETTED"] = 3] = "EMBETTED";
})(MESSAGE_TYPE || (MESSAGE_TYPE = {}));
var ATTACHMENT_TYPE;
(function (ATTACHMENT_TYPE) {
    ATTACHMENT_TYPE[ATTACHMENT_TYPE["IMAGE"] = 0] = "IMAGE";
    ATTACHMENT_TYPE[ATTACHMENT_TYPE["VIDEO"] = 1] = "VIDEO";
    ATTACHMENT_TYPE[ATTACHMENT_TYPE["STICKER"] = 2] = "STICKER";
    ATTACHMENT_TYPE[ATTACHMENT_TYPE["GIF"] = 3] = "GIF";
})(ATTACHMENT_TYPE || (ATTACHMENT_TYPE = {}));
function loadMessagesFromChannel(cid) {
    fetch(`http://localhost:3000/api/v1/channels/${cid}/messages`)
        .then(res => res.json())
        .then(data => {
        console.log(data);
    })
        .catch(err => {
        console.log(err);
    });
}
function loadMemberFromChannel(cid) {
    fetch(`http://localhost:3000/api/v1/channels/${cid}/member`)
        .then(res => res.json())
        .then(data => {
        console.log(data);
    })
        .catch(err => {
        console.log(err);
    });
}
function loadChannelsFromUser(uid) {
    fetch(`http://localhost:3000/api/v1/users/${uid}/channels`)
        .then(res => res.json())
        .then(data => {
        console.log(data);
    })
        .catch(err => {
        console.log(err);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');
    const submitButton = document.getElementById('submitButton');
    let currentStep = 0;
    function showStep(step) {
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
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const usernamePreview = document.getElementById('usernamePreview');
    usernameInput.addEventListener('input', () => {
        usernamePreview.textContent = usernameInput.value;
    });
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
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
//# sourceMappingURL=app.js.map