import { useState } from "react";
import { mockInterviewData } from "../data/mockInterviewData";

function MockInterview() {

    const [question, setQuestion] =
        useState("");

    const generateQuestion = () => {

        const randomCategory =
            mockInterviewData[
                Math.floor(
                    Math.random() *
                    mockInterviewData.length
                )
            ];

        const randomQuestion =
            randomCategory.questions[
                Math.floor(
                    Math.random() *
                    randomCategory.questions.length
                )
            ];

        setQuestion(randomQuestion);
    };

    return (

        <div className="dashboard">

            <h1>Mock Interview 🎙️</h1>

            <button
                onClick={generateQuestion}
            >
                Generate Question
            </button>

            <div className="history-card">

                <h2>
                    {question ||
                     "Click Generate"}
                </h2>

            </div>

        </div>

    );
}

export default MockInterview;