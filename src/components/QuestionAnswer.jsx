import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_QUESTIONS_URL } from "../constants";

function QuestionAnswer() {

    const [questionAnswer, setQuestion] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const loadQuestion = async () => {
            try {
                const response = await fetch(`${API_QUESTIONS_URL}/${id}`);
                if (response.ok) {
                    const json = await response.json();
                    setQuestion(json);
                } else {
                    throw response;
                }
            } catch (e) {
                // setError("An error occured whe fetching question with id:", id);
                console.log("Error", e.toString());
            }
        };
        loadQuestion();

    }, [id]);

    if (!questionAnswer) return <h2>Not Question found.. </h2>

    return (
        <div>
            <h2>{questionAnswer.question}</h2>
            <p>{questionAnswer.answer}</p>
            <p>{questionAnswer.ask_count}</p>
        </div>
    )

}

export default QuestionAnswer;