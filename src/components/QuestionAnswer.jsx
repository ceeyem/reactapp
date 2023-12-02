import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_QUESTIONS_URL } from "../constants";

function QuestionAnswer() {

    const [questionAnswer, setQuestion] = useState(null);
    const { id } = useParams();
    const [, setLoading] = useState(true);
    const [found, setFound] = useState("Loading..");
    useEffect(() => {
        const loadQuestion = async () => {
            try {
                const response = await fetch(`${API_QUESTIONS_URL}/${id}`);
                if (response.ok) {
                    const json = await response.json();
                    setQuestion(json);
                } else {
                    setFound("Not found");
                    throw response;
                }
            } catch (e) {
                // setError("An error occured whe fetching question with id:", id);
                console.log("Error", e.toString());
                setFound("Not found");
            }
            finally {
                setLoading(false);
            }
        };
        loadQuestion();

    }, [id]);

    if (!questionAnswer) return <h2>{found}</h2>

    return (
        <div>
            <h2>{questionAnswer.question}</h2>
            <p>{questionAnswer.answer}</p>
        </div>
    )

}

export default QuestionAnswer;
