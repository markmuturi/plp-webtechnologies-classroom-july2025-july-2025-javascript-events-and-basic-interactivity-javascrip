// Create a password when page loads
document.addEventListener('DOMContentLoaded', function() {
    // CHARACTER SETS - Each constant holds all the possible characters of that type

    const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
    const NUMBERS = '0123456789';
    const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,./?';

    //REFERENCES TO HTML ELEMENTS

    const lengthSlider = document.getElementById('length');
    const lengthDisplay = document.getElementById('lengthValue');
    const uppercaseCheck = document.getElementById('uppercase');
    const lowercaseCheck = document.getElementById('lowercase');
    const numbersCheck = document.getElementById('numbers');
    const symbolsCheck = document.getElementById('symbols');
    const generateBtn = document.getElementById('generateBtn');
    const passwordOutput = document.getElementById('passwordOutput');
    const copyBtn = document.getElementById('copyBtn');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    const errorMessage = document.getElementById('errorMessage');

    //EVENT LISTENERS

    lengthSlider.addEventListener('input', function () {
        lengthDisplay.textContent = this.value;
        if (passwordOutput.value) {
            generatePassword;
        }
    });

    [uppercaseCheck, lowercaseCheck, numbersCheck, symbolsCheck].forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (passwordOutput.value) {
                generatePassword();
            }
        });
    });

    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyToClipboard);

    function generatePassword() {
        errorMessage.textContent = '';

        const length = parseInt(lengthSlider.value);

        let availableChars = '';

        //Add character types based on what is checked
        if (uppercaseCheck.checked) {
            availableChars += UPPERCASE;
        }
        if (lowercaseCheck.checked) {
            availableChars += LOWERCASE;
        }
        if (numbersCheck.checked) {
            availableChars += NUMBERS;
        }
        if (symbolsCheck.checked) {
            availableChars += SYMBOLS;
        }

        //Make sure the user selected at least one character type
        if (availableChars === '') {
            //display error message and stop the function
            errorMessage.textContent = 'Please select at least one character type!';
            passwordOutput.value = '';
            updateStrengthMeter('', 0);
            return;
        }

        // Generate Password
        let password = '';

        // Loop to build password character by character
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            password += availableChars[randomIndex];
        }

        passwordOutput.value = password;

        const strength = calculateStrength(password);
        updateStrengthMeter(password, strength);
    }

    // Calculate how strong a password is
    function calculateStrength(password) {
        let score = 0;

        if (password.length >= 8) score += 25;
        if (password.length >= 12) score += 15;
        if (password.length >= 16) score += 10;

        if (/[a-z]/.test(password)) score += 15;
        if (/[A-Z]/.test(password)) score += 15;
        if (/[0-9]/.test(password)) score += 15;
        if (/[^a-zA-Z0-9]/.test(password)) score += 20;
        return score;
    }

    //Update the Visual Strength Meter
    function updateStrengthMeter(password, strength) {
        if (!password) {
            //reset everything
            strengthFill.style.width = '0%';
            strengthFill.style.backgroundColor = '#ddd';
            strengthText.textContent = 'Not Generated';
            return;
        }

        // set width of bar based on strength level
        strengthFill.style.width = strength + '%';

        // choose color and text based on strength level
        if (strength < 40) {
            strengthFill.style.backgroundColor = '#ff4757';
            strengthText.textContent = 'Weak';
        } else if (strength < 70) {
            strengthFill.style.backgroundColor = '#ffa502';
            strengthText.textContent = 'Medium';
        } else {
            strengthFill.style.backgroundColor = '#2ed573';
            strengthText.textContent = 'Strong';
        }
    }

    // Copy Password to user's clipboard
    function copyToClipboard() {
        // check for password to copy
        if (!passwordOutput.value) {
            errorMessage.textContent = 'Generate a password first!';
            return;
        }

        // select all text in the password field
        passwordOutput.select();
        passwordOutput.setSelectionRange(0, 99999);

        try {
            document.execCommand('copy');

            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'COPIED!';
            copyBtn.style.backgroundColor = '#2ed573';

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
        } catch (err) {
            errorMessage.textContent = 'Failed to copy password. Please select and copy manually.'
        }
    }
});