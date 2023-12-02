import bookImg from '../book.png';
import React, { useEffect, useState, useRef } from "react";
import { API_ASK_URL, API_QUESTIONS_URL } from "../constants";
import Typewriter from 'typewriter-effect/dist/core';
import { useParams } from 'react-router-dom';

function AskQuestion() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [questionId, setQuestionId] = useState("");
    const [askAnother, showAskAnother] = useState(false);
    const [showingAnswer, setShowingAnswer] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const questionAreaRef = useRef(null);
    const { id } = useParams();

    function askAnotherQuestion() {
        setAnswer("");
        showAskAnother(false);
        setShowingAnswer(false);
        questionAreaRef.current.focus();
    }

    useEffect(() => {

        if (id === undefined) {
            getDefaultQuestion();
            return;
        }
        showAskAnother(true);
        async function loadQuestion() {
            try {
                setLoading(true);
                console.log(`loading question with ${id}`)
                const response = await fetch(`${API_QUESTIONS_URL}/${id}`);
                if (response.ok) {
                    const json = await response.json();
                    //console.log(json);
                    setQuestion(json.question);
                    setAnswer(json.answer);
                    setLoading(false);
                } else {
                    throw response;
                }
            } catch (e) {
                // setError("An error occured whe fetching question with id:", id);
                console.log("[loadQuestion] Error", e.toString());
            }
        };

        async function getDefaultQuestion() {
            try {
                const response = await fetch(API_ASK_URL);
                if (response.ok) {
                    const json = await response.json();
                    setQuestion(json.question);
                } else {
                    throw response;
                }
            } catch (e) {
                console.log("Error:", e.toString());
            }
        }

        loadQuestion();

    }, [id]);


    useEffect(() => {

        if (answer.trim() === '') {
            questionAreaRef.current.focus();
            return;
        }

        const typeDelay = randomNumberInRange(30, 70);
        var typewriter = new Typewriter('#answer-text', {
            autoStart: false,
            delay: typeDelay,
        });

        typewriter.typeString(`${answer}`)
            .callFunction(() => {
                window.history.pushState({}, null, "/question/" + questionId);
                showAskAnother(true);
            })
            .start();

    }, [answer, id, questionId]);

    function randomNumberInRange(min, max) {
        // 👇️ get number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowingAnswer(true);
        const postData = { question };
        const response = await fetch(API_ASK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        if (response.ok) {
            const result = await response.json();
            //console.log(JSON.stringify(result));
            setAnswer(`${result.answer}`);
            setQuestionId(result.id);
        } else {
            console.log("An error occurred.");
        }
    };

    return (
        <div>
            <div className="header">
                <div className="logo">
                    <a href="https://www.amazon.com/Minimalist-Entrepreneur-Great-Founders-More/dp/0593192397">
                        <img src={bookImg} alt="TME Book" loading="lazy" />
                    </a>
                    <h1>Ask My Book</h1>
                </div>
            </div>

            <div className="main">
                {isLoading && <p>Loading...</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <textarea
                            name="question"
                            id="question"
                            ref={questionAreaRef}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />

                        {answer.length < 1 &&
                            <div className="buttons" >
                                <button type="submit" disabled={showingAnswer} id="ask-button" >Ask question</button>
                                <button id="lucky-button" disabled={showingAnswer} className="lucky">I'm feeling lucky</button>
                            </div>
                        }
                    </div>
                </form>

                <div id="answer-container">
                    {answer.length > 0 ?
                        <p>   <br />
                            <strong>Answer: </strong>   <span id="answer-text">{answer}</span>    <br />
                            {askAnother &&
                                <button id="ask-another-button" onClick={askAnotherQuestion}>Ask another question</button>
                            }
                        </p>
                        :
                        <span id="answer-text"></span>
                    }
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default AskQuestion
