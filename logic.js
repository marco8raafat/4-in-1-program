// Function to display different sections based on user choice
function showSection(sectionId) {
    const sections = document.querySelectorAll('.program-section, .menu');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// 1. Phishing Scanner Function
document.getElementById('phishing-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const file = document.getElementById('file-input').files[0];
    if (!file) {
        document.getElementById('phishing-result').innerText = "Please upload a file!";
        return;
    }

    const phishingPhrases = {
        "Verify your account": 3,
        "Your account has been suspended": 3,
        "Update your information": 3,
        "Immediate action required": 3,
        "Click here to reset your password": 3,
        "Security alert": 3,
        "Your account has been compromised": 3,
        "Your payment was declined": 3,
        "Confirm your identity": 3,
        "Login to secure your account": 3,
        "Urgent": 2,
        "Log in to view": 2,
        "Unusual activity": 2,
        "Account verification": 2,
        "Limited-time offer": 2,
        "Free gift": 2,
        "bank elAhly": 3,
        "bank Masr": 3,
        "bank elAraby": 3,
        "Congratulations, you've won": 2,
        "Action needed: Suspicious login attempt detected": 2,
        "We couldn't process your recent payment": 2,
        "Payment confirmation required": 2,
        "Secure login": 1,
        "Survey: Rate your recent customer service experience": 1,
        "Secure your investment: Account upgrade required": 1,
        "We've credited your account, confirm details": 1,
        "Unexpected sign-in from a new device": 1,
        "Document shared with you: 'Your Contract.pdf'": 1,
        "New voicemail from [Company Name]": 1,
        "Corporate IT: Password expiration notice": 1,
        "Pending invoice: Complete your wire transfer": 1,
        "Refund issued verify your account to receive funds": 1
    };

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        const lines = content.split('\n');
        let totalPoints = 0;
        let occurrences = {};

        // Count occurrences of phishing phrases
        lines.forEach(line => {
            for (let phrase in phishingPhrases) {
                let count = (line.match(new RegExp(phrase, 'gi')) || []).length;
                if (count > 0) {
                    if (!occurrences[phrase]) {
                        occurrences[phrase] = 0;
                    }
                    occurrences[phrase] += count;
                    totalPoints += phishingPhrases[phrase] * count;
                }
            }
        });

        // Display results
        let resultText = "";
        for (let phrase in occurrences) {
            resultText += `Phrase: "${phrase}" - Occurrences: ${occurrences[phrase]}, Points: ${phishingPhrases[phrase] * occurrences[phrase]}\n`;
        }
        resultText += `Total Points: ${totalPoints}\n`;

        if (totalPoints >= 10) {
            resultText += "This email is likely a phishing attempt.";
        } else {
            resultText += "This email is not a phishing attempt.";
        }

        document.getElementById('phishing-result').innerText = resultText;
    };

    reader.readAsText(file);
});

// 2. Teddy Bear Picnic Function
document.getElementById('teddy-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const number = parseInt(document.getElementById('bear-input').value);
    const result = teddyBears(number) ? "True" : "False";
    document.getElementById('bear-result').innerText = `Bears Result: ${result}`;
});

function teddyBears(n) {
    if (n === 42) return true;
    if (n < 42) return false;

    // Try subtracting 42 if divisible by 5
    if (n % 5 === 0 && teddyBears(n - 42)) return true;

    // Try dividing by 2 if divisible by 2 and result >= 42
    if (n % 2 === 0 && teddyBears(n / 2)) return true;

    // Try subtracting the product of the last two digits if result >= 42
    const lastDigit = n % 10;
    const secondLastDigit = Math.floor((n % 100) / 10);
    const product = lastDigit * secondLastDigit;
    if (product > 0 && teddyBears(n - product)) return true;

    return false;
}

// 3. Split Program Function
document.getElementById('split-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const target = document.getElementById('target').value;
    const delimiter = document.getElementById('delimiter').value;
    const result = target.split(delimiter).map(word => `"${word.trim()}"`).join(", ");
    document.getElementById('split-result').innerText = `Split Result: ${result}`;
});

// 4. Binary Number Function
document.getElementById('binary-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const choice = document.getElementById('binary-choice').value;
    const number = parseInt(document.getElementById('binary-input').value);

    if (choice == "1") {
        document.getElementById('binary-result').innerText = `Binary Result: ${number.toString(2)}`;
    } else {
        let result = [];
        generateNumbers("", number, result);
        document.getElementById('binary-result').innerText = `Numbers Result: ${result.join(", ")}`;
    }
});

function generateNumbers(prefix, n, result) {
    if (n === 0) {
        result.push(prefix);
        return;
    }
    generateNumbers(prefix + "0", n - 1, result);
    generateNumbers(prefix + "1", n - 1, result);
}
