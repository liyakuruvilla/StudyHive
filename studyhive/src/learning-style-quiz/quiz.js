// Quiz data
const quizData = [
    {
        question: "When you're learning something new, what helps you the most?",
        options: {
            V: "Watching a demonstration or video",
            A: "Listening to an explanation or lecture",
            R: "Reading a detailed guide or manual",
            K: "Trying it out yourself hands-on"
        }
    },
    {
        question: "How do you prefer to review for a test?",
        options: {
            V: "Reviewing charts, graphs, or visual summaries",
            A: "Listening to recordings of lectures or discussions",
            R: "Writing summaries or creating flashcards",
            K: "Doing practice tests or experiments"
        }
    },
    {
        question: "In a group project, what role do you naturally take?",
        options: {
            V: "Designing presentations or diagrams",
            A: "Leading discussions or brainstorming aloud",
            R: "Writing detailed plans or documentation",
            K: "Building prototypes or testing ideas"
        }
    },
    {
        question: "How do you solve a problem?",
        options: {
            V: "Drawing a diagram to visualize the solution",
            A: "Talking it through with someone",
            R: "Reading about similar problems and solutions",
            K: "Trying different approaches until you find what works"
        }
    },
    {
        question: "What type of environment helps you concentrate?",
        options: {
            V: "A visually appealing, organized space",
            A: "A quiet room where you can hear instructions clearly",
            R: "A library or study room with access to resources",
            K: "A lab or workspace where you can move around"
        }
    }
];

// Style descriptions
const styleDescriptions = {
    V: "Visual Learner: You learn best through images, diagrams, and visual aids.",
    A: "Auditory Learner: You absorb information best by listening.",
    R: "Reading/Writing Learner: You prefer to learn by reading or writing.",
    K: "Kinesthetic Learner: You learn best by doing and through hands-on experience."
};

// Render the quiz
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");

quizData.forEach((data, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${index + 1}. ${data.question}</p>`;
    
    for (const [key, value] of Object.entries(data.options)) {
        const option = document.createElement("label");
        option.innerHTML = `
            <input type="radio" name="q${index}" value="${key}">
            ${value}
        `;
        questionDiv.appendChild(option);
        questionDiv.appendChild(document.createElement("br"));
    }

    quizContainer.appendChild(questionDiv);
});

// Calculate and display the result
submitButton.addEventListener("click", () => {
    const scores = { V: 0, A: 0, R: 0, K: 0 };

    quizData.forEach((_, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            scores[selected.value]++;
        }
    });

    // Determine the dominant learning style
    let dominantStyle = null;
    let maxScore = 0;

    for (const [key, value] of Object.entries(scores)) {
        if (value > maxScore) {
            dominantStyle = key;
            maxScore = value;
        }
    }

    // Display result
    resultContainer.textContent =
        dominantStyle
            ? styleDescriptions[dominantStyle]
            : "Please answer all questions to see your result.";
});
