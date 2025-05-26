document.getElementById("start-button").addEventListener("click", function () {
            const username = document.getElementById("name").value.trim();
            if (username === "") {
                alert("Please enter your name.");
            } else {
                // Save to localStorage
                localStorage.setItem("username", username);
                // Go to next page
                window.location.href = "category-selection.html";
            }
        });

//------------------------------------ QUIZ PAGE -------------------------//

document.addEventListener("DOMContentLoaded", function () {
    const nextButton = document.querySelector(".next-button");

    // Add event listener for next button click
    if (nextButton) {
        nextButton.addEventListener("click", function () {
            if (nextButton.classList.contains("disabled")) {
                alert("Please select an answer before continuing.");
                return;
            }

            const nextPage = nextButton.getAttribute("data-next");
            if (nextPage) {
                console.log("Redirecting to:", nextPage);
                window.location.href = nextPage;
            }
        });
    }

    const username = localStorage.getItem("username");
    console.log("User:", username);
});

function checkAnswer(clickedBtn) {
    const buttons = document.getElementsByClassName("choices");
    const resultDiv = document.querySelector(".trivia-result");
    const nextButton = document.querySelector(".next-button");

    // Reset all borders
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.borderColor = "";
    }

    const isCorrect = clickedBtn.dataset.correct === "true";

    if (isCorrect) {
        clickedBtn.style.borderColor = "green";
        resultDiv.textContent = "Correct";

        let score = parseInt(localStorage.getItem("score")) || 0;
        score += 1;
        localStorage.setItem("score", score);
        
    } else {
        clickedBtn.style.borderColor = "red";
        resultDiv.textContent = "Incorrect";

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].dataset.correct === "true") {
                buttons[i].style.borderColor = "green";
                break;
            }
        }
    }

    resultDiv.style.backgroundColor = "#FFAF34";

    // Disable all buttons
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

    // Enable next button
    if (nextButton) {
        nextButton.classList.remove("disabled");
        nextButton.disabled = false;
        nextButton.style.pointerEvents = "auto";
        nextButton.style.opacity = "1";
    }
}


