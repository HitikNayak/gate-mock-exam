document.addEventListener("DOMContentLoaded", () => {
    let timer = 50 * 60; // 50 minutes in seconds
    const totalQuestions = 10;
    let score = 0;

    // Timer countdown (as shown previously)
    const timerElement = document.createElement("div");
    timerElement.style.textAlign = "center";
    timerElement.style.fontSize = "1.2em";
    document.body.insertBefore(timerElement, document.querySelector(".user-info"));

    function startTimer() {
        const interval = setInterval(() => {
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            if (timer <= 0) {
                clearInterval(interval);
                submitExam(); // Auto-submit if time is up
            }
            timer--;
        }, 1000);
    }

    startTimer();

    // Function to display the certificate
    function displayCertificate(username, email, phone, score, photo) {
        document.getElementById("certName").textContent = username;
        document.getElementById("certEmail").textContent = email;
        document.getElementById("certPhone").textContent = phone;
        document.getElementById("certScore").textContent = score.toFixed(2);

        // Load and display uploaded photo
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById("certPhoto").src = event.target.result;
        };
        reader.readAsDataURL(photo);

        document.getElementById("certificate").style.display = "block";
    }

    // Submit Exam function
    function submitExam() {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const photo = document.getElementById('photo').files[0];

        if (!username || !email || !phone || !photo) {
            alert("Please fill out all details and upload a photo.");
            return;
        }

        // Check answers and calculate score
        for (let i = 1; i <= totalQuestions; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedOption) {
                if (selectedOption.value === "correct") {
                    score += 3; // 3 marks for correct
                } else {
                    score -= 0.95; // -0.95 for incorrect
                }
            } else {
                alert(`Please answer question ${i} before submitting.`);
                return;
            }
        }

        // Display the certificate
        displayCertificate(username, email, phone, score, photo);
    }

    document.querySelector("button").addEventListener("click", submitExam);
});
