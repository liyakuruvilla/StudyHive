import React, { useState } from "react";
import "./App.css";

const quizData = [
  {
    question: "When you're learning something new, what helps you the most?",
    options: {
      V: "Watching a demonstration or video",
      A: "Listening to an explanation or lecture",
      R: "Reading a detailed guide or manual",
      K: "Trying it out yourself hands-on",
    },
  },
  {
    question: "How do you prefer to review for a test?",
    options: {
      V: "Reviewing charts, graphs, or visual summaries",
      A: "Listening to recordings of lectures or discussions",
      R: "Writing summaries or creating flashcards",
      K: "Doing practice tests or experiments",
    },
  },
  {
    question: "In a group project, what role do you naturally take?",
    options: {
      V: "Designing presentations or diagrams",
      A: "Leading discussions or brainstorming aloud",
      R: "Writing detailed plans or documentation",
      K: "Building prototypes or testing ideas",
    },
  },
  {
    question: "How do you solve a problem?",
    options: {
      V: "Drawing a diagram to visualize the solution",
      A: "Talking it through with someone",
      R: "Reading about similar problems and solutions",
      K: "Trying different approaches until you find what works",
    },
  },
  {
    question: "What type of environment helps you concentrate?",
    options: {
      V: "A visually appealing, organized space",
      A: "A quiet room where you can hear instructions clearly",
      R: "A library or study room with access to resources",
      K: "A lab or workspace where you can move around",
    },
  },
];

const styleDescriptions = {
  V: "Visual Learner: You learn best through images, diagrams, and visual aids.",
  A: "Auditory Learner: You absorb information best by listening.",
  R: "Reading/Writing Learner: You prefer to learn by reading or writing.",
  K: "Kinesthetic Learner: You learn best by doing and through hands-on experience.",
};

function App() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");

  const handleOptionChange = (questionIndex, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = () => {
    const scores = { V: 0, A: 0, R: 0, K: 0 };

    quizData.forEach((_, index) => {
      const answer = answers[index];
      if (answer) {
        scores[answer]++;
      }
    });

    let dominantStyle = null;
    let maxScore = 0;

    for (const [key, value] of Object.entries(scores)) {
      if (value > maxScore) {
        dominantStyle = key;
        maxScore = value;
      }
    }

    if (dominantStyle) {
      setResult(styleDescriptions[dominantStyle]);
    } else {
      setResult("Please answer all questions to see your result.");
    }
  };

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>What's Your Learning Style?</h1>
      <div>
        {quizData.map((data, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <p>{index + 1}. {data.question}</p>
            {Object.entries(data.options).map(([key, value]) => (
              <label key={key} style={{ display: "block", margin: "5px 0" }}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={key}
                  onChange={() => handleOptionChange(index, key)}
                  checked={answers[index] === key}
                />
                {value}
              </label>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        style={{ padding: "10px 20px", fontSize: "1em", marginTop: "20px" }}
      >
        Submit
      </button>
      {result && <div style={{ marginTop: "20px", fontSize: "1.2em", fontWeight: "bold" }}>{result}</div>}
    </div>
  );
}

export default App;
